import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { BsGraphUp } from "react-icons/bs";
import { MdOutlinePostAdd  } from "react-icons/md";
import { MdPriceChange } from "react-icons/md"

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" />
      <MenuItem icon={FaUserCog} label="Manage Users" address="/dashboard/manage-users" />
      <MenuItem icon={MdOutlinePostAdd } label="Post Category" address="/dashboard/post-category" />
      <MenuItem icon={MdOutlinePostAdd } label="All Category" address="/dashboard/all-category" />
      <MenuItem icon={MdPriceChange } label="Add Pricing" address="/dashboard/add-pricing" />
    </>
  );
};

export default AdminMenu;
