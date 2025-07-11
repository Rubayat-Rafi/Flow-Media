import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import toast from "react-hot-toast";

const AddPricing = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handlePricingForm = async (data) => {
    try {
      const result = await axiosSecure.post(`/api/add-pricing`, data);

      if (result?.data?.id) {
        toast.success("Pricing added successfully!");
        reset();
      }
    } catch (error) {
      toast.error(error);
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
                {...register("regularPrice")}
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                placeholder="e.g. $240"
              />
            </div>

            {/* Offer Price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="offerPrice">Offer Price</label>
              <input
                id="offerPrice"
                type="number"
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
            <div className="flex flex-col gap-2 md:col-span-2">
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
              className="bg-[var(--primary)] text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors duration-300 w-full cursor-pointer"
            >
              Add Pricing Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPricing;
