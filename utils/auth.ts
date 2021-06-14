import { KeystoneContext, MaybePromise } from "@keystone-next/types";
import { SessionDataType } from "../types";

export const isAdmin: (session: SessionDataType) => MaybePromise<boolean> = (
  session
) => {
  return !!session?.data.isAdmin;
};

export const isLoggedIn: (session: SessionDataType) => MaybePromise<boolean> = (
  session
) => {
  return !!session?.data;
};
