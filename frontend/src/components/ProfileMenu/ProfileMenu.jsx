const ProfileMenu = ({ user, signOutUser }) => {
  const links = [
    { name: "Profile", href: "#" },
    { name: "Dadhboard", href: "/dashboard" },
  ];

  return (
    <aside className="bg-[var(--secondary)] shadow-lg rounded-md h-full p-5 space-y-2">
      {/* User Profile */}
      <div className=" bg-[var(--background)] p-4 rounded-md">
        <h1 className="uppercase">{user.displayName}</h1>
        <p>{user.email}</p>
      </div>
      {/* profile option */}
      <div className="flex flex-col space-y-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={`w-full py-2 px-4 font-medium bg-[var(--background)] rounded-md hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors duration-300 ease-in-out `}
          >
            {link.name}
          </a>
        ))}
      </div>
      <div>
        <button
          onClick={signOutUser}
          className="w-full text-center bg-red-500 hover:bg-red-600 transition-colors duration-300 ease-linear font-medium py-2 rounded-md cursor-pointer "
        >
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default ProfileMenu;
