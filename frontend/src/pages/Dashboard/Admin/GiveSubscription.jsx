import { useForm } from "react-hook-form";
import usePricing from "../../../hooks/usePricing";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";

const GiveSubscription = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  const [pricing, isLoading] = usePricing();
  const [selectedPass, setSelectedPass] = useState("");
  const [prefilledValues, setPrefilledValues] = useState({
    days: "",
    regularPrice: "",
  });

  if (isLoading) return <LoadingSpinner />;

  const passNames = pricing
    ? [...new Set(pricing.map((item) => item.passName))]
    : [];

  const packageNames = ["Caustom", ...passNames];

  const onSubmit = async (data) => {
    try {
      const subscription = {
        pack: selectedPass,
        caustomDate:
          selectedPass === "Caustom"
            ? data.days
            : prefilledValues.days || data.days,
        queryEmail: data.email,
        formData: {
          ...data,
          days:
            selectedPass === "Caustom"
              ? data.days
              : prefilledValues.days || data.days,
          amount:
            selectedPass === "Caustom"
              ? Number(data.regularPrice)
              : Number(prefilledValues.regularPrice || data.regularPrice),
        },
        amount:
          selectedPass === "Caustom"
            ? data.regularPrice
            : prefilledValues.regularPrice,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_FLOW_MRDIA_API}/api/payment/payments`,
        subscription
      );

      if (response?.data?.success) {
        toast.success("Subscription successfully added!");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Submission error:", error.message);
    }
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
                id="passName"
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                {...register("passName", {
                  required: "Pass name is required",
                })}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedPass(value);
                  if (value !== "Caustom") {
                    const matched = pricing.find(
                      (item) => item.passName === value
                    );
                    if (matched) {
                      setPrefilledValues({
                        days: matched.days || "",
                        regularPrice: matched.regularPrice || "",
                      });
                      setValue("days", matched.days || "");
                      setValue("regularPrice", matched.regularPrice || "");
                    }
                  } else {
                    setPrefilledValues({ days: "", regularPrice: "" });
                    setValue("days", "");
                    setValue("regularPrice", "");
                  }
                }}
              >
                <option value="">Select a pass</option>
                {packageNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
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
                value={prefilledValues.days}
                onChange={(e) =>
                  setPrefilledValues((prev) => ({
                    ...prev,
                    days: e.target.value,
                  }))
                }
                disabled={selectedPass !== "Caustom"}
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
                  value={prefilledValues.regularPrice}
                  onChange={(e) =>
                    setPrefilledValues((prev) => ({
                      ...prev,
                      regularPrice: e.target.value,
                    }))
                  }
                  disabled={selectedPass !== "Caustom"}
                  className="w-full py-3 pl-8 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="userEmail">User Email</label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="Enter user email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
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
