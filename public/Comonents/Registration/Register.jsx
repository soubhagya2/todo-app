import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
    profileImage: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const steps = [
    { name: "Account" },
    { name: "Contact" },
    { name: "Security" },
    { name: "Review" },
  ];

  function updateField(key, value) {
    setFormData(function (prev) {
      return { ...prev, [key]: value };
    });
  }

  function handleNext() {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      axios
        .post("http://localhost:3000/users", formData)
        .then(function (response) {})
        .catch(function (error) {
          console.error("Error registering user:", error);
        });
      navigate("/login");
    }
  }
function handleValueCheck(e, field) { 
  axios.get("http://localhost:3000/users")
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

    updateField("profileImage", e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  function renderStepContent() {
    const step = steps[currentStep - 1];

    if (step.name === "Review") {
      return (
        <div className="space-y-4">
          <h5 className="font-bold text-xl dark:text-white">Review Details</h5>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Confirm the details before submitting.
          </p>

          <div className="p-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg space-y-3">
            <div className="flex justify-center -m-1">
              <img
                src={imagePreview}
                alt="Profile"
                className="size-24 rounded-full object-cover border-4 shadow-md"
              />
            </div>

            {["name", "email", "phone"].map(function (field) {
              return (
                <div className="flex justify-between" key={field}>
                  <span className="font-medium text-gray-500 dark:text-gray-400">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </span>
                  <span className="font-semibold dark:text-gray-400">
                    {formData[field] || "Not provided"}
                  </span>
                </div>
              );
            })}
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              className="rounded"
              checked={formData.terms}
              onChange={function (e) {
                updateField("terms", e.target.checked);
              }}
            />
            I agree to Terms and Conditions.
          </label>
        </div>
      );
    } else if (step.name === "Account") {
      return (
        <div className="space-y-6">
          <h5 className="font-bold text-xl dark:text-white">Account Details</h5>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Please provide your name and a profile picture.
          </p>

          <div className="flex items-center gap-4">
            <div className="relative size-20 rounded-full bg-gray-300 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <i className="fa-solid fa-user text-3xl text-gray-500" />
              )}
            </div>
            <label className="cursor-pointer bg-gray-200 dark:text-gray-300 dark:bg-gray-800 px-4 py-2 rounded-lg">
              Upload Image
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg h-12 px-4 pl-10 dark:placeholder-gray-400"
            />
            <i className="fa-solid fa-user absolute left-3 top-10 text-gray-400" />
          </div>
        </div>
      );
    } else if (step.name === "Contact") {
      return (
        <div className="space-y-6">
          <h5 className="font-bold text-xl dark:text-white">
            Contact Information
          </h5>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            We'll use this for recovery & updates.
          </p>

          <div className="relative">
            <label className="text-sm dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              onBlur={(e) => handleValueCheck(e, "email")}
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full dark:text-white bg-gray-100 placeholder:text-gray-400 dark:bg-gray-800 rounded-lg h-12 px-4 pl-10"
            />
            <i className="fa-solid fa-envelope absolute left-3 top-10 text-gray-400" />
          </div>
          <p className={`text-red-500 text-sm ${msg ? "visible" : "invisible"}`}>
            {msg || ""}
          </p>
                    

          <div className="relative">
            <label className="text-sm dark:text-gray-300">Phone Number</label>
            <input
              type="text"
              placeholder="Optional"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full dark:text-white bg-gray-100 placeholder:text-gray-400 dark:bg-gray-800 rounded-lg h-12 px-4 pl-10"
            />
            <i className="fa-solid fa-phone absolute left-3 top-10 text-gray-400" />
          </div>
        </div>
      );
    } else if (step.name === "Security") {
      return (
        <div className="space-y-6">
          <h5 className="font-bold text-xl dark:text-white">Password Setup</h5>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Choose a strong password for your account.
          </p>
          <div className="relative ">
            <label className="text-sm dark:text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              className="w-full  bg-gray-100 dark:text-white dark:bg-gray-800 rounded-lg h-12 px-4 pl-10"
            />
            <i className="fa-solid fa-lock absolute left-3 top-10 text-gray-400" />
            <button
              type="button"
              className="absolute right-3 top-9"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={
                  showPassword
                    ? "fa-solid fa-eye-slash text-gray-400"
                    : "fa-solid fa-eye dark:text-gray-400"
                }
              />
            </button>
          </div>
          <div className="relative dark:text-gray-300">
            <label className="text-sm dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              className="w-full dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg h-12 px-4 pl-10"
            />
            <i className="fa-solid fa-lock absolute left-3 top-10 text-gray-400" />
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <main className="flex flex-col items-center py-6 px-4 transition-colors">
        <div className="w-full max-w-2xl mb-10 relative flex items-center justify-between">
          <div className="absolute w-full h-1 bg-gray-300 rounded-full" />
          <div className="absolute h-1 bg-blue-500 rounded-full transition-all" />

          {steps.map(function (step, index) {
            return (
              <div key={step.name} className="z-10 text-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold border-4
                ${
                  index + 1 < currentStep
                    ? "bg-blue-500 text-white border-blue-500"
                    : index + 1 === currentStep
                    ? "bg-white text-blue-500 border-blue-500"
                    : "bg-gray-300 text-gray-500 border-gray-300"
                }`}
                >
                  {index + 1 < currentStep ? (
                    <i className="fa-solid fa-check" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${
                    index + 1 <= currentStep ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="w-full max-w-lg bg-white dark:bg-[#1A2233] rounded-2xl shadow-xl border p-8">
          <div className="h-[350px] overflow-y-auto">{renderStepContent()}</div>

          <div className="flex gap-4 pt-6">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 border rounded-lg py-3 dark:text-white"
              >
                Back
              </button>
            )}

            <button
              onClick={handleNext}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold"
            >
              {currentStep === steps.length ? "Finish" : "Next Step"}
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Log in
          </Link>
        </p>
      </main>
    </div>
  );
}
