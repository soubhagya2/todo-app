
const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="w-full mb-4 relative flex items-center justify-between">
      <div className="absolute w-full h-1 bg-gray-300 rounded-full" />
      <div
        className="absolute h-1 bg-blue-500 rounded-full transition-all"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((step, index) => (
        <div key={step.name} className="z-10 text-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full font-bold border-4 ${
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
      ))}
    </div>
  );
};

export default StepIndicator;
