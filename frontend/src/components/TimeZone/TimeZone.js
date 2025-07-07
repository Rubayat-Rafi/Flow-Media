export const UpdateTime = (timeZone) => {
  const offsetMatch = timeZone?.match(/GMT([+-]?\d+)/);
  const offset = offsetMatch ? parseInt(offsetMatch[1], 10) : 0;
  const utc = new Date(
    new Date().getTime() + new Date().getTimezoneOffset() * 60000
  );
  const timezoneDate = new Date(utc.getTime() + offset * 3600000);
  return timezoneDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
