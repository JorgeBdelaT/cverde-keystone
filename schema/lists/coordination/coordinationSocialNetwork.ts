import { list } from "@keystone-next/keystone/schema";
import { text, relationship } from "@keystone-next/fields";

export const CoordinationSocialNetwork = list({
  ui: { isHidden: true },
  fields: {
    link: text(),
    socialNetwork: relationship({ ref: "SocialNetwork" }),
  },
});
