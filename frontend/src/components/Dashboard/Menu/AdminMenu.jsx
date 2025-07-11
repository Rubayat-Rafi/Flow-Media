import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { BsGraphUp } from "react-icons/bs";
import { MdOutlinePostAdd  } from "react-icons/md";
import { MdPriceChange } from "react-icons/md"
import { SiOpenaccess } from "react-icons/si";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" />
      <MenuItem icon={FaUserCog} label="Manage Users" address="/dashboard/manage-users" />
      <MenuItem icon={MdOutlinePostAdd } label="Post Category" address="/dashboard/post-category" />
      <MenuItem icon={MdOutlinePostAdd } label="Manage Category" address="/dashboard/all-category" />
      <MenuItem icon={MdPriceChange } label="Manage Pricing" address="/dashboard/pricing" />
      <MenuItem icon={MdPriceChange } label="Pricing" address="/dashboard/add-pricing" />
      {/* <MenuItem icon={MdPriceChange } label="Mange Affiliate" address="/dashboard/manage_affiliate" /> */}
      <MenuItem icon={SiOpenaccess } label="Subscription" address="/dashboard/give-subscription" />
    </>
  );
};

export default AdminMenu;
