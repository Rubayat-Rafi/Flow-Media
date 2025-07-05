export const GetParams = (categoryData, categorys, defaultUrl) => {
  if (!categoryData || !categorys?.length) return defaultUrl;
  const firstSpaceIndex = categoryData.indexOf(" ");
  const categ = categoryData.substring(0, firstSpaceIndex);
  const eventName = categoryData.substring(firstSpaceIndex + 1);
  const filterData1 = categorys.find(
    (item) => item?.category === categ && item?.channelName === eventName
  );
  const filterData2 = categorys.find(
    (item) =>
      item?.category === categ &&
      item?._id === eventName &&
      item?.countdown == false
  );
  return {
    channel_url: filterData1?.channelURL,
    match_url: filterData2?.matchUrl,
    defaultUrl,
  };
};
export const GetCategory = (categoryData) => {
  if (!categoryData) return null;
  const splitData = categoryData?.split(" ");
  if (splitData.length === 1) {
    return { categ: splitData[0] };
  } else {
    const firstSpaceIndex = categoryData.indexOf(" ");
    const categ = categoryData.substring(0, firstSpaceIndex);
    const eventName = categoryData.substring(firstSpaceIndex + 1);
    return { categ, eventName };
  }
};
