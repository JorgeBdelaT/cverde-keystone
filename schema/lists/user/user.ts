import { list } from "@keystone-next/keystone/schema";
import { text, relationship, password, checkbox } from "@keystone-next/fields";

import { isAdmin, isLoggedIn } from "../../../utils/auth";

export const User = list({
  ui: {
    listView: {
      initialColumns: ["name", "email", "isAdmin"],
    },
  },
  fields: {
    alliances: relationship({ ref: "Alliance.inChargeUser", many: true }),
    email: text({ isRequired: true, isUnique: true }),
    isAdmin: checkbox({
      defaultValue: false,
      isRequired: true,
      access: {
        create: ({ context }) => isAdmin(context),
        update: ({ context }) => isAdmin(context),
        read: ({ context }) => isLoggedIn(context),
      },
    }),
    name: text({ isRequired: true }),
    password: password({ isRequired: true }),
    posts: relationship({ ref: "Post.author", many: true }),
  },
});
