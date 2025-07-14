import axios from "axios";
export const saveUser = async (user) => {


  console.time(user)
  await axios.post(`${import.meta.env.VITE_FLOW_MRDIA_API}/api/user/signup`, {
    name: user.name,
    email: user.email,
    uid: user.uid,
  });
};
