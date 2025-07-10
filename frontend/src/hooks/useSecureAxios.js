// hooks/useSecureAxios.js
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const useSecureAxios = () => {
  const [secureAxios, setSecureAxios] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user)
        const token = await user.getIdToken();

        const instance = axios.create({
          baseURL: import.meta.env.VITE_FLOW_MRDIA_API, // 🔁 or your base URL
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSecureAxios(instance);
      }
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return secureAxios;
};

export default useSecureAxios;
