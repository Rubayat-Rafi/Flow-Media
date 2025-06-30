import { TbPaywall } from "react-icons/tb";
import MenuItem from "./MenuItem";

const UserMenu = () => {
    return (
        <>
            <MenuItem icon={TbPaywall} label="Subscription" address="/dashboard/subscription" />
            <MenuItem icon={TbPaywall} label="Add Device" address="/dashboard/add-device" />
        </>
    );
};

export default UserMenu;