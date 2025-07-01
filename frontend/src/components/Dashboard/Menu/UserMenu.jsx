import { TbPaywall } from "react-icons/tb";
import MenuItem from "./MenuItem";
import useDBUser from "../../../hooks/dbUser";

const UserMenu = () => {
  const [dbUser, roleLoading] = useDBUser();
  if (roleLoading) {
    return (
      <div className="text-center text-sm text-gray-500 py-4">
        Loading menu...
      </div>
    );
  }
  return (
    <>
      <MenuItem
        icon={TbPaywall}
        label="Subscription"
        address="/dashboard/subscription"
      />

      {dbUser?.subscription && (
        <>
          <MenuItem
            icon={TbPaywall}
            label="Add Device"
            address="/dashboard/add-device"
          />
          <MenuItem
            icon={TbPaywall}
            label="Remove Device"
            address="/dashboard/remove-device"
          />
        </>
      )}
    </>
  );
};

export default UserMenu;
