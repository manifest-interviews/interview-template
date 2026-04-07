// Generates React Query hooks from the ts-rest contract. Usage:
//
//   tsr.notes.list.useQuery({ queryKey: ["notes"] })
//   tsr.notes.create.useMutation()
//
// Each contract route becomes a hook automatically — no fetch code needed.

import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { contract } from "../shared/contract";

export const tsr = initTsrReactQuery(contract, {
  baseUrl: "",
});
