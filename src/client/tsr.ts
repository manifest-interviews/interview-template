// Generates React Query hooks from the ts-rest contract. Usage:
//
//   tsr.products.list.useQuery({ queryKey: ["products"] })
//   tsr.products.create.useMutation()
//
// Each contract route becomes a hook automatically — no fetch code needed.

import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { contract } from "../shared/contract";

export const tsr = initTsrReactQuery(contract, {
  baseUrl: "",
});
