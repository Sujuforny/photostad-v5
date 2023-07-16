"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Link from "next/link";

//import toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "@/lib/baseUrl";
const FILE_SIZE = 1024 * 1024 * 10; // 10MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const USER_ID = 41;
const validationSchema = Yup.object().shape({
  // validate username
  username: Yup.string()
    .trim()
    .required("Username is required")
    .matches(/^\S+$/, "Username cannot spaces")
    .matches(/^[a-zA-Z0-9 ]*$/, "Username cannot contain special characters"),
  // validate gender
  gender: Yup.string().required("Gender is required"),
  // validate first_name
  first_name: Yup.string()
    .trim()
    .required("First name is required")
    .matches(/^\S+$/, "first name cannot spaces")
    .matches(/^[a-zA-Z0-9 ]*$/, "First name cannot contain special characters"),
  // validate last_name
  last_name: Yup.string()
    .trim()
    .required("Last name is required")
    .matches(/^\S+$/, "last name cannot spaces")
    .matches(/^[a-zA-Z0-9 ]*$/, "Last name cannot contain special characters"),
  // validate phone number
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(9, "Phone number must be at least 10 digits")
    .max(15, "Phone number can be at most 15 digits"),
  // validate date of birth
  date: Yup.date().required("Date is required"),

  //validate address
  address: Yup.string().required("Address is required"),
  //validate biography
  biography: Yup.string().required("biography is required"),

  file: Yup.mixed()
    .test("fileSize", "File too large", (value) => {
      console.log("value", value);
      if (!value) {
        return true;
      }
      return value.size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .required("Required"),
});
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [informationUser, setInformationUser] = useState({});
  const [initialValues, setInitialValues] = useState({});
  // const initialValues = {
  //   username: informationUser.username,
  //   gender:informationUser.gender,
  //   first_name:informationUser.familyName,
  //   last_name:"",
  //   date: "2002-03-20",
  //   address: "Phnom Penh",
  //   phone_number: "0123456789",
  //   biography: "Hello O tin",
  //   file: null,
  // }
  // handle submit to send data to the server

  const sendToServer = async (values, idImage) => {
    console.log(idImage, "id image: ", values.username);
    setIsLoading(true);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      username: values.username,
      familyName: values.last_name,
      givenName: values.first_name,
      gender: values.gender,
      dob: values.date,
      phoneNumber: values.phone_number,
      avatar: idImage,
      address: values.address,
      biography: values.biography,
    });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        BASE_URL + "users/" + USER_ID,
        requestOptions
      );
      const data = await response.json();
      setTimeout(() => {
        setIsLoading(false);
        toast.success("🦄 successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSubmitting(false);
      }, 5000);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  const uploadImage = async (values) => {
    setIsLoading(true);
    var requestOption = {
      method: "POST",
      body: values.file,
      redirect: "follow",
    };
    try {
      const res = await fetch(BASE_URL + "files", requestOption);
      const dataFiles = await res.json();
      return dataFiles;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        const res = await fetch(
          "http://136.228.158.126:8002/api/v1/users/email?email=pengny2002@gmail.com",
          requestOptions
        );
        const dataUser = await res.json();
        setInformationUser(dataUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const initial = {
      username: informationUser?.data?.username,
      gender: informationUser?.data?.gender,
      first_name: informationUser?.data?.givenName,
      last_name: informationUser?.data?.familyName,
      date: informationUser?.data?.dob,
      address: informationUser?.data?.address,
      phone_number: informationUser?.data?.phoneNumber,
      biography: informationUser?.data?.biography,
      file: null,
    };
    setInitialValues(initial);
  }, [informationUser]);
  // useEffect(()=>{
  //   console.log("datauser", informationUser);
  //   console.log("setInitialValues",initialValues);
  // },[initialValues])
  return (
    <main className=" dark:bg-primary db-bg">
      <section className=" p-5">
        <div className="sticky top-20 z-40 db-bg dark:bg-primary">
          <h1 className="text-[32px] text-light dark:text-white font-semibold mb-5">
            Profile
          </h1>
          <div className="text-sm mb-3 breadcrumbs">
            <ul className="font-extralight text-light dark:text-white">
              <li>
                <Link className="text-black dark:text-white" href="/admin/dashboard">Admin</Link>
              </li>
              <li>
                <Link className="text-black dark:text-white" href={"/admin/dashboard/setting/profile"}>Setting</Link>
              </li>
            </ul>
          </div>
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            //upload file to server
            const formData = new FormData();
            formData.append("file", values.file);
            const image = await uploadImage({ file: formData });

            console.log("avatar", image);
            //upload image to server
            var raw = JSON.stringify({
              name: image.data.name,
              type: "user",
            });
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var request = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };
            const ress = await fetch(BASE_URL + "images", request);
            const data = await ress.json();
            const idImage = data?.data?.id;
            sendToServer(values, idImage);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="h-full">
              <div className="grid gap-x-10 gap-6 mb-6 md:grid-cols-2 w-full ">
                {/* user name */}
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* sex */}
                <div className="mb-3">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select an option
                  </label>
                  <Field
                    as="select"
                    id="gender"
                    name="gender"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Choose a gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* First name */}
                <div className="mb-3">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <Field
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* Last name */}
                <div className="mb-3">
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <Field
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    required
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* phone number */}
                <div className="mb-3">
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <Field
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* date */}
                <div>
                  <div class="relative mb-3 w-full">
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      date of birth
                    </label>
                    <div class="absolute top-[41px] left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>

                    <Field
                      type="date"
                      name="date"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                    />
                  </div>

                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* address */}
                <div className="mb-3">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <Field
                    as="textarea"
                    id="address"
                    name="address"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-main border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your address..."
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* message */}
                <div className="mb-3">
                  <label
                    htmlFor="biography"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Bio
                  </label>
                  <Field
                    as="textarea"
                    id="biography"
                    name="biography"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-main border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your biography..."
                  />
                  <ErrorMessage
                    name="biography"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className=" mb-6 w-full ">
                  <label htmlFor="file" className="mb-1 text-black dark:text-white">
                    Avatar
                  </label>
                  <Field
                    type="file"
                    name="file"
                    id="file"
                    setFieldValue={setFieldValue}
                    component={FileUpload}
                    className="input-file input-file-lg"
                  />
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className={`${
                  isSubmitting ? "cursor-not-allowed" : " "
                } text-white bg-black rounded-main hover:bg-[#333] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>

        {/* Overlay Loading */}
        {isLoading && (
          <section className="z-50 absolute w-screen top-0 h-screen bg-center bg-no-repeat bg-opacity-70 bg-gray-700 bg-blend-multiply">
            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
              {/* <img src="./assets/loading/Photo.gif"/> */}
              <img src="https://media.tenor.com/cLJw2fJh85QAAAAi/tkthao219-bunny.gif" />
            </div>
          </section>
        )}
      </section>
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
    </main>
  );
}

function FileUpload({ field, form, setFieldValue }) {
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <input
          type="file"
          onChange={handleChange}
          className="file-input file-input-bordered file-input-[black] h-[45px] text-black bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 rounded-main dark:focus:border-blue-500"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="preview"
            className="mt-4 rounded-full w-20 h-20"
          />
        )}
      </div>
    </>
  );
}
