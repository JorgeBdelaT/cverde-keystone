import { KeystoneDbAPI } from "@keystone-next/types";

const users = [
  {
    data: {
      name: "jorge",
      email: "jorge@cverde.org",
      isAdmin: true,
      password: "12345678",
    },
  },
  {
    data: {
      name: "seba",
      email: "seba@cverde.org",
      isAdmin: false,
      password: "12345678",
    },
  },
  {
    data: {
      name: "javi",
      email: "javi@cverde.org",
      isAdmin: true,
      password: "12345678",
    },
  },
];

export const createUserSeeds = async (db: { lists: KeystoneDbAPI<any> }) => {
  const elementsCount = await db.lists.User.count();
  if (elementsCount < users.length) {
    await db.lists.User.createMany({ data: users });
  }
};
