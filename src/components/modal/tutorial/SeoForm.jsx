'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import React from 'react'
import { BASE_URL } from '@/lib/baseUrl';


const validationSchema = Yup.object({
    keyword: Yup.string().required("Keyword is required"),
    openGraphTitle: Yup.string().required("Og Title is required"),
    openGraphDescription: Yup.string().required("Og Description is required"),
    openGraphUrl: Yup.string().required("Og Url is required"),
  });
export default function SeoForm({id}) {
    const handleSetSeo = async (values) => {
    
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        let raw = JSON.stringify({
          title: "aqefrg ewrfegty rgthry",
          createdBy: 32,
          keyword: values.keyword,
          openGraphTitle: values.openGraphTitle,
          openGraphUrl: values.openGraphUrl,
          openGraphDescription: values.openGraphDescription,
          openGraphType: "Photo Editor",
        });
    
        let requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch(
          `${BASE_URL}/tutorial-managements/${id}/config-seo`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      };

  return (
    <Formik
    enableReinitialize={true}
    initialValues={{
      title: "aqefrg ewrfegty rgthry",
      createdBy: 1,
      keyword: "",
      openGraphTitle: " ",
      openGraphUrl: " ",
      openGraphDescription: " ",
      openGraphType: "photo-editor ",
    }}
    validationSchema={validationSchema}
    onSubmit={async (values, { resetForm }) => {
      //   process send to server here
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
      }, 1000);
      handleSetSeo(values);
  
      resetForm();
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-5">
          <div className=" w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Keyword
            </label>
            <Field
              type="text"
              name="keyword"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
            />
            <ErrorMessage
              name="keyword"
              component="h1"
              className="text-red-500 text-xs italic"
            />
          </div>
          <div className=" w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              OpenGraph Title
            </label>
            <Field
              type="text"
              name="openGraphTitle"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" "
            />
            <ErrorMessage
              name="openGraphTitle"
              component="h1"
              className="text-red-500 text-xs italic"
            />
          </div>
          <div className=" w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              OpenGraph Url
            </label>
            <Field
              type="text"
              name="openGraphUrl"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" "
            />
            <ErrorMessage
              name="openGraphUrl"
              component="h1"
              className="text-red-500 text-xs italic"
            />
          </div>
          <div className=" w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              OpenGraph Description
            </label>
            <Field
              type="text"
              name="openGraphDescription"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" "
            />
            <ErrorMessage
              name="openGraphDescription"
              component="h1"
              className="text-red-500 text-xs italic"
            />
          </div>
        </div>
        <div className="flex justify-end ">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-main px-5 max-sm:px-2 p-2.5 bg-black text-white   mt-5"
          >
            Save
          </button>
        </div>
      </Form>
    )}
  </Formik>
  )
}
