import { list } from "@keystone-next/keystone/schema";
import { text, timestamp } from "@keystone-next/fields";
import { hiddenField } from "../../../utils/ui";
import { isAdmin } from "../../../utils/auth";

export const Position = list({
  ui: {
    listView: { initialColumns: ["name", "description"] },
  },
  fields: {
    createdAt: timestamp({
      isRequired: true,
      defaultValue: new Date().toISOString(),
      ui: { ...hiddenField },
    }),
    description: text({ isRequired: true }),
    name: text({ isRequired: true }),
  },
  access: {
    delete: ({ session }) => isAdmin(session),
    create: ({ session }) => isAdmin(session),
    update: ({ session }) => isAdmin(session),
  },
});
