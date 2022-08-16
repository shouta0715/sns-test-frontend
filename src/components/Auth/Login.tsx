import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMutateAuth } from "../../hooks/useMutateAuth";
import { User } from "../../types/types";

type validateErrorType = {
  email?: string | boolean;
  password?: string | boolean;
};

export const Login = () => {
  const [passwordvisibled, setPasswordvisibled] = useState(true);
  const [userInfo, setUserInfo] = useState<Pick<User, "email" | "password">>({
    email: "",
    password: "",
  });
  const [errorForm, setErrorForm] = useState<validateErrorType>({});
  const [validateError, setValidateError] = useState<validateErrorType>({});
  const { loginUserMutate } = useMutateAuth();

  const validate = (value: Pick<User, "email" | "password">) => {
    const errors: validateErrorType = {};

    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    if (!value.email) {
      errors.email = "メールアドレスを入力してください";
    } else if (!regex.test(value.email)) {
      errors.email = "正しいメールアドレスを入力してください";
    }

    if (!value.password) {
      errors.password = "4文字以上15文字以下のパスワードを入力してくだいさい";
    } else if (value.password.length < 4) {
      errors.password = "4文字以上15文字以下のパスワードを入力してくだいさい";
    } else if (value.password.length > 15) {
      errors.password = "4文字以上15文字以下のパスワードを入力してくだいさい";
    }

    return errors;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorForm(validate(userInfo));
    if (
      Object.keys(errorForm).length === 0 &&
      validateError.email &&
      validateError.password
    ) {
      loginUserMutate.mutate(userInfo);
    }
  };

  useEffect(() => {
    const errors: validateErrorType = {};

    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    if (!userInfo.email) {
      errors.email = false;
    } else if (!regex.test(userInfo.email)) {
      errors.email = false;
    } else {
      errors.email = true;
    }

    if (!userInfo.password) {
      errors.password = false;
    } else if (userInfo.password.length < 4) {
      errors.password = false;
    } else if (userInfo.password.length > 15) {
      errors.password = false;
    } else {
      errors.password = true;
    }

    setValidateError(errors);
  }, [userInfo]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 p-4">
      <header className="fixed top-0 flex h-16 w-full justify-center bg-gray-300">
        <Link href="/MainPost">
          <div className="flex cursor-pointer items-center justify-center">
            <p className="font-bold text-black transition-all hover:text-white">
              ログインせずに利用する
            </p>
          </div>
        </Link>
      </header>
      <div className="mt-24 flex w-full max-w-[80%] flex-col space-y-8 rounded border border-pink-500 bg-white p-8 drop-shadow-md  md:w-1/2 md:max-w-none md:p-16">
        <p className="text-center font-Title text-4xl">Login to Continue</p>
        <form
          onSubmit={onSubmit}
          className="flex h-full w-full flex-col items-center justify-center space-y-16"
        >
          <div className="flex w-full flex-col items-center justify-center">
            <div className="relative flex w-full flex-col items-center justify-center">
              <input
                type="text"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                className="h-10 w-full rounded border text-center text-xs placeholder:text-center md:text-base "
                placeholder="example@google.com"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute top-1/2 -right-6 h-4 w-4 -translate-y-1/2 cursor-pointer text-red-500 md:-right-8 md:h-6 md:w-6 ${
                  // eslint-disable-next-line no-nested-ternary
                  !userInfo.email
                    ? "hidden"
                    : !validateError.email
                    ? "visible"
                    : "hidden"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute top-1/2 -right-6 h-4 w-4 -translate-y-1/2 cursor-pointer text-green-500 md:-right-8 md:h-6 md:w-6 ${
                  // eslint-disable-next-line no-nested-ternary
                  !userInfo.email
                    ? "hidden"
                    : validateError.email
                    ? "visible"
                    : "hidden"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="mt-4 text-xs text-red-500">{errorForm.email}</p>
          </div>
          <div className=" flex w-full flex-col items-center justify-center ">
            <div className="relative flex w-full flex-col items-center justify-center ">
              <input
                type={passwordvisibled ? "password" : "text"}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
                className="h-10 w-full rounded border text-center text-sm placeholder:text-center md:text-base "
                placeholder="パスワード"
              />
              <svg
                onClick={() => setPasswordvisibled(false)}
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 cursor-pointer md:right-4 md:h-6 md:w-6 ${
                  !passwordvisibled && "hidden"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
              <svg
                onClick={() => setPasswordvisibled(true)}
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 cursor-pointer md:right-4 md:h-6 md:w-6 ${
                  passwordvisibled && "hidden"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute top-1/2 -right-6 h-4 w-4 -translate-y-1/2 cursor-pointer text-red-500 md:-right-8 md:h-6 md:w-6 ${
                  // eslint-disable-next-line no-nested-ternary
                  !userInfo.password
                    ? "hidden"
                    : !validateError.password
                    ? "visible"
                    : "hidden"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute top-1/2 -right-6 h-4 w-4 -translate-y-1/2 cursor-pointer text-green-500 md:-right-8 md:h-6 md:w-6 ${
                  // eslint-disable-next-line no-nested-ternary
                  !userInfo.password
                    ? "hidden"
                    : validateError.password
                    ? "visible"
                    : "hidden"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="  mt-4 text-xs text-red-500">{errorForm.password}</p>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-pink-300 p-2 text-center text-xl font-bold text-white transition-all hover:bg-pink-400 md:py-4"
          >
            {loginUserMutate.isLoading || loginUserMutate.data
              ? "ログイン中..."
              : "ログイン"}
          </button>
          <div className="flex w-full  cursor-pointer items-center justify-center space-x-16 text-xs text-pink-300 md:text-base">
            <Link href="/Register">
              <span>新規登録はこちら</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
