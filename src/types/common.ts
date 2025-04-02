import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TSFixMe = any;
// eslint-enable @typescript-eslint/no-explicit-any

export type AddTypePrefix<T, P extends string> = {
  [K in keyof T as `${P}${string & K}`]: T[K];
};

export type FlattenKeys<
  T,
  P extends string = "",
  Depth extends number[] = [],
> = Depth["length"] extends 10 // Limiting recursion depth to 10 levels
  ? never
  : {
      [K in keyof T]: T[K] extends string
        ? `${P}${P extends "" ? "" : "_"}${K & string}`
        : FlattenKeys<
            T[K],
            `${P}${P extends "" ? "" : "_"}${K & string}`,
            [...Depth, 1]
          >;
    }[keyof T];

export type PathObjectType = {
  [key: string]: string | PathObjectType;
};

export type ReactQueryRefetchType<TData, TError> = (
  options?: RefetchOptions,
) => Promise<QueryObserverResult<TData, TError>>;

export type QueryRefetchType<TData> = ReactQueryRefetchType<TData, Error>;
