'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/features/auth/authSlice';

import { ToastContainer, toast } from 'react-toastify';
import { CiCircleChevLeft } from 'react-icons/ci';
import SideSettingNav from '@/components/profile/SideSettingNav';
import { useUpdateInformationClientMutation } from '@/store/features/user/userApiSlice';

export default function Page() {
  const {data:user} = useSelector(selectCurrentUser)
  const [updateInformationClient ,{isLoading}] = useUpdateInformationClientMutation()
  const uuid = user?.uuid
  console.log(user,"user in information");
  const handleSubmit =async (values, { setSubmitting }) => {
    try{
      const {data:updateInfor} = await updateInformationClient ({uuid,data:values});
      console.log(updateInfor);
      toast.success(updateInfor.message? updateInfor.message : "successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }catch(e){
      toast.error('field to save !', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    // Simulating form submission
    setTimeout(() => {
      console.log(values); // You can handle form submission here
      setSubmitting(false);
    }, 500);
  };

  // const validationSchema = Yup.object().shape({
  //   phoneNumber: Yup.string().required('Phone Number is required').matches(/^\d{10}$/, 'Phone Number must be 10 digits'),
  //   dob: Yup.string().required('Date of Birth is required'),
  //   address: Yup.string().required('Address is required'),
  // });
  const initialValues= {
    phoneNumber: user?.phoneNumber,
    dob: user?.dob,
    address: user?.address 
  }
  return (
    <div className='w-[90%] mx-auto rounded-[16px] dark:bg-slate-800 bg-white p-5'>
          {/* drawer */}
      <div className="md:hidden">
        <input type="checkbox" id="drawer-left" className="drawer-toggle" />
        <label htmlFor="drawer-left" >
        <h1 className="font-semibold dark:text-white text-[32px]  ">
        <CiCircleChevLeft className="inline"/> General Setting
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
      <h1 className='font-semibold max-sm:hidden text-[32px] dark:text-white'>More Information</h1>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form>
          <div class='my-6'>
            <label for='phoneNumber' class='block mb-2 text-sm font-light dark:text-white'>
              Phone Number
            </label>
            <Field
              type='text'
              id='phoneNumber'
              name='phoneNumber'
              class='shadow-sm bg-[whitesmoke] md:w-1/2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
            />
            <ErrorMessage name='phoneNumber' component='div' className='text-red-500' />
          </div>
          <div class='mb-6'>
            <label for='dob' class='block mb-2 text-sm font-light text-gray-900 dark:text-white'>
              Date of Birth
            </label>
            <Field
              type='date'
              id='dob'
              name='dob'
              class='shadow-sm bg-[whitesmoke] md:w-1/2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
            />
            <ErrorMessage name='dob' component='div' className='text-red-500' />
          </div>
          <label for='address' class='block mb-2 text-sm font-light text-gray-900 dark:text-white'>
            Address
          </label>
          <Field
            as='textarea'
            id='address'
            name='address'
            className='bg-[whitesmoke] h-[150px]  w-full md:w-1/2 rounded-[16px] dark:bg-slate-500'
          />
          <ErrorMessage name='address' component='div' className='text-red-500' />
          <br />
          <button type='submit' className='btn-util mt-6 text-white'>
            Save Change
          </button>
        </Form>
      </Formik>
      <ToastContainer
        position="top-center"
        autoClose={5000}
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