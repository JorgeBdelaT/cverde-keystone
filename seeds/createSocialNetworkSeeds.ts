import { KeystoneDbAPI } from "@keystone-next/types";

const socialNetworks = [
  {
    data: {
      name: "Facebook",
      logoUrl: "https://facebook.com",
    },
  },
  {
    data: {
      name: "Instagram",
      logoUrl: "https://instagram.com",
    },
  },
  {
    data: {
      name: "Linkedin",
      logoUrl: "https://linkedin.com",
    },
  },
];

export const createSocialNetworkSeeds = async (db: {
  lists: KeystoneDbAPI<any>;
}) => {
  const elementsCount = await db.lists.SocialNetwork.count();
  if (elementsCount < socialNetworks.length) {
    await db.lists.SocialNetwork.createMany({ data: socialNetworks });
  }
};
