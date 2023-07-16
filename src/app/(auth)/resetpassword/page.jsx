'use client'
import React, { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useResetPasswordMutation } from "@/store/features/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCodeVerifyForget, selectEmail, setCodeVerifyForget, setEmail } from "@/store/features/anonymous/anonymousSlice";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch()
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const verifiedCode = useSelector(selectCodeVerifyForget);
  const email = useSelector(selectEmail);

  const handleSubmit = async (values) => {
    const password = values?.password;
    const confirmedPassword = values?.confirmPassword;
    try {
      const dataResetPassword = await resetPassword({
        email,
        password,
        confirmedPassword,
        verifiedCode,
      }).unwrap();
      const message = dataResetPassword.message
        ? dataResetPassword.message
        : "You change password success.";
        toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("dataResetPassword", dataResetPassword);
      dispatch(setCodeVerifyForget(""));
      dispatch(setEmail(""))
      router.push("/login");
      return;
    } catch (err) {
      toast.error("Something went wrong... please check", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log(values);
  };

  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="py-10">
      <div className="w-[90%] lg:w-[600px] mx-auto shadow-md rounded-[16px] p-5 dark:bg-slate-800 bg-white">
        <h1 className="font-semibold text-[32px] dark:text-white max-sm:hidden mb-3">
          Password and Email
        </h1>
        <div className="max-sm:drawer md:hidden block ">
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="drawer-button">
              <h1 className="font-semibold mb-6 dark:text-white text-[32px]">
                Reset Password
              </h1>
            </label>
          </div>
        </div>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-light text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[16px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <span
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => handleTogglePassword("password")}
                  >
                    {showPassword ? <HiEyeOff /> : <HiEye />}
                  </span>
                </div>
              </div>
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500 text-sm mb-6"
              />
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-light text-gray-900 dark:text-white"
                >
                  Confirm new password
                </label>
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[16px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <span
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => handleTogglePassword("confirmPassword")}
                  >
                    {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                  </span>
                </div>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component={"div"}
                className="text-red-500 text-sm mb-6"
              />
              <button
                type="submit"
                className={`btn-util mt-3 text-white ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
					<>
						<svg
							className="animate-spin h-5 w-5 mx-auto text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
							></circle>
							<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
				  </>
                ) : (
                  "Save Change"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}