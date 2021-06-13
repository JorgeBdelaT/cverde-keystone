import { createSchema } from "@keystone-next/keystone/schema";
import { Alliance, Tag, Post, User } from "./lists";

export const lists = createSchema({
  Alliance,
  Post,
  Tag,
  User,
});
