import { AuthContext } from "@/providers/AuthProvider";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosScure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosScure = () => {
  const { signOutUser } = useContext(AuthContext);
  const navigation = useNavigate();

  useEffect(() => {
    axiosScure.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          signOutUser()
            .then(() => {
              navigation("/log-in");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    );
  });
  return axiosScure;
};

export default useAxiosScure;

// const axiosScure = useAxiosScure();

// axiosScure.get('/user')
//   .then(res => console.log(res))
