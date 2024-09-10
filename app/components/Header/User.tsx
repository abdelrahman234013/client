"use client";
import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Link from "next/link";
import {
  useLogOutMutation,
  useSocialAuthMutation,
} from "@/app/redux/features/auth/authApi";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";

const User = ({ user }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [Logout, { isSuccess: LogoutSuccess }] = useLogOutMutation();

  const { data } = useSession();
  const [socialAuth, { error: authError, isSuccess: authSuccess, isLoading }] =
    useSocialAuthMutation();

  useEffect(() => {
    if (!user) {
      if (data?.user && !isLoading) {
        socialAuth({ name: data?.user?.name, email: data?.user?.email });
      }
    }
    if (authError) {
      if ("data" in authError) {
        const authErrorMsg = authError as any;
        toast.error(authErrorMsg?.data?.message);
      }
    }
    if (LogoutSuccess && data?.user) {
      signOut();
    }
  }, [user, authError, LogoutSuccess]);

  return (
    <>
      {/* mobile screens */}
      <div className="flex-center block md:hidden">
        {isOpen ? (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center  hover:text-primary hover:border-white text-secondary"
            >
              <GrClose size={23} />
            </button>
            <div className="bg-black rounded-md  px-6 py-4 flex flex-col gap-3 items-center justify-center text-secondary absolute top-11 right-0">
              {["owner", "admin"].includes(user?.role) && (
                <>
                  <Link href={"/admin"} className="hover:text-primary">
                    Admin
                  </Link>
                  <div
                    className="cursor-pointer hover:text-primary"
                    onClick={async () => {
                      Logout({});
                    }}
                  >
                    Logout
                  </div>
                </>
              )}

              {user?.role === "user" && (
                <>
                  <div
                    className="cursor-pointer hover:text-primary"
                    onClick={async () => {
                      Logout({});
                    }}
                  >
                    Logout
                  </div>
                </>
              )}

              {!user && (
                <>
                  <Link href={"/login"} className="hover:text-primary">
                    Login
                  </Link>
                  <Link href={"/signup"} className="hover:text-primary">
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center  hover:text-primary hover:border-white text-secondary"
          >
            <HiOutlineMenuAlt3 size={23} />
          </button>
        )}
      </div>
      {/* large screens */}
      <div className="md:flex hidden gap-[16px] text-[18px] justify-center text-secondary items-center">
        {["owner", "admin"].includes(user?.role) && (
          <>
            <Link href={"/admin"} className="hover:text-primary">
              Admin
            </Link>
            <div
              className="cursor-pointer hover:text-primary"
              onClick={async () => {
                Logout({});
              }}
            >
              Logout
            </div>
          </>
        )}

        {user?.role === "user" && (
          <>
            <div
              className="cursor-pointer hover:text-primary"
              onClick={async () => {
                Logout({});
              }}
            >
              Logout
            </div>
          </>
        )}

        {!user && (
          <>
            <Link href={"/login"} className="hover:text-primary">
              Login
            </Link>
            <Link href={"/signup"} className="hover:text-primary">
              Signup
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default User;
