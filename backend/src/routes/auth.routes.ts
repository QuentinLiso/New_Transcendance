// auth.routes.ts
import { fastifyJwt } from "fastify-jwt";
import * as authController from "../controllers/auth.controller";
import { FastifyRequest, FastifyReply, preHandlerHookHandler } from "fastify";

type Stage = "setup-2fa" | "2fa-challenge";
// const stageGuard = (expected: Stage): preHandlerHookHandler => {
//   ret;
// };

async function verifyJWT(req: FastifyRequest, rep: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    return rep.code(401).send({ error: "Unauthorized" });
  }
}

export async function authRoutes(fastify: any, options: any) {
  fastify.post("/register", authController.register);
  fastify.post("/login", authController.login);
  fastify.get("/2fa/qr", { preHandler: verifyJWT }, authController.getQrCode);
  //   fastify.post("/2fa/verify", authController.verifyQrCode);
  //   fastify.post("/2fa/skip", authController.skip2fa);
  //   fastify.post("/2fa/login-verify", authController.verify2fa);
}
