import { BASE_URL } from "@/lib/baseUrl";
import { fetchRoles, selectAllRoles } from "@/store/features/role/roleSlice";
import { useCreateUserMutation } from "@/store/features/user/userApiSlice";

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
    ),
  role: Yup.string().required("Role is required"),
  givenName: Yup.string().required("Given Name is required"),
  familyName: Yup.string().required("Family Name is required"),
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

const FormCreateNew = ({closeModal}) => {
  const [imageName, setImageName] = useState(null);
  const [imageId, setImageId] = useState();
  const dispatch = useDispatch();

  const roles = useSelector(selectAllRoles);
  const [createUser, { isLoading, isSuccess }] = useCreateUserMutation();

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  const uploadImage = async (values) => {
    try {
      const response = await axios.post(`${BASE_URL}/files`, values.file);

      if (response.status === 200) {
        const responeData = await response.data.data;
        const name = responeData.name;
        setImageName(name);

        //check if image is uploaded send it server with anothe url
        if (responeData.name) {
          await handleInsertImgToServer(name);
        }
        return (
          response.data.location ||
          "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
        );
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // insert image to server
  const handleInsertImgToServer = async (image) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
      name: image,
      type: "user",
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const respone = await fetch(
        `${BASE_URL}/images`,
        requestOptions
      );
      const responeData = await respone.json();
      console.log(responeData.data?.id, "responeData");
      return responeData.data?.id;
    } catch (error) {
      console.log("error : " + error);
    }
  };
  const submitHandler = async (values, imgId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      familyName: values.familyName,
      givenName: values.givenName,
      username: values.username,
      email: values.email,
      password: values.password,
      avatar: imgId ? imgId : 4,
      roleIds: [values.role],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      await createUser(raw).unwrap(); // unwrap() is use to get data from createuser
      
    } catch (error) {
      console.log(error, "error");
    }
  };


  if (isSuccess) {
    closeModal()
  
    
    
  }

  return (
    <>
       <ToastContainer />
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          role: [],
          givenName: "",
          familyName: "",
          avatar: imageId ? imageId : 4,
          file: undefined,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values, "values");
          const formData = new FormData();
          formData.append("file", values.file);
          const avartar = await uploadImage({ file: formData });
          values.avatar = avartar;

          setTimeout(async () => {
            const imgId = await handleInsertImgToServer(imageName);
            console.log(imgId, "imgId");
            await submitHandler(values, imgId)
            console.log("values : ", values);
            resetForm();
            toast.success("Create user success",{
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
        
            });
          }, 500);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="h-full">
            <div className="grid gap-x-10 gap-6 mb-3 md:grid-cols-2 w-full ">
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
                  id="givenName"
                  name="givenName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                />
                <ErrorMessage
                  name="givenName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {/* Last name */}
              <div className="mb-3">
                <label
                  htmlFor="familyName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <Field
                  type="text"
                  id="familyName"
                  name="familyName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                />
                <ErrorMessage
                  name="familyName"
                  component="div"
                  className="text-red-500"
                />
              </div>
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
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {/* phone number */}
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* address */}
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-main border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your address..."
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <Field
                  as="select"
                  id="role"
                  name="role"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-main border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {/* <option value="red">amin</option>
  
                  <option value="green">guest</option>
  
                  <option value="blue">subscrpber</option> */}
                  {roles.map((r, i) => (
                    <option key={i} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className=" mb-6 w-full ">
                <label htmlFor="file" className="mb-3">
                  Avatar
                </label>
                <Field
                  type="file"
                  name="file"
                  id="file"
                  setFieldValue={setFieldValue}
                  component={CustomInput}
                  className="file-input h-[45px] border-gray-300  rounded-main w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
    </>
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
    
          <div className="w-24 rounded-main mt-5">
            <img className="rounded-main" src={preview} alt="dummy" width="100" height="100" />
          </div>

      )}
    </div>
  );
}
export default FormCreateNew;
