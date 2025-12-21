import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepIndicator from "./StepIndicator";
import StepContent from "./StepContent";

const validationSchema = [
  //step -1
  Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    profileImage: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "File size is too large (max 2MB)",
        (file) => !file || file.size <= 2 * 1024 * 1024
      ),
  }),
  //step-2
  Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address")
      .test("email-exists", "Email already registered", async (value) => {
        if (!value) return true;
        try {
          const res = await axios.get(
            `https://todo-api-bkdr.onrender.com/users?email=${value}`
          );
          return res.data.length === 0;
        } catch (error) {
          return true;
        }
      }),
    phone: Yup.string()
      .test("is-valid-phone", "Invalid Indian phone number", (value) => {
        if (!value) return true;
        return /^[6-9]\d{9}$/.test(value);
      })
      .test("mob exist", "Phone number already registered", async (value) => {
        if (!value) return true;
        try {
          const res = await axios.get(
            `https://todo-api-bkdr.onrender.com/users?phone=${value}`
          );
          return res.data.length === 0;
        } catch (error) {
          return true;
        }
      }),
  }),
  //step- 3
  Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  }),
  //step - 4
  Yup.object({
    terms: Yup.boolean().oneOf([true], "You must accept terms & conditions"),
  }),
];

export default function DoRegistration() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Account", "Contact", "Security", "Review"];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
      profileImage: null,
    },
    validationSchema: validationSchema[currentStep - 1],
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      if (currentStep < steps.length) {
        setCurrentStep((prev) => prev + 1);
      } else {
        let imageUrl = "";
        if (values.profileImage) {
          imageUrl = await ConvertUrl(values.profileImage);
        }
        const { confirmPassword, terms, profileImage, ...rest } = values;
        const dataToSave = { ...rest, profileImage: imageUrl };
        axios
          .post("https://todo-api-bkdr.onrender.com/users", dataToSave)
          .then(() => navigate("/login"))
          .catch(function (error) {
            console.error("Error registering user:", error);
          });
      }
    },
  });

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  function handleImageChange(e) {
    if (!e.target.files[0]) return;
    formik.setFieldValue("profileImage", e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  function ConvertUrl(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "TodoImage");

    return axios
      .post("https://api.cloudinary.com/v1_1/dgqvkksup/image/upload", formData)
      .then((res) => res.data.secure_url);
  }

  return (
    <div>
      <main className="flex flex-col min-h-full items-center py-6 px-4 transition-colors">
        <div className="w-full max-w-4xl mt-6 bg-white dark:bg-[#1A2233]  shadow-xl  overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-50 dark:bg-[#0F1419]">
              <img
                src="/images/regis.jpg"
                alt="register"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:w-1/2 p-6 flex flex-col">
              <StepIndicator steps={steps} currentStep={currentStep} />

              <div className="flex-1 overflow-y-auto mb-4">
                <StepContent
                  currentStep={currentStep}
                  steps={steps}
                  formik={formik}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  imagePreview={imagePreview}
                  handleImageChange={handleImageChange}
                />
              </div>

              <div className="flex gap-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 border rounded-lg py-3 dark:text-white"
                  >
                    Back
                  </button>
                )}

                <button
                  type="submit"
                  onClick={formik.handleSubmit}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold"
                >
                  {currentStep === steps.length ? "Finish" : "Next Step"}
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-4 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
