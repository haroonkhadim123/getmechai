"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Loader from "../component/Loader";


const Username = () => {
  const { data: session } = useSession();
  const [form, setForm] = useState({ name: "", message: "", amount: "" });
  const [errors, setErrors] = useState({ name: "", message: "", amount: "" });
  const [data, setData] = useState([]);
  const [loader, setloader] = useState(false)

  const fetchData = async () => {
    try {
      const res = await fetch("/api/pay");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error as user types
    setErrors({ ...errors, [name]: "" });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = { name: "", message: "", amount: "" };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!form.amount || Number(form.amount) < 1) {
      newErrors.amount = "Amount must be at least 1";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ name: "", message: "", amount: "" });

    if (!validateForm()) return;

    try {
      setloader(true)
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        setForm({ name: "", message: "", amount: "" });
        fetchData();
      } else {
        toast.error(result.message);
        setloader(false)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    finally{
      setloader(false)
    }
  };

  return (
    <>
      {/* Cover Image */}
      <div className="w-full h-[44vh] relative">
        <img
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3Ijo5NjAsIndlIjoxfQ%3D%3D/18.gif?token-hash=Y6Nn-PMIQx5f_lPhK3RiGHcCBynf7Y1WJOJ_tUUiR9g%3D&token-time=1764806400"
          alt="cover"
          className="w-full h-[44vh] object-cover"
        />
        {/* Profile Image */}
        <div className="absolute -bottom-20 right-[33%] md:right-[45%] border-white overflow-hidden border-2 rounded-full w-32 h-32">
          <img
            src="https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?q=80&w=808&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="pb-10 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
        <div className="text-white font-bold text-2xl text-center mt-28">
          {session?.user?.name || "Guest User"}
        </div>
        <p className="text-slate-400 text-center">
          {session?.user?.email || "Guest User"}
        </p>
      </div>

      <div className="pb-20">
        <div className="md:w-[75%] w-[90%] mx-auto bg-slate-900 p-3 mt-5 flex flex-col-reverse md:flex-row gap-5">
          {/* Supporters */}
          <div className="w-full md:w-1/2 p-5">
            <h2 className="font-bold text-3xl my-5 text-white">Supporters</h2>
            <ul className="pl-5 mt-3 text-slate-300 gap-2 scrollbar-hidden list-disc h-[200px] overflow-y-auto">
              {data.length === 0 ? (
                <li className="list-none">No supporters yet.</li>
              ) : (
                data.map((item) => (
                  <li
                    className="list-none flex items-center gap-1"
                    key={item.id || item._id}
                  >
                    <img width={50} height={50} src="/avatar.gif" alt="" />
                    {item.name} donated ₹{item.amount}
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Payment Form */}
          <div className="w-full md:w-1/2 p-5">
            <h2 className="font-bold text-3xl my-5 text-white">Make Payment</h2>
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3">
              <div className="flex flex-col">
                <input
                  onChange={handleChange}
                  name="name"
                  value={form.name}
                  className="w-full bg-slate-800 rounded-lg p-3"
                  type="text"
                  placeholder="Enter Name"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1">{errors.name}</span>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  onChange={handleChange}
                  name="message"
                  value={form.message}
                  className="w-full bg-slate-800 rounded-lg p-3"
                  type="text"
                  placeholder="Enter Message"
                />
                {errors.message && (
                  <span className="text-red-500 text-sm mt-1">{errors.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  onChange={handleChange}
                  name="amount"
                  value={form.amount}
                  className="w-full bg-slate-800 rounded-lg p-3"
                  type="number"
                  placeholder="Enter Amount"
                />
                {errors.amount && (
                  <span className="text-red-500 text-sm mt-1">{errors.amount}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={loader}
                className="p-3 w-full flex items-center justify-center  text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-slate-600"
              >
                {loader ? <Loader /> : "Pay Now"}
              </button>
            </form>

            <div className="flex flex-row gap-3 mt-4">
              <button
                className="p-3 bg-slate-800 rounded-2xl"
                onClick={() => setForm({ ...form, amount: 10 })}
              >
                Pay ₹10
              </button>
              <button
                className="p-3 bg-slate-800 rounded-2xl"
                onClick={() => setForm({ ...form, amount: 20 })}
              >
                Pay ₹20
              </button>
              <button
                className="p-3 bg-slate-800 rounded-2xl"
                onClick={() => setForm({ ...form, amount: 30 })}
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Username;
