import axios from "axios";

export const saveUser = async (user) => {
  await axios.post(
    `${import.meta.env.VITE_FLOW_MRDIA_API}/users/${user?.email}`,
    {
      name: user?.displayName || user?.name,
      image: user?.photoURL,
      email: user?.email,
    }
  );
};
