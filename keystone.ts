import { config as loadEnvs } from "dotenv";
import { config } from "@keystone-next/keystone/schema";
import { statelessSessions } from "@keystone-next/keystone/session";
import { createAuth } from "@keystone-next/auth";

import { lists } from "./schema";
import { isAdmin } from "./utils/auth";

loadEnvs();
const sessionSecret = process.env.SESSION_SECRET;
const databaseUrl = process.env.DATABASE_URL || "";
const serverPort = (process.env.PORT as unknown as number) || 3001;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

if (!sessionSecret) {
  throw new Error("The SESSION_SECRET environment variable must be set");
}

if (!databaseUrl) {
  throw new Error("The DATABASE_URL environment variable must be set");
}

const sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "name",
  initFirstItem: {
    fields: ["name", "email", "password", "isAdmin"],
  },
});

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [frontendUrl],
        credentials: true,
      },
      port: serverPort,
    },
    db: {
      adapter: "prisma_postgresql",
      url: databaseUrl,
      // useMigrations: true,
    },
    ui: {
      isAccessAllowed: async ({ db, session }) => {
        if (session?.itemId) {
          const user = await db.lists.User.findOne({
            where: { id: session.itemId },
          });

          return isAdmin(user);
        }
        return false;
      },
    },
    lists,
    session,
  })
);
