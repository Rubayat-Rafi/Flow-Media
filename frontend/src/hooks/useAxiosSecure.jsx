import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_FLOW_MRDIA_API,
    withCredentials: true,
})

const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
         const interceptor = axiosSecure.interceptors.response.use(
            res => res,
            async (error) => {
                if(error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // await signOutUser();
                    // navigate('/login');
                }
                return Promise.reject(error);
            }
        ) 
        
            return () => {
                axiosSecure.interceptors.response.eject(interceptor);
            }

    }, [signOutUser, navigate]);


    return axiosSecure;
};

export default useAxiosSecure;