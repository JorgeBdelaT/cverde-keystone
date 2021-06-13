import { list } from "@keystone-next/keystone/schema";
import { text, timestamp } from "@keystone-next/fields";

export const Position = list({
  ui: {
    listView: { initialColumns: ["description", "name"] },
  },
  fields: {
    createdAt: timestamp({
      isRequired: true,
      defaultValue: new Date().toISOString(),
    }),
    description: text({ isRequired: true }),
    name: text({ isRequired: true }),
  },
});
