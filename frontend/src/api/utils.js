<<<<<<< HEAD

=======
import axios from "axios";

export const saveUser = async (user) => {
  await axios.post(
    `${import.meta.env.VITE_FLOW_MRDIA_API}/users/${user?.email}`,
    {
      name: user?.displayName || user?.name,
      email: user?.email,
    }
  );
};
>>>>>>> 25cd817d1ce1cd11a1d1010d151a2b85c59c24f6
