import ImageUpload from "./ImageUpload";
import ReviewDetails from "./ReviewDetails";

const FormField = ({label, type, placeholder, value, onChange, onBlur, iconClass, error, touched,}) => (
 <div className="relative">
    <label className="block text-sm font-medium mb-1 dark:text-gray-300">
      {label}
    </label>

    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full h-12 px-4 pl-10 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white
        ${error && touched ? "border border-red-500" : ""}
      `}
    />

    <i className={`${iconClass} absolute left-3 top-10 text-gray-400`} />

  
    <p className="text-red-500 text-sm min-h-5 leading-5 ">
      {error && touched ? error : ""}
    </p>
  </div>
);

const StepContent = ({
  currentStep,
  steps,
  formik,
  showPassword,
  setShowPassword,
  imagePreview,
  handleImageChange,
}) => {
  const step = steps[currentStep - 1];

  if (step === "Review") {
    return (
      <ReviewDetails
        formData={formik.values}
        onTermsChange={(checked) => formik.setFieldValue("terms", checked)}
        formik={formik}
      />
    );
  } else if (step === "Account") {
    return (
      <div className="space-y-2">
        <h5 className="font-bold text-xl dark:text-white">Account Details</h5>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
          Please provide your name and a profile picture.
        </p>

        <ImageUpload
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
        />

        <FormField
          label="Full Name"
          type="text"
          placeholder="Enter full name"
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          iconClass="fa-solid fa-user"
          error={formik.errors.name}
          touched={formik.touched.name}
        />
      </div>
    );
  } else if (step === "Contact") {
    return (
      <div className="space-y-2">
        <h5 className="font-bold text-xl dark:text-white">
          Contact Information
        </h5>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
          We'll use this for recovery & updates.
        </p>

       <div  >
         <FormField
          label="Email"
          type="email"
          placeholder="example@email.com"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={(e) => {
            formik.handleBlur("email")(e);
          }}
          iconClass="fa-solid fa-envelope"
          error={formik.errors.email}
          touched={formik.touched.email}
        />
       
        <FormField
          label="Phone Number"
          type="text"
          placeholder="Optional"
          value={formik.values.phone}
          onChange={formik.handleChange("phone")}
          onBlur={formik.handleBlur("phone")}
          iconClass="fa-solid fa-phone"
          error={formik.errors.phone}
          touched={formik.touched.phone}
        />
       </div>
      </div>
    );
  } else if (step === "Security") {
    return (
      <div className="space-y-2">
        <h5 className="font-bold text-xl dark:text-white">Password Setup</h5>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
          Choose a strong password for your account.
        </p>

        <div className="relative ">
          <FormField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            iconClass="fa-solid fa-lock"
            error={formik.errors.password}
            touched={formik.touched.password}
          />
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

        <FormField
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange("confirmPassword")}
          onBlur={formik.handleBlur("confirmPassword")}
          iconClass="fa-solid fa-lock"
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
        />
      </div>
    );
  }

  return null;
};

export default StepContent;

