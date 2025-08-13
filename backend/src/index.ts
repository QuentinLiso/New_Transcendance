import Database from "better-sqlite3";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { createDatabase, createTables } from "./db";
import fastifyJwt from "fastify-jwt";
import { UserModel } from "./models/user.model";
import { userRoutes } from "./routes/user.routes";
import { authRoutes } from "./routes/auth.routes";

declare module "fastify" {
  interface FastifyInstance {
    db: Database.Database;
    dbModels: {
      user: UserModel;
    };
  }
}

// Create the server instance
const fastify = Fastify({ logger: false });

// Connect to database
const db = createDatabase();
createTables(db, fastify.log);
fastify.decorate("db", db);

// Register fastify-jwt with secret
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || "supersecret",
});
fastify.decorate("auth", async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    await req.jwtVerify();
  } catch (e) {
    rep.code(401).send({ error: "Unauthorized" });
  }
});

// Create models
const userModel = new UserModel(db);
fastify.decorate("dbModels", {
  user: userModel,
});

// Register routes
fastify.register(authRoutes, { prefix: "/api/auth" });
fastify.register(userRoutes, { prefix: "/api/users" });

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 5000, host: "0.0.0.0" });
    console.log("Backend server running at http://localhost:5000");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

start();
