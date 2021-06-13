import { list } from "@keystone-next/keystone/schema";
import { text, relationship } from "@keystone-next/fields";

export const AllianceSocialNetwork = list({
  ui: { isHidden: true },
  fields: {
    link: text(),
    name: text({
      ui: {
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    socialNetwork: relationship({ ref: "SocialNetwork" }),
    alliance: relationship({ ref: "Alliance" }),
  },
  hooks: {
    resolveInput: async ({ resolvedData, context }) => {
      if (resolvedData.socialNetwork) {
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
});
