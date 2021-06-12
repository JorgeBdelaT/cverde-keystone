import { createSchema } from "@keystone-next/keystone/schema";
import { Tag, Post, User } from "./lists";

export const lists = createSchema({
  User,
  Post,
  Tag,
});
