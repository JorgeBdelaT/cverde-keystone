import { KeystoneContext, MaybePromise } from "@keystone-next/types";

export const isAdmin: (context: KeystoneContext) => MaybePromise<boolean> =
  async (context) => {
    const { db, session } = context;
    if (session?.itemId) {
      const user = await db.lists.User.findOne({
        where: { id: session.itemId },
      });

      return !!user?.isAdmin;
    }
  };

export const isLoggedIn: (context: KeystoneContext) => MaybePromise<boolean> =
  async (context) => {
    const { db, session } = context;
    if (session?.itemId) {
      const user = await db.lists.User.findOne({
        where: { id: session.itemId },
      });

      return !!user;
    }
  };
