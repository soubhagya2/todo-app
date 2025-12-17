import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepIndicator from "./StepIndicator";
import StepContent from "./StepContent";

const validationSchema = [
  Yup.object().shape({
    name: Yup.string().required("Name is required"),
  }),
  Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number is not valid"),
  }),
  Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  }),
  Yup.object().shape({
    terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  }),
];


export default function DoRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const steps = [{ name: "Account" }, { name: "Contact" }, { name: "Security" },  { name: "Review" }, ];

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
    onSubmit: (values) => {
      if (currentStep < steps.length) {
        setCurrentStep((prev) => prev + 1);
      } else {
        axios
          .post("http://localhost:3000/users", values)
          .then(function (response) {})
          .catch(function (error) {
            console.error("Error registering user:", error);
          });
        navigate("/login");
      }
    },
  });

  function handleValueCheck(e, field) {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const valueExists = response.data.find(
          (user) => user[field] === e.target.value
        );
        if (valueExists) {
          setMsg(`${field} is already registered.`);
        } else {
          setMsg("user available");
        }
      })
      .catch((err) => console.error("Validation failed:", err));
  }

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

  return (
    <div>
      <main className="flex flex-col min-h-full items-center py-6 px-4 transition-colors">
        <div className="w-full max-w-4xl mt-6 bg-white dark:bg-[#1A2233]  shadow-xl  overflow-hidden">
          <div className="flex min-h-[500px]">
            <div className="w-1/2 flex items-center justify-center bg-gray-50 dark:bg-[#0F1419]">
              <img src="/images/regis.jpg" alt="register" className="w-full h-full object-cover"/>
            </div>

            <div className="w-1/2 p-6 flex flex-col">
              <StepIndicator steps={steps} currentStep={currentStep} />

              <div className="flex-1 overflow-y-auto mb-4">
                <StepContent
                  currentStep={currentStep}
                  steps={steps}
                  formik={formik}
                  handleValueCheck={handleValueCheck}
                  msg={msg}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  imagePreview={imagePreview}
                  handleImageChange={handleImageChange}
                />
              </div>

              <div className="flex gap-4">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="flex-1 border rounded-lg py-3 dark:text-white"
                  >
                    Back
                  </button>
                )}

                <button
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
