import { KeystoneDbAPI } from "@keystone-next/types";

const positions = [
  {
    data: {
      name: "Jefe de coordinacion",
      description: "Es el jefe de una coordinación",
    },
  },
  {
    data: {
      name: "Encargado de finanzas",
      description: "Es el encargado de finanzas de una agrupación",
    },
  },
  {
    data: {
      name: "Encargado de comunicaciones",
      description: "Es el encargado de comunicaciones de una agrupación",
    },
  },
];

export const createPositionSeeds = async (db: {
  lists: KeystoneDbAPI<any>;
}) => {
  const elementsCount = await db.lists.Position.count();
  if (elementsCount < positions.length) {
    await db.lists.Position.createMany({ data: positions });
  }
};
