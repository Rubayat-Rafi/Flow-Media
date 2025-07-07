export const convertMatchTimeByTimeZone = (timeString, timeZone) => {
  if (!timeString || !timeZone) return "";
  const offsetMatch = timeZone.match(/GMT([+-]?\d+)/);
  const offset = offsetMatch ? parseInt(offsetMatch[1], 10) : 0;
  let [hours, minutes] = timeString.split(":").map(Number);
  const validHour = hours > 12 ? hours - 12 : hours;
  const utcDate = new Date(Date.UTC(1970, 0, 1, validHour, minutes));
  const shiftedDate = new Date(utcDate.getTime() + offset * 60 * 60 * 1000);
  return shiftedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
