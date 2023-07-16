"use client";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import React, { useState } from "react";
import { getSession, useSession} from "next-auth/react";
import { useGetUserQuery, useUpdateProfileMutation } from "@/store/features/user/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentUserAvatar } from "@/store/features/auth/authSlice";
import { useUploadSingleMutation } from "@/store/features/upload-single/uploadSIngleApiSlice";
import { useAddImageByNameMutation } from "@/store/features/image/imageApiSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CiCircleChevLeft } from "react-icons/ci";
import SideSettingNav from "@/components/profile/SideSettingNav";

export default function Page({session}) {
  const [addImageByName]= useAddImageByNameMutation()
  const [ updateProfile,{isLoading}] = useUpdateProfileMutation()
  const {data:user} = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const initialValues = {
    lastName:user?.givenName, 
    firstName:user?.familyName, 
    gender: user?.gender,
    biography: user?.biography,
    image: user?.avatarUrl,
  };

  const handleSubmit = async (values) => {
    try {
      // Handle form submission
      console.log("values file", values);
      console.log("values file", values.image);
  
      const files = values.image;
      const formdata = new FormData();
      formdata.append('file', files);
  
      const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };
  
      const response = await fetch('https://photostad-api.istad.co/api/v1/files', requestOptions);
      const dataFile = await response.json();
      console.log("dataFile", dataFile);
      if(dataFile.status===400){
         const uuid = user?.uuid;
         const avatar = user?.avatar.id
         const { firstName: familyName, lastName: givenName, gender, biography } = values;
         const body = { familyName, givenName, gender, avatar, biography };
         const dataUpdateUser = await updateProfile({ uuid, data: body });      
         toast.success('successfully', {
          position: "top-right",
          autoClose: 2000,  
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
         console.log("dataUpdateUser hehehe", dataUpdateUser);
         return;
      }
      const name = dataFile?.data.name;
      const type = "User";
      try{
        const dataImage = await addImageByName({ name, type }).unwrap();
        console.log("dataImage", dataImage);
        try{
          const uuid = user?.uuid;
          const avatar = dataImage?.data.id;
          const { firstName: familyName, lastName: givenName, gender, biography } = values;
          const body = { familyName, givenName, gender, avatar, biography };
          const dataUpdateUser = await updateProfile({ uuid, data: body });
          toast.success('successfully', {
            position: "top-right",
            autoClose: 2000,  
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          console.log("dataUpdateUser===>", dataUpdateUser);
          
        }catch(err){
          console.log(err,"err form dataUpdateUser");
        }
      }catch(e){
        console.log("Error dataimge=================>",e);
      }
    
      
    } catch (error) {
      console.log("Error handling form submission:", error);
    
    }
  };
  

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md w-[90%] mx-auto p-5 rounded-[16px]">

      {/* drawer */}
      <div className="md:hidden mb-3">
        <input type="checkbox" id="drawer-left" className="drawer-toggle" />
        <label htmlFor="drawer-left">
          <h1 className="font-semibold dark:text-white text-[32px]  ">
            <CiCircleChevLeft className="inline" /> Profile Setting
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
      {/* Page content here */}

      <h1 className="font-semibold max-sm:hidden dark:text-white text-[32px]">
        Profile Setting
      </h1>
      <h2 className="mt-5 font-light dark:text-white">Profile Information</h2>
      <Formik 
      enableReinitialize
      initialValues={initialValues} 
      onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form className="flex flex-wrap mt-5">
            <div className="max-sm:w-full">
              <div className="mb-6">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <Field
                  placeholder="Enter your last name"
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="shadow-sm bg-[whitesmoke] w-full text-gray-900 text-sm rounded-lg focus:ring-red-400 focus:border-red-400 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-400 dark:focus:border-red-400 dark:shadow-sm-light"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <Field
                  placeholder="Enter your first name"
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="shadow-sm bg-[whitesmoke] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select your gender
              </label>
              <Field
                as="select"
                id="gender"
                name="gender"
                className="bg-[whitesmoke] md:mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
            </div>
            <div className="max-sm:w-full lg:ms-32">
              <div className="pf-user mt-5">
                <Field
                  as={FileInput}
                  label="Profile Image"
                  name="image"
                  setFieldValue={setFieldValue}
                />
              </div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Bio
              </label>
              <Field
                as="textarea"
                name="biography"
                className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-400 h-28 dark:focus:border-red-400 dark:shadow-sm-light bg-[whitesmoke] w-full md:w-[400px] rounded-[16px]"
              />
            </div>
            <button
              type="submit"
              className="mainround p-2.5 max-sm:w-full max-sm:mt-3 hover:text-white hover:shadow-2xl hover:shadow-blue-600 hover:bg-[#23c483] hover:-translate-y-2 transform transition-all duration-300 ease-in-out bg-[#E85854]  text-white font-[35px] text-center py-2 rounded-[16px] text-[17px]"
            >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
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

const FileInput = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const [previewImage, setPreviewImage] = useState(null);
  const {data:user} = useSelector(selectCurrentUser)
  
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setFieldValue(props.name, file);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <input
          type="file"
          id={props.id || props.name}
          name={props.name}
          onChange={handleFileChange}
          className="hidden"
          
        />
        {previewImage ? (
          <img
            src={previewImage ? previewImage : "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"}
            alt="Preview"
            className="w-36 mb-2 h-36 object-cover rounded-full"
          />
        ) : (
          <img
            src={user?.avatarUrl ? user.avatarUrl :"https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"}
            alt="avatar"
            className="w-36 mb-2 h-36 object-cover rounded-full"
          />
        )}
        <label
          htmlFor={props.id || props.name}
          className="absolute inset-0 flex items-center justify-center w-full h-full bg-gray-200 bg-opacity-50 cursor-pointer rounded-full"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </label>
      </div>
      <label
        htmlFor={props.id || props.name}
        className="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm">{meta.error}</div>
      )}
    </div>
  );
};


