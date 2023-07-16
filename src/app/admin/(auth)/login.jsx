"use client";
import React from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";

const validationShcema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});
const initialValues = {
  email: "",
  password: "",
};
const handleSubmit = (values) => {
  console.log(values);
};

// test auth
const Page = () => {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();
  // check if log in success redirect to home page
  if (session) {
    router.push("/admin/dashboard");
  }

  return (
    <div className="bg-white dark:bg-black w-full lg:w-[1290px] items-center h-[100vh] mx-auto flex flex-wrap  ">
      <div className="w-1/2 hidden md:flex justify-center items-center ">
        {/* eslint-disable-next-line @next/next/no-img-element */}

        <Image
          className="mx-auto w-96  flex pt-5 pb-10 max-sm:pb-6"
          width={170}
          height={100}
          src={`/assets/image/${theme === "dark" ? "login-dark" : "login"}.gif`}
          alt="logo photo"
        />
      </div>
      <div className="md:w-1/2 w-full">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationShcema}
        >
          <div className="form-container w-[90%]  xl:w-[600px] mx-auto  border p-10 rounded-[16px]">
            <Image
              className="mx-auto pt-5 pb-10 max-sm:pb-6"
              width={170}
              height={100}
              src={`/assets/image/${
                theme === "dark" ? "mainlogov2" : "mainlogo-blackv2"
              }.png`}
              alt="logo photo"
            />
            <h1 className="font-bold text-2xl mb-5 dark:text-white max-sm:text-center">
              Log In
            </h1>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <Field
                placeholder="enter your email"
                type="email"
                name="email"
                className="bg-gray-50 border rounded-[16px] border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mb-6"
            />
            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <Field
                placeholder="enter your password"
                type="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[16px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mb-6"
            />

            <div className="mt-8">
              <Link href={"/admin/dashboard"}>
                <button className="rounded-[16px] cursor-pointer hover:bg-gray-700  bg-[#E85854] p-2.5 w-full text-white border-none ">
                  {" "}
                  Log in{" "}
                </button>
              </Link>
            </div>
            <div className="divider dark:divide-white">
              <span className="font-extralight dark:text-white text-[12px]">
                OR
              </span>
            </div>
            <button
              onClick={() => signIn("google")}
              className="cursor-pointer p-2.5 bg-slate-100 dark:bg-black  dark:text-white  border w-full rounded-[16px]"
            >
              <FcGoogle className="inline" /> Log in with google
            </button>
            <small className="justify-end flex mt-10 dark:text-white mr-2">
              forgot password ?{" "}
              <span className="text-[#E85854] cursor-pointer ps-3">
                <Link href={"/sendemail"}>click here</Link>{" "}
              </span>{" "}
            </small>
          </div>
        </Formik>
      </div>
    </div>
  );
};

export default Page;
