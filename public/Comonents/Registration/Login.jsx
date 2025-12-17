import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userid", "useremail"]);
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
              navigate("/");
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
      <main className="flex-1 flex flex-col items-center justify-center  py-12 transition-colors px-4">
        <div className="w-full max-w-lg bg-white dark:bg-[#1A2233] rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700">
          <div className="p-8">
            <div className="text-center mb-8">
              <h5 className="font-bold text-2xl dark:text-white">
                Welcome Back!
              </h5>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Log in to access your account.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 dark:text-gray-300"
                >
                  Email Address
                </label>
                <div className="relative">
                  <i className="fa-regular fa-envelope absolute left-3 top-3.5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="alex@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full ml-1 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg h-12 px-4 pl-10 focus:outline-none focus:ring-2 ring-blue-500 transition-all placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium dark:text-gray-300"
                  >
                    Password
                  </label>
                  <a href="#" className="text-sm text-blue-500 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-3 top-3.5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full ml-1 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg h-12 px-4 pl-10 focus:outline-none focus:ring-2 ring-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <i
                      className={
                        showPassword
                          ? "fa-solid fa-eye-slash"
                          : "fa-solid fa-eye"
                      }
                    />
                  </button>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2"
              >
                Log In
                <i className="fa-solid fa-arrow-right" />
              </button>
            </form>
          </div>
          <p className="text-sm dark:text-gray-400 text-center pb-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
