import { useForm } from "react-hook-form";
import usePricing from "../../../hooks/usePricing";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const GiveSubscription = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [pricing, isLoading] = usePricing();

  if (isLoading) return <LoadingSpinner />;

  // Extract unique pass names
  const passNames = pricing
    ? [...new Set(pricing.map((item) => item.passName))]
    : [];

  console.log(passNames);

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-2xl mx-auto w-11/12">
      <h1 className="text-2xl font-bold uppercase my-10 text-center">
        Manage User Subscriptions
      </h1>

      <div className="bg-[var(--secondary)] rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pass Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="passName">Pass Name</label>
              <select
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <option>Loading pricing options...</option>
                ) : (
                  <>
                    <option value="">Select a pass</option>
                    {passNames.map((name, index) => (
                      <option key={index} value={name}>
                        {name}
                      </option>
                    ))}
                  </>
                )}
              </select>
              {errors.passName && (
                <span className="text-red-500 text-sm">
                  {errors.passName.message}
                </span>
              )}
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-2">
              <label htmlFor="days">Duration (days)</label>
              <input
                id="days"
                type="number"
                {...register("days", {
                  required: "Duration is required",
                  min: { value: 1, message: "Must be at least 1 day" },
                })}
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="Enter days"
              />
              {errors.days && (
                <span className="text-red-500 text-sm">
                  {errors.days.message}
                </span>
              )}
            </div>

            {/* Regular Price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="regularPrice">Regular Price (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-3">$</span>
                <input
                  id="regularPrice"
                  type="number"
                  step="0.01"
                  {...register("regularPrice")}
                  className="w-full py-3 pl-8 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="userEmail">User Email</label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                  placeholder="Enter user email"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--primary)] text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiveSubscription;
