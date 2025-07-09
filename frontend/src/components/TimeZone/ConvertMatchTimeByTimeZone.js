const gmtOffsetToTimeZone = {
  "GMT-10": "Pacific/Honolulu", // Hawaii
  "GMT-9": "America/Anchorage", // Alaska
  "GMT-8": "America/Los_Angeles", // Pacific Time (US)
  "GMT-7": "America/Denver", // Mountain Time (US)
  "GMT-6": "America/Chicago", // Central Time (US)
  "GMT-5": "America/New_York", // Eastern Time (US)
  "GMT-4": "America/Halifax", // Atlantic Time (Canada)
  "GMT-3": "America/Argentina/Buenos_Aires", // Argentina
  "GMT-2": "America/Noronha", // Brazil
  "GMT+0": "UTC", // Universal Time
  "GMT+1": "Europe/Berlin", // Central European Time
  "GMT+2": "Europe/Kiev", // Eastern European Time
  "GMT+3": "Europe/Moscow", // Moscow Time
  "GMT+4": "Asia/Dubai", // UAE
  "GMT+5": "Asia/Karachi", // Pakistan
  "GMT+6": "Asia/Dhaka", // Bangladesh
  "GMT+7": "Asia/Bangkok", // Thailand
  "GMT+8": "Asia/Shanghai", // China
  "GMT+9": "Asia/Tokyo", // Japan
  "GMT+10": "Australia/Sydney", // Australia
  "GMT+11": "Pacific/Noumea", // New Caledonia
  "GMT+12": "Pacific/Auckland", // New Zealand
};

export const convertMatchTimeByTimeZone = (rawDateString, gmtOffset) => {
  const timeZone = gmtOffsetToTimeZone[gmtOffset];
  if (!timeZone) return "Invalid Time Zone";
  const [isoString] = rawDateString.split(" GMT");
  const date = new Date(isoString);
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone,
  });

  return `${time}`;
};

export const convertMatchDateZone = (rawDateString, gmtOffset) => {
  const timeZone = gmtOffsetToTimeZone[gmtOffset];
  if (!timeZone) return "Invalid Time Zone";

  // Extract the ISO part of the rawDateString (before " GMT")
  const [isoString] = rawDateString.split(" GMT");

  // Convert the ISO string to a Date object (interpreted as local time)
  const date = new Date(isoString);

  // Format the date in the target time zone
  const options = {
    weekday: "short", // e.g., 'Mon', 'Tue'
    year: "numeric", // e.g., '2025'
    month: "short", // e.g., 'Jul'
    day: "numeric", // e.g., '11'
    timeZone,
  };

  // Convert the date to the formatted string in the target time zone
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};
