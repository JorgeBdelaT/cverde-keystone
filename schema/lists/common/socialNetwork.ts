import { list } from "@keystone-next/keystone/schema";
import { text } from "@keystone-next/fields";
import { isAdmin, isLoggedIn } from "../../../utils/auth";

export const SocialNetwork = list({
  ui: {
    listView: {
      initialColumns: ["name", "logoUrl"],
    },
  },
  fields: {
    logoUrl: text(),
    name: text(),
  },
  description: "Red social (instagram, facebook,...)",
  access: {
    create: ({ session }) => isAdmin(session),
    read: ({ session }) => isLoggedIn(session),
    update: ({ session }) => isAdmin(session),
    delete: ({ session }) => isAdmin(session),
  },
  hooks: {
    afterChange: async ({ operation, updatedItem, context: { db } }) => {
      if (operation === "create") {
        const existingAlliances = await db.lists.Alliance.findMany();
        const existingCoordinations = await db.lists.Coordination.findMany();
        await Promise.all([
          await db.lists.AllianceSocialNetwork.createMany({
            data: existingAlliances.map((alliance) => {
              return {
                data: {
                  alliance: { connect: { id: alliance.id } },
                  socialNetwork: { connect: { id: updatedItem.id } },
                  name: updatedItem.name,
                },
              };
            }),
          }),
          await db.lists.CoordinationSocialNetwork.createMany({
            data: existingCoordinations.map((coordination) => {
              return {
                data: {
                  coordination: { connect: { id: coordination.id } },
                  socialNetwork: { connect: { id: updatedItem.id } },
                  name: updatedItem.name,
                },
              };
            }),
          }),
        ]);
      }
    },
  },
});
