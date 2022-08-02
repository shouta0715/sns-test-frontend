import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import Cookie from "universal-cookie";
import { useStateContext } from "../context/StateProvider";
import { User } from "../types/types";

const cookie = new Cookie();

export const useMutateAuth = () => {
  const { setUserId, setIsLogin } = useStateContext();
  const router = useRouter();

  const loginUserMutate = useMutation(
    (userInfo: Pick<User, "email" | "password">) =>
      axios.post(`${process.env.NEXT_PUBLIC_URL}/users/login`, userInfo),
    {
      onSuccess: (res) => {
        setUserId(res.data.userId);
        setIsLogin(true);
        cookie.set("token", res.data.token, { path: "/" });
        router.push("/MainPost");
      },
    }
  );

  const registerUser = useMutation(
    (userInfo: Pick<User, "email" | "password" | "name">) =>
      axios.post(`${process.env.NEXT_PUBLIC_URL}/users/register`, userInfo),
    {
      onSuccess: (res) => {
        setUserId(res.data.userId);
        setIsLogin(true);
        cookie.set("token", res.data.token, { path: "/" });
        router.push("/MainPost");
      },
    }
  );

  return { loginUserMutate, registerUser };
};
