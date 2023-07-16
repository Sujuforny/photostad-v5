'use client'

import { selectCurrentUserData } from "@/store/features/auth/authSlice";
import { useAddRequestTutorialsMutation } from "@/store/features/requestTutorial/requestTutorialApiSlice";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
//import toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormREQ() {
    // data user
    const [userUUID , setUserUUID] = useState("")
    const dataUsers = useSelector(selectCurrentUserData)
	const router = useRouter()
    const [submitting, setSubmitting] = useState(false);
	const [addRequestTutorials, {isLoading,isError,isSuccess}] = useAddRequestTutorialsMutation();
    const handleSubmit = async (e) => {
        if(!dataUsers){
            router.push("/login")
            toast.warn('You need to login!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            
            return;
        }
        await e.preventDefault();
        const email = e.target.email.value;
        const description = e.target.description.value;
        try{
    	const {data} =await addRequestTutorials({ userUUID, description}).unwrap();
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
        } catch (error) {
            console.log("hello nyny",error);
            if (error.data.code === 404) {
                console.log("dg ey te");
                toast.warn('send to request false!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
              }
        }
 
    }
 
    // if (isLoading){
    //     console.log("loading")
    // return (
    //   <div className="flex min-h-screen w-1/2  items-center justify-center p-24">
    //     Loading...
    //   </div>
    // );
    // }

    useEffect(() => {
        if (dataUsers) {
          setUserUUID(dataUsers.uuid);
          console.log("UUID", userUUID);
        }
      }, [dataUsers]);
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                   Subject
                </label>
                <input
                    type="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[16px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="photostad"
                    required
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Message
                </label>
                <textarea
                    id="description"
                    required
                    className="shadow-sm rounded-[16px] w-full  h-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
            </div>
            <div className="w-full flex justify-end   ">
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-red-500 p-2.5 w-full md:w-fit text-white rounded-main px-7"
                >
                    Send
                </button>
            </div>
        </form>
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
        </>
    )
}