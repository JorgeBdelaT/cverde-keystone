import { list } from "@keystone-next/keystone/schema";
import {
  text,
  relationship,
  checkbox,
  timestamp,
  image,
} from "@keystone-next/fields";

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
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "hidden",
        },
        listView: {
          fieldMode: "hidden",
        },
      },
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
    }),
  },
});
