import { useForm } from "react-hook-form";
import {
  GiBaseballGlove,
  GiBoxingGloveSurprise,
  GiHockey,
} from "react-icons/gi";
import {
  IoBasketballSharp,
  IoCarSportSharp,
  IoFootball,
} from "react-icons/io5";
import {
  MdOutlineLiveTv,
  MdOutlineSportsMma,
  MdSportsCricket,
  MdSportsTennis,
} from "react-icons/md";
import { PiBoxingGloveBold } from "react-icons/pi";
import InputField from "../../../components/Shared/InputField";

const categories = [
  { name: "Channel", Icon: MdOutlineLiveTv },
  { name: "Football", Icon: IoFootball },
  { name: "Cricket", Icon: MdSportsCricket },
  { name: "Basketball", Icon: IoBasketballSharp },
  { name: "Tennis", Icon: MdSportsTennis },
  { name: "MMA", Icon: MdOutlineSportsMma },
  { name: "Boxing", Icon: PiBoxingGloveBold },
  { name: "Racing", Icon: IoCarSportSharp },
  { name: "Baseball", Icon: GiBaseballGlove },
  { name: "Wrestling", Icon: GiBoxingGloveSurprise },
  { name: "Hockey", Icon: GiHockey },
];

const PostCategory = () => {
  const { register, handleSubmit, watch } = useForm();
  const selectedCategory = watch("category"); // Changed to watch "category" instead of "Channel"

  const handlePostCategoryForm = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-[1440px] mt-10">
      <h4 className="text-2xl font-bold text-center mb-8">
        Post Channel & Event
      </h4>
      <div className="max-w-[800px] mx-auto bg-[var(--secondary)] p-6 rounded-md">
        <form onSubmit={handleSubmit(handlePostCategoryForm)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Field - now properly watched */}
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                {...register("category")}
                className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Fields */}
            {selectedCategory === "Channel" ? (
              // Channel Fields
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
              </>
            ) : selectedCategory && selectedCategory !== "Channel" ? (
              // Event Fields
              <>
                <InputField
                  label="Match Date"
                  name="matchDate"
                  type="date"
                  register={register}
                />
                <InputField
                  label="Teams Playing (e.g. Argentina vs Brazil)"
                  name="matchTeams"
                  register={register}
                />
                <InputField
                  label="Match Time"
                  name="matchTime"
                  type="time"
                  register={register}
                />
                <InputField
                  label="Team 1 Image URL"
                  name="team1Image"
                  register={register}
                />
                <InputField
                  label="Team 2 Image URL"
                  name="team2Image"
                  register={register}
                />
              </>
            ) : (
              // Default state when no category is selected
              <div className="md:col-span-2 text-center py-4 text-gray-500">
                Please select a category to continue
              </div>
            )}
          </div>
          {/* Submit Button */}
          <button 
            type="submit" 
            className="signup-btn mt-6"
            disabled={!selectedCategory} // Disable if no category selected
          >
            Save Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCategory;
