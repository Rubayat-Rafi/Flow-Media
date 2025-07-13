exports.Package = async ({ plan, caustomDate }) => {
  const now = new Date();
  if (plan === "weekly") {
    now.setDate(now.getDate() + 7);
  } else if (plan === "monthly") {
    now.setMonth(now.getMonth() + 1);
  } else if (plan === "yearly") {
    now.setFullYear(now.getFullYear() + 1);
  } else if (plan !== "weekly" || plan !== "monthly" || plan !== "yearly") {
    const days = parseInt(caustomDate);
    if (!isNaN(days) && days > 0) {
      now.setDate(now.getDate() + days);
    } else {
      throw new Error("Invalid caustomDate value");
    }
  }

  return now;
};
