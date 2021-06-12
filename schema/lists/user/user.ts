import { list } from "@keystone-next/keystone/schema";
import { text, relationship, password, checkbox } from "@keystone-next/fields";

export const User = list({
  ui: {
    listView: {
      initialColumns: ["name", "email", "isAdmin"],
    },
  },
  fields: {
    email: text({ isRequired: true, isUnique: true }),
    isAdmin: checkbox({ defaultValue: false, isRequired: true }),
    name: text({ isRequired: true }),
    password: password({ isRequired: true }),
    posts: relationship({ ref: "Post.author", many: true }),
  },
});
