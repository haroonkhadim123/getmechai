"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import Loader from "./Loader";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [navbarLogoutLoading, setNavbarLogoutLoading] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigate to page
  const handlePage = () => {
     if (pathname === "/login") return;
    setPageLoading(true);
    router.push(session ? "/username" : "/login");
    setPageLoading(false);
  };

  // Login handler (FIXED)
  const handleLogin = () => {
    if (pathname === "/login") return; // ✅ prevent loader on same page
    setLoginLoading(true);
    router.push("/login");
    setLoginLoading(false)
  };

  // Logout
  const handleNavbarLogout = async () => {
    setNavbarLogoutLoading(true);
    await signOut({ callbackUrl: "/" });
    toast.success("Logout successfully ✅");
  };

  return (
    <div className="bg-slate-800 md:p-4 md:px-40 px-2 p-2 flex justify-between items-center shadow-2xl">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-white font-bold">
        <img width={40} src="/tea.gif" alt="logo" />
        GetmeChai
      </Link>

      <div className="flex gap-4 items-center">
        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl px-4 py-2.5"
          >
            Action
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-50">
              <button
                onClick={handlePage}
                disabled={pageLoading}
                className="w-full px-4 py-2 hover:bg-gray-100 text-black flex justify-center"
              >
                {pageLoading ? <Loader className="border border-black" /> : "Your page"}
              </button>
            </div>
          )}
        </div>

        {/* Login */}
        {!session && (
          <button
            onClick={handleLogin}
            disabled={loginLoading}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl px-4 py-2.5"
          >
            {loginLoading ? <Loader /> : "Login"}
          </button>
        )}

        {/* Logout */}
        {session && (
          <button
            onClick={handleNavbarLogout}
            disabled={navbarLogoutLoading}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl px-4 py-2.5"
          >
            {navbarLogoutLoading ? <Loader /> : "Logout"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
