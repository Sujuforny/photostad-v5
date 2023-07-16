
import Image from 'next/image'
import React from 'react'
export default function Custom() {
    return (
        <main className='flex  items-center justify-evenly p-24'>
            <div className='flex space-y-10'>
                <div>
                <Image width={250} height={200} alt='logo' src='/assets/image/mainlogo-blackv2.png' className='w-[200px] mb-96'></Image>
                </div>
               <div>
               <h2 className='font-black mt-[-60px] text-red-500'> 404 .<span className='font-light text-black'> That is an error.</span></h2>
                <p className='font-medium mt-3'>The requestad URL / Doesntaxist was not found on this server. <br /><span className='font-light'>That is all we know .</span> <a href='/' ><button type="button" class="text-red-400  hover:text-red-500 ">back home page</button></a> </p>
               </div>
            </div>
            <div>
                <Image width={400} height={300} alt='404 image' src="/assets/image/404Error.gif" className='w-[400px]' />
            </div>
        </main>
    )
}