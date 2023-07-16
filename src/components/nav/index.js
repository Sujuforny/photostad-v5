"use client";
import React, { useEffect, useState } from "react";
import { BtnThemeToggle } from "../theme/BtnThemeToggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { LiaBarsSolid } from "react-icons/lia";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { logout, setCurrentUser } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useRegisterWithGoogleMutation } from "@/store/features/auth/authApiSlice";

const NavBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [logIn, setLogIn] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState("");
  const [userName, setUserName] = useState("");
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { data: user, isSuccess } = useGetUserQuery();
  const [registerWithGoogle] = useRegisterWithGoogleMutation()
 
  // Get user information
  console.log("user information with google", session);
  const userWgoogle = async (email,username)=>{
    const dataUserWithGoogle = await registerWithGoogle({email,username}).unwrap()
    return dataUserWithGoogle;
  }
  useEffect(() => {
    if (isSuccess && user) {
      setLogIn(true);
      dispatch(setCurrentUser(user));
      const { avatarUrl, familyName, givenName } = user?.data;
      setUserImageUrl(avatarUrl);
      setUserName(` ${givenName} ${familyName}`);
    } else if (session) {
      console.log("user already logged in", session);
      const email = session?.user?.email
      const name = session?.user?.name
      const username = name.replace(/\s/g, '').toLowerCase();
      console.log(username,email,"userName and email");
      try{
        const a = userWgoogle(email,username)
        console.log(a,"user login with google");
      }catch(e){
        console.log(e,"error login with google");
      }
      setLogIn(true);
      setUserImageUrl(session?.user?.image);
      setUserName(session?.user?.name);
    }


  }, [dispatch, isSuccess, user, session]);
   //protected routes
   if (pathName.includes("/profile/setting") || pathName.includes("/profile/setting/passwordandemail") || pathName.includes("/profile/setting/generalsetting") || pathName.includes("/profile/setting/moreinfo")) {
    if (!isSuccess && !user) {
      router.push("/login");
      return null;
    } 
  }
    if(pathName.includes("/admin/")){
       
    }
  const logouts = async () => {
    dispatch(logout());
    await signOut({ redirect: false });
    router.push("/");
    window.location.reload();
  };
  // end of auth config
  const { theme, setTheme } = useTheme();

  //disable in auth part
  if (pathName.includes("/login")) {
    return null;
  }
  if (pathName.includes("/signup")) return null;
  if (pathName.includes("/otp-verification")) return null;
  if(pathName.includes("/sendemail")) return null;

  // end of disable in auth part
  if (pathName.includes("/dashboard")) return null;
  if (pathName.includes("/dashboard/*")) return null;

  return (
    <div className="navbar navbar-no-boxShadow h-[80px] bg-white dark:bg-[#1e1e1e] sticky top-0 z-50 ">
      <div className="px-5 navbar navbar-no-boxShadow bg-white  sticky top-0 z-50 dark:bg-[#1e1e1e] w-full xl:w-[1290px] mx-auto max-sm:px-5">
        <div className="navbar-start">
          <Link href={"/"}>
            {theme === "dark" ? (
              <Image
                height={50}
                width={131}
                className="md:w-[131px] w-[100px]"
                src="/assets/image/mainlogov2.png"
                alt="logo img"
              />
            ) : (
              <Image
                height={50}
                width={131}
                className="md:w-[131px] w-[100px]"
                src="/assets/image/mainlogo-blackv2.png"
                alt="logo dark img"
              />
            )}
          </Link>
        </div>
        <div className="navbar-center hidden  gap-5 lg:flex">
          <Link
            href={"/"}
            className=" hover:text-black dark:hover:text-white text-black dark:text-white"
          >
            Home
          </Link>
          <a
            href=""
            className=" hover:text-black dark:hover:text-white text-black dark:text-white"
          >
            Watermark
          </a>
          <a
            href={"/"}
            className=" hover:text-black dark:hover:text-white text-black dark:text-white"
          >
            Certificate
          </a>
          <Link
            href={"/aboutus"}
            className=" hover:text-black dark:hover:text-white text-black dark:text-white whitespace-nowrap"
          >
            About Us
          </Link>
          {/* <a className="navbar-item hover:text-black dark:hover:text-white dark:text-white text-black">
            Dashboard
          </a> */}
        </div>
        <div className="navbar-end gap-3">
          <BtnThemeToggle />
          {/*}  <Link href={'/login'}>
         <button className="rounded-main btn bg-red-500 text-white hidden lg:block">
            log in
          </button>
         </Link>
         <Link href={'/signup'}>
         <button className="rounded-main btn bg-red-500 text-white hidden lg:block">
            Sign Up
          </button>
         </Link> */}
          {user || session ? (
            <>
              <div class="dropdown">
                {/* <label class="btn btn-solid-primary my-2" tabindex="0">Click</label> */}
                <div
                  tabindex="0"
                  className="md:w-10 md:h-10   w-7 h-7 avatar avatar-ring-primary"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    // src={
                    //   userImageUrl
                    //     ? userImageUrl
                    //     : "https://photostad-api.istad.co/files/photo-user.jpg"
                    // }
                    src={userImageUrl?userImageUrl:"https://photostad-api.istad.co/files/photo-user.jpg"}
                    alt={"profile picture"}
                  />
                </div>
                <div class="dropdown-menu bg-white dark:bg-slate-900 dark:text-white text-black dropdown-menu-bottom-left">
                  <Link
                    href={"/profile/setting"}
                    className="dropdown-item text-sm hover:text-black"
                  >
                    {userName}
                  </Link>
                  <Link
                    tabindex="-1"
                    href={"/profile/setting"}
                    className="dropdown-item text-sm hover:text-black" 
                  >
                    Settings
                  </Link>
                  <button
                    className="py-2 bg-red-400 rounded-main"
                    onClick={() => {
                      logouts();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                href={"/login"}
                className=" me-1   hover:text-white hover:shadow-2xl hover:shadow-blue-600 hover:bg-[#23c483] hover:-translate-y-2 transform transition-all duration-300 ease-in-out
                                bg-[#E85854] hidden md:block text-white font-[35px] text-center py-2  rounded-[16px] w-[88px]  text-[17px]"
              >
                Log in
              </Link>
              <Link
                href={"/signup"}
                className="
                                 hover:text-white hover:shadow-2xl hover:shadow-blue-600 hover:bg-[#23c483] hover:-translate-y-2 transform transition-all duration-300 ease-in-out
                                bg-[#E85854] hidden md:block text-white font-[35px] text-center py-2  rounded-[16px] w-[88px]  text-[17px]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* drobdown responsive */}
        <div className="dropdown block lg:hidden ml-3">
          <label tabindex="0">
            <LiaBarsSolid className="text-black bg-white dark:bg-slate-900 dark:text-white text-xl " />
          </label>
          <div className="dropdown-menu dropdown-menu-bottom-left text-black bg-white dark:bg-slate-900 dark:text-white">
            <Link href={"/profilesetting"} className="dropdown-item text-sm hover:text-black">
              Profile
            </Link>

            <Link href={"/"} tabindex="-1" className="dropdown-item text-sm hover:text-black">
              Home
            </Link>
            <Link href={"/"} tabindex="-1" className="dropdown-item text-sm hover:text-black">
              Watermark
            </Link>
            <Link href={"/"} tabindex="-1" className="dropdown-item text-sm hover:text-black">
              Certificate
            </Link>
            <Link
              href={"/aboutus"}
              tabindex="-1"
              className="dropdown-item text-sm hover:text-black"
            >
              About Us
            </Link>

            <Link
              href={"/login"}
              tabindex="-1"
              className="dropdown-item text-sm hover:text-black"
            >
              log in
            </Link>
            <Link
              href={"/singup"}
              tabindex="-1"
              className="dropdown-item text-sm hover:text-black"
            >
              Sign up
            </Link>
            <Link
              href={"profile/setting"}
              tabindex="-1"
              className="dropdown-item text-sm hover:text-black"
            >
              Setting
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
