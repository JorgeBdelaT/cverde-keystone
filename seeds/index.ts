import { KeystoneDbAPI } from "@keystone-next/types";
import { createPositionSeeds } from "./createPositionSeeds";
import { createSocialNetworkSeeds } from "./createSocialNetworkSeeds";
import { createUserSeeds } from "./createUserSeeds";

export const runSeeds = async (db: { lists: KeystoneDbAPI<any> }) => {
  await Promise.all([
    createSocialNetworkSeeds(db),
    createUserSeeds(db),
    createPositionSeeds(db),
  ]);
};
