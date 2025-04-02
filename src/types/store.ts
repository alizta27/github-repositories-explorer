import { GlobalState, SearchState } from "@/interfaces";

import { AddTypePrefix } from "./common";
import { STORE_PREFIX } from "./enum";

export type GlobalSlice = AddTypePrefix<GlobalState, STORE_PREFIX.GLOBAL>;

export type SearchSlice = AddTypePrefix<SearchState, STORE_PREFIX.SEARCH>;

export type StoreType = GlobalSlice & SearchSlice;
