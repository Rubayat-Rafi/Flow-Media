import { NavLink } from "react-router";

const MenuItem = ({ address, label, icon: Icon  }) => {


  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-[var(--primary)] hover:text-[var(--background)]  ${
          isActive ? "bg-[var(--primary)] text-[var(--background)]" : ""
        }`
      }
    >
      {Icon && <Icon className="w-5 h-5" />}

      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
