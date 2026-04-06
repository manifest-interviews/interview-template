import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";

export function Wait<T, E = Error>({
  for: query,
  children,
  loading = <p className="text-zinc-500">Loading...</p>,
  error = () => <p className="text-red-500">Something went wrong.</p>,
}: {
  for: UseQueryResult<T, E>;
  children: (data: T) => ReactNode;
  loading?: ReactNode;
  error?: (error: E) => ReactNode;
}) {
  if (query.isError) return error(query.error);
  if (query.data === undefined) return loading;
  return children(query.data);
}
