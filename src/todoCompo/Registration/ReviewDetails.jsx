
const ReviewDetails = ({ formData, onTermsChange, formik }) => {
  return (
    <div className="space-y-4">
      <h5 className="font-bold text-xl dark:text-white">Review Details</h5>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Confirm the details before submitting.
      </p>

      <div className="p-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg space-y-3">
        {["name", "email", "phone"].map((field) => (
          <div className="flex justify-between" key={field}>
            <span className="font-medium text-gray-500 dark:text-gray-400">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </span>
            <span className="font-semibold dark:text-gray-400">
              {formData[field] || "Not provided"}
            </span>
          </div>
        ))}
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <input
          type="checkbox"
          className="rounded"
          checked={formData.terms}
          onChange={(e) => onTermsChange(e.target.checked)}
        />
        I agree to Terms and Conditions.
      </label>
      {formik.errors.terms && formik.touched.terms && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.terms}</p>
      )}
    </div>
  );
};

export default ReviewDetails;
