"use client" // MUST be first line
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "../component/Loader";


const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
   const [erroremail, seterroremail] = useState("")
  const [errorpassword, seterrorpassword] = useState("")
  const [loader, setloader] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
       seterroremail("");
    seterrorpassword("");
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(form.email)) {
      seterroremail("Please enter a valid email address.");
      return
    }
    if(form.password.length<6){
      seterrorpassword("password must be at least 6 characters long.");
      return
    }
    setloader(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.error) {
      toast.error(res.error);
      setloader(false)
      return;
    }

    if (res?.ok) {
      toast.success("Login successful");
      router.push("/username");
    }
    setloader(false);
  };

  return (
    <div className="  flex flex-col items-center justify-center">
      <h1 className="text-center font-bold text-2xl md:text-3xl pt-10 text-white">Welcome to Login page</h1>
      <div className="md:w-[500px] w-[90%] mt-5 p-4 mx-auto flex flex-col  rounded-lg shadow-lg">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="px-2 text-lg font-bold text-white">Email</label>
            <input
              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="email"
              autoComplete="new-email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {erroremail && <p className='text-red-500 px-2'>{erroremail}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="px-2 text-lg font-bold text-white">Password</label>
            <input
              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
            {errorpassword && <p className='text-red-500 px-2'>{errorpassword}</p>}
          </div>
        <button
  disabled={loader}
  type="submit"
  className="mt-2 w-full flex items-center justify-center p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm"
>
  {loader ? <Loader /> : "Login"}
</button>

        <p className="text-white text-center mt-2">
  Don&apos;t have an account? <Link href="/signup" className="text-blue-500">Sign up</Link>
</p>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
