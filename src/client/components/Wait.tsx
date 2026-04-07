import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";

type TsRestResponse = { status: number; body: unknown };
type SuccessStatus = 200 | 201 | 202 | 204;
type SuccessResponse<T extends TsRestResponse> = Extract<T, { status: SuccessStatus }>;

/**
 * Renders loading/error states for a React Query result.
 *
 * Handles both network errors (React Query `isError`) and non-2xx responses
 * from ts-rest, which land in `data` rather than triggering `isError`.
 *
 * ```tsx
 * const query = tsr.foo.useQuery(...);
 *
 * <Wait for={query}>
 *   {(data) => <div>{data.body.title}</div>}
 * </Wait>
 * ```
 */
export function Wait<T extends TsRestResponse>({
  for: query,
  children,
  loading = <p className="text-zinc-500">Loading...</p>,
  error = <p className="text-red-500">Something went wrong.</p>,
}: {
  for: UseQueryResult<T, any>;
  children: (data: SuccessResponse<T>) => ReactNode;
  loading?: ReactNode;
  error?: ReactNode;
}) {
  if (query.isError) return error;
  if (query.data === undefined) return loading;
  if (query.data.status < 200 || query.data.status >= 300) return error;
  return children(query.data as SuccessResponse<T>);
}
