import { useForm } from "react-hook-form";
import InputField from "../../../components/Shared/InputField";
import { Categories } from "../../../components/Categories/Categories";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const PostCategory = () => {
  const { register, handleSubmit, watch, resetField, reset } = useForm();
  const selectedCategory = watch("category");
  const axiosSecure = useAxiosSecure();

  const [isFree, setIsFree] = useState(false);

  const handlePostCategoryForm = async (data) => {
    try {
      // ✅ Conditionally add type field for Channel
      if (selectedCategory === "Channel") {
        data.type = isFree ? "free" : "paid";
      }

      // ✅ Format targetDate if it's an Event
      if (selectedCategory && selectedCategory !== "Channel") {
        if (data.matchDate && data.matchTime) {
          const localDate = new Date(`${data.matchDate}T${data.matchTime}:00`);

          const year = localDate.getFullYear();
          const month = String(localDate.getMonth() + 1).padStart(2, "0");
          const day = String(localDate.getDate()).padStart(2, "0");
          const hours = String(localDate.getHours()).padStart(2, "0");
          const minutes = String(localDate.getMinutes()).padStart(2, "0");
          const seconds = String(localDate.getSeconds()).padStart(2, "0");

          data.targetDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        }
      }

      const res = await axiosSecure.post("/api/category", data);
      if (res.status === 201) {
        reset();
        setIsFree(false); // ✅ reset checkbox
        toast.success("Post successfully");
      } else {
        toast.error("Failed to post category");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  // Reset fields on category switch
  useEffect(() => {
    if (selectedCategory === "Channel") {
      resetField("matchDate");
      resetField("teamA");
      resetField("teamB");
      resetField("matchTime");
      resetField("team1Image");
      resetField("team2Image");
      resetField("matchUrl");
    } else if (selectedCategory && selectedCategory !== "Channel") {
      resetField("channelName");
      resetField("channelLogo");
      resetField("channelURL");
      setIsFree(false);
    }
  }, [selectedCategory, resetField]);

  return (
    <div className="max-w-[1440px] mt-10">
      <h4 className="text-2xl font-bold text-center mb-8">
        Post Channel & Event
      </h4>
      <div className="max-w-[800px] mx-auto bg-[var(--secondary)] p-6 rounded-md">
        <form onSubmit={handleSubmit(handlePostCategoryForm)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                {...register("category")}
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
              >
                <option value="">Select a category</option>
                {Categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Conditional Fields */}
            {selectedCategory === "Channel" ? (
              <>
                <InputField
                  label="Channel Name"
                  name="channelName"
                  register={register}
                />
                <InputField
                  label="Channel Logo URL"
                  name="channelLogo"
                  register={register}
                />
                <InputField
                  label="Channel Stream URL"
                  name="channelURL"
                  register={register}
                />

                {/* ✅ Free Channel Checkbox */}
                <div className="md:col-span-2 flex items-center gap-3 mt-2">
                  <input
                    type="checkbox"
                    id="freeCheckbox"
                    checked={isFree}
                    onChange={(e) => setIsFree(e.target.checked)}
                  />
                  <label htmlFor="freeCheckbox" className="text-[var(--text)]">
                    Make this a free channel
                  </label>
                </div>
              </>
            ) : selectedCategory && selectedCategory !== "Channel" ? (
              <>
                <InputField
                  label="Match Date"
                  name="matchDate"
                  type="date"
                  register={register}
                />
                <div className="flex flex-col gap-2">
                  <label htmlFor="time">Match Time</label>
                  <input
                    type="time"
                    {...register("matchTime", { required: true })}
                    className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                  />
                </div>

                <InputField
                  label="Event Name"
                  name="eventName"
                  register={register}
                />
                <InputField label="Team A" name="teamA" register={register} />
                <InputField label="Team B" name="teamB" register={register} />
                <InputField
                  label="Team A Image URL"
                  name="team1Image"
                  register={register}
                />
                <InputField
                  label="Team B Image URL"
                  name="team2Image"
                  register={register}
                />
                <div className="md:col-span-2">
                  <InputField
                    label="Match Stream URL"
                    name="matchUrl"
                    register={register}
                  />
                </div>
              </>
            ) : (
              <div className="md:col-span-2 text-center py-4 text-gray-500">
                Please select a category to continue
              </div>
            )}
          </div>

          <button
            type="submit"
            className="signup-btn mt-6 text-[var(--background)]"
            disabled={!selectedCategory}
          >
            Save Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCategory;
