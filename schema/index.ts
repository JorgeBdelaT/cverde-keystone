import { createSchema } from "@keystone-next/keystone/schema";
import ListsSchema from "./lists";

export const lists = createSchema(ListsSchema);
