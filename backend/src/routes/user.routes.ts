import { FastifyReply, FastifyRequest } from "fastify";
import * as userController from "../controllers/user.controller";

function p(req: FastifyRequest, rep: FastifyReply) {
  console.log(req.method, req.url, req.body);
  rep.status(200).send("");
}

export async function userRoutes(fastify: any, options: any) {
  fastify.get("/all", userController.getAllUsers);
  //   fastify.get("/me", { preHandler: [fastify.auth] }, userController.getMe);
  //   fastify.post("/register", userController.userRegistration);
  //   fastify.get("/auth/2fa/qr", userController.getQrCode);
  //   fastify.post("/auth/2fa/verify", userController.setMfaCode);
  //   fastify.post("/auth/2fa/skip", userController.skipMfa);
  //   fastify.post("/auth/2fa/login-verify", userController.challengeMfaCode);
  //   fastify.post("/login", userController.classicLogin);
}
