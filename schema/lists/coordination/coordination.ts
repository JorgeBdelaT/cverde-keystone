import { list } from "@keystone-next/keystone/schema";
import { text, relationship, timestamp } from "@keystone-next/fields";
import { hiddenField } from "../../../utils/ui";
import { isAdmin } from "../../../utils/auth";

export const Coordination = list({
  ui: {
    listView: {
      initialColumns: [
        "name",
        "organizationName",
        "description",
        "socialNetworks",
        "createdAt",
      ],
    },
  },
  fields: {
    createdAt: timestamp({
      isRequired: true,
      defaultValue: new Date().toISOString(),
      ui: { ...hiddenField },
    }),
    description: text({ isRequired: true }),
    logoUrl: text(),
    members: relationship({
      ref: "CoordinationUserPosition.coordination",
      many: true,
      ui: { createView: { fieldMode: "hidden" } },
    }),
    name: text({ isRequired: true }),
    organizationName: text({ isRequired: true }),
    socialNetworks: relationship({
      ref: "CoordinationSocialNetwork",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
      },
    }),
  },
  access: {
    create: ({ context }) => isAdmin(context),
    delete: ({ context }) => isAdmin(context),
    update: ({ context }) => isAdmin(context),
  },
  hooks: {
    afterChange: async ({ operation, updatedItem, context: { db } }) => {
      if (operation === "create") {
        const socialNetworks = await db.lists.SocialNetwork.findMany();
        await db.lists.CoordinationSocialNetwork.createMany({
          data: socialNetworks.map((socialNetwork) => ({
            data: {
              coordination: { connect: { id: updatedItem.id } },
              socialNetwork: { connect: { id: socialNetwork.id } },
              name: socialNetwork.name,
            },
          })),
        });
      }
    },
  },
});
