"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { LoadUsers } from "../hooks/LoadUser";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <SessionProvider>
      <LoadUsers>{children}</LoadUsers>
      </SessionProvider>
    </Provider>
  );
}
