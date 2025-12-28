const steps = ["Search", "Select", "Seats", "Payment", "Confirm"];

export default function BookingStepper({ currentStep }) {
  return (
    <div className="flex justify-between items-center mb-6">
      {steps.map((step, index) => {
        const isActive = index <= currentStep;

        return (
          <div key={step} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <p
              className={`mt-1 text-xs ${
                isActive ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {step}
            </p>
            {index < steps.length - 1 && (
              <div className="w-full h-0.5 bg-gray-300 mt-2"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
