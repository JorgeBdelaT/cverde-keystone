import { list } from "@keystone-next/keystone/schema";
import {
  text,
  relationship,
  checkbox,
  timestamp,
  image,
} from "@keystone-next/fields";
import { hiddenField } from "../../../utils/ui";

export const Alliance = list({
  ui: {
    listView: {
      initialColumns: [
        "name",
        "inChargeUser",
        "socialNetworks",
        "createdAt",
        "isActive",
      ],
    },
  },
  fields: {
    createdAt: timestamp({
      isRequired: true,
      defaultValue: new Date().toISOString(),
      ui: { ...hiddenField },
    }),
    name: text({ isRequired: true }),
    description: text({ isRequired: true }),
    endDate: timestamp(),
    inChargeUser: relationship({ ref: "User.alliances" }),
    isActive: checkbox({ defaultValue: false, isRequired: true }),
    logo: image(),
    socialNetworks: relationship({
      ref: "AllianceSocialNetwork",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
      },
    }),
  },
  hooks: {
    afterChange: async ({ operation, updatedItem, context: { db } }) => {
      if (operation === "create") {
        const socialNetworks = await db.lists.SocialNetwork.findMany();
        await db.lists.AllianceSocialNetwork.createMany({
          data: socialNetworks.map((socialNetwork) => ({
            data: {
              alliance: { connect: { id: updatedItem.id } },
              socialNetwork: { connect: { id: socialNetwork.id } },
              name: socialNetwork.name,
            },
          })),
        });
      }
    },
  },
});
