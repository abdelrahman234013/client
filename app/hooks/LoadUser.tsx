"use client";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";

export const LoadUsers = ({ children }: any) => {
  const { isLoading } = useLoadUserQuery({});

  return <> {!isLoading && <>{children}</>} </>;
};
