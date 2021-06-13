import { list } from "@keystone-next/keystone/schema";
import { text } from "@keystone-next/fields";

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
});
