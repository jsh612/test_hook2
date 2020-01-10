import React, { useState, useContext } from "react";

const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Nico",
    loggedIn: false
  });
  const logUserIn = () => setUser({ ...user, loggedIn: true });
  return (
    <UserContext.Provider value={{ user, fn: { logUserIn } }}>
      {children}
    </UserContext.Provider>
  );
};

// 특정 Context를 여러 자식 컴포넌트에서 불러와서 값을 사용하는 경우 useContext()를
// 중복하여, 필요한 값을 가져올때 마다 사용해야 한다.
//  이러한 중복을 개선하기 위해 특정값을 출력하는 함수를 생성하여
// 필요한 데이터를 특정 컴포넌트에서 가져오게 한다.
export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useFns = () => {
  const { fn } = useContext(UserContext);
  return fn;
};

export default UserContextProvider;
