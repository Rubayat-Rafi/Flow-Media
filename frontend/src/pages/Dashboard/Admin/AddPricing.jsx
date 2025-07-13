import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddPricing = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const passName = watch("passName");

  // Auto-set days and device based on passName
  useEffect(() => {
    if (passName === "weekly") {
      setValue("days", 7);
      setValue("device", 1);
    } else if (passName === "monthly") {
      setValue("days", 30);
      setValue("device", 1);
    } else if (passName === "yearly") {
      setValue("days", 365);
      setValue("device", 2);
    } else if (passName === "custom") {
      setValue("days", "");
      setValue("device", 1);
    }
  }, [passName, setValue]);

  const handlePricingForm = async (data) => {
    setLoading(true);
    try {
      const result = await axiosSecure.post(`/api/add-pricing`, data);
      if (result?.data?.id) {
        toast.success("Pricing added successfully!");
        reset();
      }
    } catch (error) {
      toast.error(error.message || "Failed to add pricing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1440px] mt-10">
      <h4 className="text-2xl font-bold text-center mb-8 uppercase">
        ADD Pricing
      </h4>

      <div className="max-w-[800px] mx-auto bg-[var(--secondary)] p-6 rounded-md">
        <form onSubmit={handleSubmit(handlePricingForm)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pass Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="passName">Pass Name</label>
              <input
                id="passName"
                type="text"
                {...register("passName", { required: "Pass name is required" })}
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="e.g. Annual Pass"
              />
              {errors.passName && (
                <span className="text-red-500 text-sm">
                  {errors.passName.message}
                </span>
              )}
            </div>
            {/* Pass Name (Dropdown) */}
            <div className="flex flex-col gap-2">
              <label htmlFor="plan">Plan</label>
              <select
                id="plan"
                {...register("plan", { required: "Pass name is required" })}
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
              >
                <option value="">Select a plan</option>
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="custom">Custom</option>
              </select>
              {errors.passName && (
                <span className="text-red-500 text-sm">
                  {errors.passName.message}
                </span>
              )}
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-2">
              <label htmlFor="days">Duration</label>
              <input
                id="days"
                type="number"
                {...register("days", { required: "Duration is required" })}
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="e.g. 365 days"
              />
              {errors.days && (
                <span className="text-red-500 text-sm">
                  {errors.days.message}
                </span>
              )}
            </div>

            {/* Device Limit */}
            <div className="flex flex-col gap-2">
              <label htmlFor="device">Device Limit</label>
              <input
                id="device"
                type="number"
                {...register("device", {
                  required: "Device limit is required",
                })}
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="e.g. 2 Devices"
              />
              {errors.device && (
                <span className="text-red-500 text-sm">
                  {errors.device.message}
                </span>
              )}
            </div>

            {/* Tagline */}
            <div className="flex flex-col gap-2">
              <label htmlFor="value">Tagline (Optional)</label>
              <input
                id="value"
                type="text"
                {...register("value")}
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="e.g. Best value"
              />
            </div>

            {/* Regular Price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="regularPrice">Regular Price (Optional)</label>
              <input
                id="regularPrice"
                type="number"
                step="0.01"
                {...register("regularPrice")}
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="e.g. 240.00"
              />
            </div>

            {/* Offer Price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="offerPrice">Offer Price</label>
              <input
                id="offerPrice"
                type="number"
                step="0.01"
                {...register("offerPrice", {
                  required: "Offer price is required",
                })}
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="e.g. 99.99"
              />
              {errors.offerPrice && (
                <span className="text-red-500 text-sm">
                  {errors.offerPrice.message}
                </span>
              )}
            </div>
            {/* Discount */}
            <div className="flex flex-col gap-2 ">
              <label htmlFor="discount">Discount (Optional)</label>
              <input
                id="discount"
                type="text"
                {...register("discount")}
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="e.g. 50% offer"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-[var(--primary)] text-white py-2 px-6 rounded-md transition-colors duration-300 w-full cursor-pointer flex items-center justify-center ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-opacity-90"
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : null}
              {loading ? "Adding..." : "Add Pricing Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPricing;
