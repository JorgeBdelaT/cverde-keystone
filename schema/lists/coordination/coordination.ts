import { list } from "@keystone-next/keystone/schema";
import { text, relationship, timestamp } from "@keystone-next/fields";

export const Coordination = list({
  ui: {
    listView: { initialColumns: ["name", "description"] },
  },
  fields: {
    createdAt: timestamp({
      isRequired: true,
      defaultValue: new Date().toISOString(),
    }),
    description: text({ isRequired: true }),
    logoUrl: text(),
    members: relationship({
      ref: "CoordinationUserPosition.coordination",
      many: true,
    }),
    name: text({ isRequired: true }),
    organizationName: text({ isRequired: true }),
    socialNetworks: relationship({
      ref: "CoordinationSocialNetwork",
    }),
  },
});
