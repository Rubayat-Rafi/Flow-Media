import { FaEdit } from "react-icons/fa";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCategory from "../../../hooks/useCategory";
import toast from "react-hot-toast";
import { useState } from "react";
import ChannelUpdate from "../../../components/Form/ChannelUpdate";
import EventUpdate from "../../../components/Form/EventUpdate";

const ChannelAndEvents = () => {
  const [categories, isLoading, refetch] = useCategory();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [eventModal, setEventModal] = useState(false);
  const [selectEvent, setSelecteEvent] = useState(null);

  if (isLoading) return <LoadingSpinner />;

  const handleDelete = (id) => {
    toast.custom((t) => (
      <div className="bg-white p-2 rounded shadow-lg flex flex-col md:flex-row items-center gap-3">
        <span className="text-[var(--background)]">
          Are you sure you want to delete?
        </span>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={async () => {
              toast.dismiss(t.id);
              await axiosSecure.delete(`/api/category/delete/${id}`);
              toast.success("Deleted successfully!");
              refetch();
            }}
          >
            Delete
          </button>
          <button
            className="bg-green-500 px-2 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };
  const channels = categories.filter(
    (channel) => channel.category === "Channel"
  );
  const events = categories.filter((event) => event.category !== "Channel");

  return (
    <div className="space-y-12">
      <h4 className="text-start uppercase font-semibold text-2xl mt-10">
        Channel and Events
      </h4>

      {/* channels  */}
      {channels && (
        <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-6">
          {channels?.map((channel) => (
            <div
              key={channel._id}
              className="bg-[var(--secondary)] p-6 rounded-lg  border border-[var(--text)]/20 overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4">
                <div className=" flex items-start gap-4">
                  {/* Channel Image */}
                  <div className="">
                    <div className="w-10 h-10  flex items-center justify-center overflow-hidden ">
                      <img
                        src={channel.channelLogo}
                        alt="Channel logo"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%23d97706' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>

                  {/* Channel Info */}
                  <div className="">
                    <h3 className="text-lg font-bold truncate">
                      {channel.channelName}
                    </h3>
                    <p className="text-sm  mb-1">
                      <span className="font-medium">{channel.category}</span>
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-blue-600 hover:text-blue-800">
                        {channel.channelURL.length > 25
                          ? channel.channelURL.slice(0, 25) + "..."
                          : channel.channelURL}
                      </p>
                      <button
                        className="text-xs text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          navigator.clipboard.writeText(`${channel.channelURL}`)
                        }
                        title="Copy link"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* buttons  */}
                <div className="flex gap-4">
                  {/* Delete Button */}
                  <button
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                    title="Delete channel"
                    onClick={() => handleDelete(channel?._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                  {/* update button  */}
                  <button
                    onClick={() => {
                      setSelectedChannel(channel);
                      setShowModal(true);
                    }}
                    className="hover:bg-green-50 p-1 rounded-full transition-colors duration-300 ease-in"
                  >
                    <FaEdit className="text-lg text-green-500 hover:text-green-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* channel update modal show */}
      {showModal && selectedChannel && (
        <ChannelUpdate
          refetch={refetch}
          channel={selectedChannel}
          closeModal={setShowModal}
        />
      )}

      {/* events  */}
      {events && (
        <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-6">
          {/* event cards */}
          {events.map((event) => (
            <div
              key={event?._id}
              className="bg-[var(--secondary)] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[var(--text)]/20"
            >
              {/* Card Header */}
              <div className="bg-[var(--primary)] px-4 py-2 flex justify-between items-center">
                <span className="text-white font-medium">
                  {event?.category} Match {event?.eventName && (`( ${event?.eventName} )`)}
                </span>

                <div className="flex items-center space-x-3">
                  {/* delete button  */}
                  <button
                    className="text-white hover:text-red-200 transition-colors"
                    onClick={() => handleDelete(event?._id)}
                    title="Delete event"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                  {/* update button  */}
                  <button
                    onClick={() => {
                      setEventModal(true), setSelecteEvent(event);
                    }}
                    className=" transition-colors duration-300 ease-in"
                  >
                    <FaEdit className="text-lg text-white hover:text-[var(--text)]" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                {/* Match Date & Time */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">{event?.matchDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">{event?.matchTime}</span>
                  </div>
                </div>

                {/* Teams */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 mb-2 overflow-hidden">
                      <img
                        src={event?.team1Image}
                        alt="Team A"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%23d97706' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <span className="font-medium text-center">
                      {event?.teamA}
                    </span>
                  </div>

                  <span className="text-xl font-bold mx-4">vs</span>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12  mb-2 overflow-hidden ">
                      <img
                        src={event?.team2Image}
                        alt="Team B"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%23d97706' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <span className="font-medium text-center">
                      {event?.teamB}
                    </span>
                  </div>
                </div>

                {/* Stream URL */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Stream URL:{" "}
                      {event?.matchUrl.length > 25
                        ? event?.matchUrl.slice(0, 25) + "..."
                        : event?.matchUrl}
                    </span>
                    <button
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                      onClick={() => {
                        navigator.clipboard.writeText(`${event.matchUrl}`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {eventModal && selectEvent && (
        <EventUpdate
          refetch={refetch}
          event={selectEvent}
          setEventModal={setEventModal}
        />
      )}
    </div>
  );
};

export default ChannelAndEvents;
