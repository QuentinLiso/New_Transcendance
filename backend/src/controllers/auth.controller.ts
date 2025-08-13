import {
  type FastifyRequest,
  type FastifyReply,
  type FastifyInstance,
  fastify,
} from "fastify";
import { IUser, UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

const USERNAME_REGEX = /^[A-Za-z0-9_-]{3,30}$/; // 3-30 chars, alphanum + _ -
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/i; // simple
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,128}$/; // 6-128, strength

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const { pseudo, email, password } = req.body as {
    pseudo: string;
    email: string;
    password: string;
  };
  const pseudoNorm = pseudo?.trim();
  const emailNorm = email?.trim().toLowerCase();

  if (!USERNAME_REGEX.test(pseudoNorm || ""))
    return rep.code(400).send({ error: "Username invalid" });
  if (!PASSWORD_REGEX.test(password || ""))
    return rep.code(400).send({ error: "Password too weak" });
  if (!EMAIL_REGEX.test(emailNorm || ""))
    return rep.code(400).send({ error: "Email invalid" });

  const userModel = req.server.dbModels.user;

  try {
    const exists = await userModel.existsByPseudoOrEmail(pseudoNorm, emailNorm);
    if (exists) {
      return rep
        .code(409)
        .send({ error: "Username and/or email already in use" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(pseudoNorm, emailNorm, hashPassword);
    return rep.code(201).send({ message: `User created : ${pseudoNorm}` });
  } catch (e) {
    req.log.error(e);
    return rep.code(500).send({ error: "Internal server error" });
  }
}

export async function login(req: FastifyRequest, rep: FastifyReply) {
  const { pseudoOrEmail, password } = req.body as {
    pseudoOrEmail: string;
    password: string;
  };
  const userModel = req.server.dbModels.user;

  try {
    const user = userModel.getUserForLogin(pseudoOrEmail, pseudoOrEmail);

    if (!user) {
      return rep.code(401).send({ error: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.pwd_hash);

    if (!passwordMatch) {
      return rep.code(401).send({ error: "Invalid credentials" });
    }

    const token = await rep.jwtSign({
      sub: user.id,
      pseudo: user.pseudo,
      email: user.email,
    });
    return rep.send({ token });
  } catch (e) {
    req.log.error(e);
    return rep.code(500).send({ error: "Internal server error" });
  }
}

export async function getQrCode(req: FastifyRequest, rep: FastifyReply) {
  try {
    const userId = (req.user as { id: number }).id;
    const user = req.server.dbModels.user.getUserById(userId);

    const label = user?.email
      ? `FT_Transcendance:${user.email}`
      : `FT_Transcendance:user${userId}`;

    const secret = speakeasy.generateSecret({ length: 20 });
    const otpauth_url = speakeasy.otpauthURL({
      secret: secret.ascii,
      label,
      issuer: "FT_Transcendance",
      encoding: "ascii",
    });

    const userModel = req.server.dbModels.user;
    userModel.updateUserTotpSecret(userId, secret.base32);

    const qr = await QRCode.toDataURL(otpauth_url);
    return { qr };
  } catch (e: any) {
    req.server.log.error({ e }, "2FA QR generation failed");
    return rep
      .code(500)
      .send({ error: "QR generation failed", details: e?.message });
  }
}
