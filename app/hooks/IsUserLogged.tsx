"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const IsUserLogged = ({ children }: any) => {
  const { user } = useSelector((state: any) => state.auth);
  return !user ? children : redirect("/");
};

export default IsUserLogged;
