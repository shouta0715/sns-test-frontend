import { useContext, useState, createContext, useMemo } from "react";

interface StateContextType {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const StateContext = createContext({} as StateContextType);
export const StateProvider = ({ children }: any) => {
  const [userId, setUserId] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const baseProvider = useMemo(
    () => ({ userId, setUserId, isLogin, setIsLogin }),
    [userId, setUserId, isLogin, setIsLogin]
  );

  return (
    <StateContext.Provider value={baseProvider}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = (): StateContextType => useContext(StateContext);
