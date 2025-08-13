import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { IUser, UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

const USERNAME_REGEX = /^[A-Za-z0-9_-]{3,30}$/; // 3-30 chars, alphanum + _ -
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/i; // simple
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,128}$/; // 6-128, strength

// export async function getMe(req: FastifyRequest, rep: FastifyReply) {
//   try {
//     const userId = (req.user as { id: number }).id;
//     const user = req.server.dbModels.user.findById(userId);
//     if (!user) {
//       return rep.code(404).send({ error: "User not found" });
//     }
//     const { pwd_hash, ...safeUser } = user;
//     rep.send(safeUser);
//   } catch (e: any) {
//     console.log(e.message);
//   }
// }

export async function getAllUsers(req: FastifyRequest, rep: FastifyReply) {
  try {
    const users = req.server.dbModels.user.findAllUsers();
    rep.status(200).send(users);
  } catch (e: any) {
    console.log(e.message);
  }
}
