import { ACCOUNT_BOOKMARKS } from "./types";
import { fetchFromAccount } from "./account";

export const fetchAccountBookmarks = () =>
  fetchFromAccount({
    endpoint: "bookmarks",
    options: { credentials: "include" },
    FETCH_TYPE: ACCOUNT_BOOKMARKS.FETCH,
    ERROR_TYPE: ACCOUNT_BOOKMARKS.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT_BOOKMARKS.FETCH_SUCCESS
  });
