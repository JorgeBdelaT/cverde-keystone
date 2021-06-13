import { list } from "@keystone-next/keystone/schema";
import { relationship, timestamp } from "@keystone-next/fields";

export const CoordinationUserPosition = list({
  ui: {
    listView: { initialColumns: ["user", "coordination", "position"] },
  },
  fields: {
    createdAt: timestamp({
      isRequired: true,
      defaultValue: new Date().toISOString(),
    }),
    endDate: timestamp(),
    startDate: timestamp(),
    coordination: relationship({ ref: "Coordination.members" }),
    position: relationship({ ref: "Position" }),
    user: relationship({ ref: "User" }),
  },
});
