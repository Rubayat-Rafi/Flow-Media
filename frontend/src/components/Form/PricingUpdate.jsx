import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PricingUpdate = ({ setOpenModal, selectedPrice, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      passName: selectedPrice?.passName || "",
      days: selectedPrice?.days || "",
      device: selectedPrice?.device || "",
      value: selectedPrice?.value || "",
      regularPrice: selectedPrice?.regularPrice || "",
      offerPrice: selectedPrice?.offerPrice || "",
      discount: selectedPrice?.discount || "",
    },
  });

  const handleUpdatePricing = async (data) => {
    try {
      const res = await axiosSecure.patch(
        `/api/update/pricing/${selectedPrice._id}`,
        data
      );

      if (res.data.result?.modifiedCount > 0) {
        toast.success("Pricing updated successfully!");
        refetch();
        setOpenModal(false);
      } else {
        toast.info(res.data.message || "No changes made.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center h-screen px-4">
      <div className="bg-[var(--secondary)] rounded-lg p-8 shadow-lg max-w-3xl w-full relative">
        <button
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 bg-gray-100 transition-colors"
          onClick={() => setOpenModal(false)}
        >
          <IoClose className="text-red-500 hover:text-red-700 text-2xl" />
        </button>

        <h2 className="text-center text-xl font-bold mb-6 text-[var(--text)]">
          Update {selectedPrice?.passName} Event
        </h2>

        <div className="max-w-[800px] mx-auto bg-[var(--secondary)] p-6 rounded-md">
          <form onSubmit={handleSubmit(handleUpdatePricing)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pass Name (Dropdown) */}
              <div className="flex flex-col gap-2">
                <label htmlFor="passName">Pass Name</label>
                <select
                  id="passName"
                  {...register("passName", {
                    required: "Pass name is required",
                  })}
                  className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                >
                  <option value="">Select a pass type</option>
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
    </div>
  );
};

export default PricingUpdate;
