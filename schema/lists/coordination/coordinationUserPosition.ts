import { list } from "@keystone-next/keystone/schema";
import { relationship, timestamp, text } from "@keystone-next/fields";
import { hiddenField } from "../../../utils/ui";
import { isAdmin } from "../../../utils/auth";

export const CoordinationUserPosition = list({
  ui: {
    listView: { initialColumns: ["user", "coordination", "position"] },
  },
  description: "Miembro de una coordinacion",
  fields: {
    createdAt: timestamp({
      isRequired: true,
      defaultValue: new Date().toISOString(),
      ui: { ...hiddenField },
    }),
    name: text({
      ui: { ...hiddenField },
    }),
    endDate: timestamp(),
    startDate: timestamp(),
    coordination: relationship({ ref: "Coordination.members" }),
    position: relationship({ ref: "Position" }),
    user: relationship({ ref: "User" }),
  },
  hooks: {
    resolveInput: async ({ resolvedData, context, operation }) => {
      if (operation === "create" && resolvedData.user) {
        const user = await context.db.lists.User.findOne({
          where: { id: resolvedData.user },
        });
        return {
          ...resolvedData,
          name: user.name,
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
