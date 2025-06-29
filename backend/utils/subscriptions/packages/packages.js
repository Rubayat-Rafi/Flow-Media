exports.Package = async({plan}) => {
  const now = new Date();
  if (plan === "weekly") now.setDate(now.getDate() + 7);
  if (plan === "monthly") now.setMonth(now.getMonth() + 1);
  if (plan === "yearly") now.setFullYear(now.getFullYear() + 1);
  return now;
};
