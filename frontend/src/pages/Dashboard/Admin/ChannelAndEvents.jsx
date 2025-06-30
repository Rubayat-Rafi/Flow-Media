const ChannelAndEvents = () => {
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <div>
      <h4 className="text-center text-2xl py-8">Channel and Events </h4>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* channels  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[var(--secondary)] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[var(--text)]/20 ">
            <div className="flex items-start gap-4">
              {/* Channel Image */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-yellow-300 flex items-center justify-center overflow-hidden border-2 border-yellow-400">
                  <img
                    src="/channel-placeholder.jpg"
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
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-yellow-800 truncate">
                  Channel Name
                </h3>
                <p className="text-sm text-yellow-700 mb-1">
                  Category:{" "}
                  <span className="font-medium">Channel Category</span>
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                    title="Channel Url"
                  >
                    youtube.com/channel/example
                  </a>
                  <button
                    className="text-xs text-gray-500 hover:text-gray-700"
                    onClick={() => navigator.clipboard.writeText("Channel Url")}
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

              {/* Delete Button */}
              <button
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                title="Delete channel"
                onClick={() =>
                  confirm("Are you sure you want to delete this channel?") &&
                  handleDelete()
                }
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
            </div>
          </div>
        </div>
        {/* events  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* event card */}
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default ChannelAndEvents;
