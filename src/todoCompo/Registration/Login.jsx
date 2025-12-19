import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function DoLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "userid",
    "useremail",
  ]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (user) => {
      axios
        .get(`http://localhost:3000/users?email=${user.email}`)
        .then((response) => {
          if (response.data.length > 0) {
            const userObj = response.data[0];
            if (userObj.password === user.password) {
              setCookie("userid", userObj.id);
              setCookie("useremail", userObj.email);
              navigate("/home");
            } else {
              alert("Invalid credentials. Please try again.");
            }
          } else {
            alert("Invalid credentials. Please try again.");
          }
        })
        .catch((err) => {
          console.error("Login failed:", err);
          alert("An error occurred during login. Please try again later.");
        });
    },
  });

  return (
    <div>
      <main className="flex min-h-full items-center justify-center py-6 px-4 transition-colors">
        <div className="w-full mt-6 max-w-4xl bg-white dark:bg-[#1A2233] shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <div className="text-center mb-8">
                <h5 className="font-bold text-2xl dark:text-white">
                  Welcome Back!
                </h5>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                  Log in to access your account.
                </p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <i className="fa-regular fa-envelope absolute left-3 top-3.5 text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      placeholder="alex@example.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg h-12 px-4 pl-10 focus:outline-none focus:ring-2 ring-blue-500"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium dark:text-gray-300">
                      Password
                    </label>
                    <a className="text-sm text-blue-500 hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <div className="relative">
                    <i className="fa-solid fa-lock absolute left-3 top-3.5 text-gray-400" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg h-12 px-4 pl-10 focus:outline-none focus:ring-2 ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400"
                    >
                      <i className={showPassword ? "fa-eye-slash" : "fa-eye"} />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                  Log In
                </button>
              </form>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-500 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* RIGHT – IMAGE */}
            <div className="hidden md:block md:w-1/2 bg-gray-50 dark:bg-[#0F1419]">
              <img
                src="/images/log.jpg"
                alt="login"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
