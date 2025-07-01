export const convertMatchTimeByTimeZone = (timeString, timeZone) => {
  if (!timeString || !timeZone) return "";
  const offsetMatch = timeZone.match(/GMT([+-]?\d+)/);
  const offset = offsetMatch ? parseInt(offsetMatch[1], 10) : 0;
  let [hours, minutes] = timeString.split(":").map(Number);
  hours -= 12;
  if (hours < 0) {
    hours += 24;
  }
  const utcDate = new Date(Date.UTC(1970, 0, 1, hours, minutes));
  const shiftedDate = new Date(utcDate.getTime() + offset * 60 * 60 * 1000);
  return shiftedDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
};
