"use client";
import { useCreateTutorialMutation } from "@/store/features/tutorial/tutorialApiSlice";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  file: Yup.mixed()
    .test("fileSize", " File bigger than 5mb", (value) => {
      if (!value) {
        return true;
      }
      return value.size <= FILE_SIZE;
    })
    .test("filsFormat", "Unsupported format", (value) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .required("required"),
});

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/webp",
];

const FormAddNew = () => {
  const [imgId, setImgId] = useState(0);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [editorData, setEditorData] = useState(" Hello Photostad "); //ckeditor data
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [createTutorial, { isLoading: submitting }] =
    useCreateTutorialMutation();

  const editorRef = useRef();
  const { CKEditor, DecoupledEditor } = editorRef.current || {};
  const handleEditorChange = (data) => {
    setEditorData(data);
  };
  console.log(editorData, "editor data use state");
  useEffect(() => {

    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      DecoupledEditor: require("@ckeditor/ckeditor5-build-decoupled-document")
      ,
    };
 
  }, []);
//  set editor load only one time
useEffect(()=>{
  setEditorLoaded(true)
},[editorRef])

  if (submitting) {
    toast.success(" Totorial create successfully", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const uploadImageHandler = async (values) => {
    try {
      const response = await axios.post(`${BASE_URL}/files`, values.file);
      console.log(response.data, "respone when upload image");

      return (
        response.data?.data?.name ||
        "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const insertImgToDB = async (img) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
      name: img,
      type: "user",
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const respone = await fetch(`${BASE_URL}/images`, requestOptions);
      const responeData = await respone.json();
      const imgId = responeData.data.id;
      setImgId(imgId);
      console.log(requestOptions.data, "upload imgae respone");
      return responeData.data.id || 4;
    } catch (error) {
      console.log("error : " + error);
    }
  };

  const handleSubmit = async (values) => {
    // const cleanHtmlContent = values.htmlContent.replace(/\\/g, '');
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
      name: values.name,
      description: values.description,
      thumbnail: values.thumbnail,
      createdBy: "20",
      htmlContent: values.htmlContent,
    });
    try {
      await createTutorial(raw).unwrap();
    
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div className="bg-white dark:bg-secondary w-10/12 mx-auto">
      <h1 className="text-center text-black dark:text-white text-3xl font-semibold">
        Create New Tutorial
      </h1>
      <ToastContainer />
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: "",
          description: "",
          thumbnail: "",
          createdBy: "20",
          htmlContent: editorData.replace('\\"', "'"),
          file: undefined,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append("file", values.file);

          const avatar = await uploadImageHandler({ file: formData });
          const imageid = await insertImgToDB(avatar);

          values.thumbnail = imageid;
          console.log(values,'////////// values /////');

          setTimeout(() => {
            handleSubmit(values);
            setSubmitting(false);
            resetForm();
          }, 2000);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-5">
              <div className=" w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <Field
                  type="text"
                  name="name"
                  value={values.name}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                />
                <ErrorMessage
                  name="name"
                  component="h1"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* file for avarta */}
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Thumbnail
                </label>
                <Field
                  className="file-input rounded-main w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="file"
                  type="file"
                  title="Select a file"
                  setFieldValue={setFieldValue} // Set Formik value
                  component={CustomInput} // component prop used to render the custom input
                  isSubmitting={isSubmitting}
                />
                <ErrorMessage
                  name="file"
                  component="h1"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* email */}
              <div className="md:mb-5 mb-2 md:col-span-2 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <Field
                  type="text"
                  name="description"
                  component="textarea"
                  rows="4"
                  value={values.description}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-main border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="description"
                />
                <ErrorMessage
                  name="description"
                  component="h1"
                  className="text-red-500 text-xs italic"
                />
              </div>
            </div>
            {/* ckeditor  */}
            <div>
              {editorLoaded ? (
                <CKEditor
                  data={editorData}
                  editor={DecoupledEditor}
                  config={{
                   

                    ckfinder: {
                      // Upload the images to the server using the CKFinder QuickUpload command
                      // You have to change this address to your server that has the ckfinder php connector
                      uploadUrl: " https://photostad-api.istad.co/api/v1/files", //Enter your upload url
                    },
                  }}
                  //create upload adapter to send image to server in Ckeditor
                  onReady={(editor) => {
                    editor.ui
                      .getEditableElement()
                      .parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                      );

                    editor.plugins.get("FileRepository").createUploadAdapter = (
                      loader
                    ) => {
                      return new MyUploadAdapter(loader);
                    };
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
           

                 
                    console.log({ event, editor, data},'editor data');
              
                    setEditorData(data.replace(/"/g, "'"));
                    handleEditorChange(data);
                  }}
                  onError={(error, { willEditorRestart }) => {
                    // If the editor is restarted, the toolbar element will be created once again.
                    // The onReady callback will be called again and the new toolbar will be added.
                    // This is why you need to remove the older toolbar.
                    if (willEditorRestart) {
                      this.editor.ui.view.toolbar.element.remove();
                    }
                  }}
                />
              ) : (
                <div>Editor loading</div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-main px-5 max-sm:px-2 p-2.5 bg-black text-white   mt-5"
            >
              {isSubmitting ? "posting..." : "Post now"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

function CustomInput({ field, form, isSubmitting, ...props }) {
  const [preview, setPreview] = useState(null);
  // for reset imageds
  useEffect(() => {
    if (isSubmitting) {
      setPreview(null);
    }
  }, [isSubmitting]);
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          form.setFieldValue(field.name, event.currentTarget.files[0]);
          setPreview(URL.createObjectURL(event.currentTarget.files[0]));
        }}
        // {...props} is use to pass all props from Formik Field component
        {...props}
      />
      {preview && (
        <div className="w-24 rounded-[16px] mt-5">
          <Image src={preview} alt="dummy" width="100" height="100" />
        </div>
      )}
    </div>
  );
}

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          // Your upload logic here
          // Example using fetch:
          const formData = new FormData();
          formData.append("file", file);

          fetch("https://photostad-api.istad.co/api/v1/files", {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              if (response.ok) {
                response.json().then((data) => {
                  console.log(data, "data upload image");
                  const url = data?.data?.url;
                 
                  resolve({ default: url });
                });
              } else {
                reject(response.statusText);
              }
              console.log(response, "response upload image");
            })
            .catch((error) => {
              reject(error);
              console.log(error, "error upload image");
            });
        })
    );
  }

  abort() {
    // Abort upload logic here
  }
}

export default FormAddNew;
