import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useAuth } from "../../hooks/useAuth";
import useUserData from "../../hooks/useUserData";

const Affiliate = () => {
  const { user } = useAuth();
  const [userData] = useUserData();
  const secureAxios = useSecureAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      data.userId = userData?._id;
      data.email = userData?.email;
      const res = await secureAxios.post("/api/affiliate/apply_form", data);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        // reset();
      } else {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-pink-500 to-yellow-500 p-4 text-center rounded-md shadow">
          <h1 className="text-xl font-semibold text-black">
            Apply to become an Affiliate.
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Info */}
          <div className="bg-[#1f1f2e] rounded-md p-6 shadow-md border border-blue-400">
            <h2 className="text-lg font-bold text-blue-300 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={user.displayName} disabled className="input" />
              <input value={user.email} disabled className="input" />
              <input
                {...register("phone", { required: true })}
                placeholder="+880"
                className="input"
              />
              <select
                {...register("country", { required: true })}
                className="input"
              >
                <option value="">Select country</option>
                <option>Bangladesh</option>
                <option>India</option>
              </select>
              <input
                {...register("state")}
                placeholder="Your state"
                className="input"
              />
              <input
                {...register("city", { required: true })}
                placeholder="Your city"
                className="input"
              />
              <input
                {...register("zip")}
                placeholder="ZIP Code"
                className="input"
              />
              <textarea
                {...register("address", { required: true })}
                placeholder="Your address"
                className="input md:col-span-2"
                rows="2"
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-[#1f1f2e] rounded-md p-6 shadow-md border border-blue-400">
            <h2 className="text-lg font-bold text-blue-300 mb-4">
              Additional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                {...register("paymentMethod", { required: true })}
                className="input"
              >
                <option value="">Select payment method</option>
                <option>PayPal</option>
                <option>Bank Transfer</option>
              </select>
              <input
                {...register("website", { required: true })}
                placeholder="Website URL"
                className="input"
              />
              <input
                {...register("skype")}
                placeholder="Skype ID"
                className="input"
              />
              <input
                {...register("telegram", { required: true })}
                placeholder="Telegram ID"
                className="input"
              />
              <select
                {...register("referralSource", { required: true })}
                className="input"
              >
                <option>A user</option>
                <option>Google</option>
                <option>Facebook</option>
              </select>
              <textarea
                {...register("promotionMethod", { required: true })}
                placeholder="How will you promote?"
                className="input md:col-span-2"
                rows="3"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-800 hover:bg-red-600 px-6 py-2 rounded text-white flex items-center gap-2"
            >
              <FaSignOutAlt /> SIGN OUT
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white"
            >
              {isSubmitting ? "Submitting..." : "✅ APPLY"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Affiliate;
