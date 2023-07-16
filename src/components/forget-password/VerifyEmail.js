"use client"
import { selectIsFromForgetPw, setEmail, setIsFormForgetPw } from '@/store/features/anonymous/anonymousSlice';
import { useVerifyForgotPasswordMutation } from '@/store/features/auth/authApiSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

export default function VerifyEmail() {
  const [verifyForgotPassword, { isLoading }] = useVerifyForgotPasswordMutation();
  const [email, setEmails] = useState('');
  const [isAnimating, setIsAnimating] = useState(false); // State for animation
  const dispatch = useDispatch();
  const router = useRouter()
  const handleInputChange = (event) => {
    setEmails(event.target.value);
  };

  const handleSubmit = async () => {
    dispatch(setEmail(email));
    try {
      dispatch(setIsFormForgetPw(true));
      setIsAnimating(true); // Start animation
      const { data } = await verifyForgotPassword(email).unwrap();
      console.log(data, "verifyEmail");
      router.push("/otp-verification")
    } catch (err) {
        toast.error(err?.data?.errors, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      console.log("error verifyEmail",err);
    } finally {
      setIsAnimating(false); // Stop animation
    }
  };
  return (
    <div className='flex items-center justify-center h-screen  '>
      <div className='w-96 shadow-md mx-auto dark:bg-secondary rounded-main p-5'>
        <h1 className='dark:text-white font-bold text-2xl pb-3'>Tell us your Email</h1>
        <hr className='pb-2' />
        <p className='dark:text-white mb-3'>Please enter your email to confirm your account.</p>
        <div className='mb-5'>
          <label
            htmlFor='default-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Email
          </label>
          <input
            type='text'
            id='default-input'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>
      

        <button
          type='button'
          className={`text-white rounded-main bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium px-10 text-sm py-2.5 text-center mr-2 mb-2 ${
            isAnimating ? 'animate-pulse' : ''
          }`}
          onClick={handleSubmit}
          disabled={isLoading || isAnimating} // Disable the button when isLoading or isAnimating is true
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
      <ToastContainer
        position="top-center"
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