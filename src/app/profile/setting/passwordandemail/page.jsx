'use client'
import React, { useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import { useUpdatePasswordByIdMutation } from "@/store/features/user/userApiSlice";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { HiEye, HiEyeOff } from "react-icons/hi";
import SideSettingNav, { SIdeSettingNav } from "@/components/profile/SideSettingNav";
import SettingNavMenu from "@/components/profile/SettingNavMenu";
import { ToastContainer, toast } from "react-toastify";
import { CiCircleChevLeft } from "react-icons/ci";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

export default function Page() {
  const [updatePassword, { isLoading }] = useUpdatePasswordByIdMutation();
  const dataUser = useSelector(selectCurrentUser);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values) => {
    // Handle form submission
    console.log(values);
    if (dataUser) {
      try {
        console.log("data in profile", dataUser);
        const userId = dataUser?.data.uuid;
        const oldPassword = values.currentPassword
        const newPassword = values.newPassword
        const confirmedPassword = values.confirmPassword 
        const data ={
          oldPassword,
          newPassword,
          confirmedPassword
        }      
        const { data:pw } = await updatePassword({id:userId, data}).unwrap();
        toast.success("Password updated successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (e) {
          toast.error("Invalid old password", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      }
    }
  };

  const handleTogglePassword = (field) => {
    if (field === "currentPassword") {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === "newPassword") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="w-[90%] lg:w-[100%] mx-auto rounded-[16px] p-5 dark:bg-slate-800 bg-white">

          {/* drawer */}
          <div className="md:hidden mb-3">
        <input type="checkbox" id="drawer-left" className="drawer-toggle" />
        <label htmlFor="drawer-left" >
        <h1 className="font-semibold dark:text-white text-[32px]  ">
        <CiCircleChevLeft className="inline"/>  Password and Email
      </h1>
     
        </label>
        <label className="overlay" htmlFor="drawer-left"></label>
        <div className="drawer bg-transparent">
          <div className="drawer-content pt-10 flex flex-col h-full">
            <SideSettingNav />
          </div>
        </div>
      </div>
     
      {/* end of drawer */}
      <h1 className="font-semibold text-[32px] dark:text-white max-sm:hidden mb-3">
        Password and Email
      </h1>


      <div className="max-sm:drawer md:hidden block">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="drawer-button">
            <h1 className="font-semibold mb-6 dark:text-white text-[32px]">
              <IoIosArrowDropleft className={"inline mr-2.5"} />
              Password and Email
            </h1>
          </label>
        </div>
        <SettingNavMenu />
      </div>
      <p className="font-light mb-3 dark:text-white ">setha@photostad.co</p>
      <h2 className="text-[24px] font-semibold dark:text-white ">
        Change Password
      </h2>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="my-6">
            <label
              htmlFor="currentPassword"
              className="block mb-2 text-sm font-light text-gray-900 dark:text-white"
            >
              Current password
            </label>
            <div className="relative">
              <Field
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                className="bg-gray-50 border border-gray-300 w-full text-gray-900 text-sm rounded-[16px] focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {showCurrentPassword ? (
                <HiEye
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => handleTogglePassword("currentPassword")}
                />
              ) : (
                <HiEyeOff
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => handleTogglePassword("currentPassword")}
                />
              )}
            </div>
            <ErrorMessage
              name="currentPassword"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-light text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <div className="relative">
              <Field
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[16px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {showNewPassword ? (
                <HiEye
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => handleTogglePassword("newPassword")}
                />
              ) : (
                <HiEyeOff
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => handleTogglePassword("newPassword")}
                />
              )}
            </div>
            <ErrorMessage
              name="newPassword"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[16px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {showConfirmPassword ? (
                <HiEye
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => handleTogglePassword("confirmPassword")}
                />
              ) : (
                <HiEyeOff
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => handleTogglePassword("confirmPassword")}
                />
              )}
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <button type="submit" className="btn-util mt-3 text-black dark:text-white">
            {isLoading ? "Saving ..." : "Save Change"}
          </button>
        </Form>
      </Formik>
      <ToastContainer
      position="top-right"
      autoClose={3000}
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