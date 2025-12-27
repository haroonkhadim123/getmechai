"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import Link from 'next/link';
import toast from 'react-hot-toast';
import Loader from '../component/Loader';


const SignupPage = () => {
  const router = useRouter();
  const [form, setform] = useState({ name: '', email: '', password: '' })
    const [erroremail, seterroremail] = useState("")
  const [errorpassword, seterrorpassword] = useState("")
  const [errorname, seterrorname] = useState("")
  const [loader, setloader] = useState(false)

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }


  const handlesubmit = async (e) => {
    e.preventDefault();
     seterroremail("")
    seterrorpassword("")
    seterrorname("")
     const regex = /^[A-Za-z\s]+$/;

    if (!regex.test(form.name)) {
      seterrorname("Please enter a valid name (letter only)")
      
      return
    }

    if (form.name?.length < 3) {
      seterrorname("Name must be at least 3 characters long.");
    
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(form.email)) {
      seterroremail("Please enter a valid email address.");
    
      return
    }
    if (form.password.length < 6) {
      seterrorpassword("password must be at least 6 characters long.");
    
      return
    }
     // prevent page refresh
    if(!form.name || !form.email || !form.password){
      toast.error("filled are required")
      return
    }

    try {
      setloader(true)
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        router.push('/login');
        setform({ name: '', email: '', password: '' }); // reset form
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error("Signup error", error)
      toast.error("Internal server error");
    }
    finally{
      setloader(false)
    }
  }

  return (
    <div>
      <div className='text-center font-bold text-2xl md:text-3xl pt-10 text-white'>Welcome to SignUp page</div>
      <div className='md:w-[500px] w-[90%]  mt-5 p-2 mx-auto flex flex-col'>
        <form className='flex flex-col gap-2' onSubmit={handlesubmit}>
          <div className='w-full flex flex-col gap-1'>
            <label className='px-2 text-lg font-bold' htmlFor="name">Name</label>
            <input className='w-full p-3 bg-slate-700 rounded-lg' type="text" name='name' value={form.name} onChange={handlechange} placeholder='Enter Username' />
            {errorname && <p className='text-red-500 px-2'>{errorname}</p>}
          </div>
          <div className='w-full flex flex-col gap-1'>
            <label className='px-2 text-lg font-bold' htmlFor="email">Email</label>
            <input className='w-full  p-3 bg-slate-700 rounded-lg' type="email" name='email' value={form.email} onChange={handlechange} placeholder='Enter Email' />
            {erroremail && <p className='text-red-500 px-2'>{erroremail}</p>}
          </div>
          <div className='w-full flex flex-col gap-1'>
            <label className='px-2 text-lg font-bold' htmlFor="password">Password</label>
            <input className='w-full p-3 bg-slate-700 rounded-lg' type="password" name='password' value={form.password} onChange={handlechange} placeholder='Enter Password' />
            {errorpassword && <p className='text-red-500 px-2'>{errorpassword}</p>}
          </div>

         <button
  disabled={loader}
  type="submit"
  className="mt-2 w-full flex items-center justify-center p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm"
>
  {loader ? <Loader /> : "Sign Up"}
</button>


          <p>Already have an account? <span className='text-blue-500'><Link href={'/login'}>Login</Link></span></p>
        </form>
      </div>
    </div>
  )
}

export default SignupPage;
