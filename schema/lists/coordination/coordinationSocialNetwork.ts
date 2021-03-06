import { list } from "@keystone-next/keystone/schema";
import { text, relationship } from "@keystone-next/fields";
import { isAdmin } from "../../../utils/auth";

export const CoordinationSocialNetwork = list({
  ui: { isHidden: true },
  fields: {
    link: text(),
    name: text(),
    socialNetwork: relationship({ ref: "SocialNetwork" }),
    coordination: relationship({ ref: "Coordination" }),
  },
  hooks: {
    resolveInput: async ({ resolvedData, context, operation }) => {
      if (operation === "create" && resolvedData.socialNetwork) {
        const socialNetwork = await context.db.lists.SocialNetwork.findOne({
          where: { id: resolvedData.socialNetwork },
        });
        return {
          ...resolvedData,
          name: socialNetwork.name,
        };
      }
      return resolvedData;
    },
  },
  access: {
    delete: ({ session }) => isAdmin(session),
    create: ({ session }) => isAdmin(session),
    update: ({ session }) => isAdmin(session),
  },
});
