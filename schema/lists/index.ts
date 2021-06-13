import AllianceLists from "./alliance";
import CommonLists from "./common";
import CoordinationLists from "./coordination";
import PostLists from "./post";
import TagLists from "./tag";
import UserLists from "./user";

export default {
  ...AllianceLists,
  ...CommonLists,
  ...CoordinationLists,
  ...PostLists,
  ...TagLists,
  ...UserLists,
};
