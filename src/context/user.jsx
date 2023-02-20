import  {createContext} from 'react';
import { useState, useEffect } from 'react';

const User = createContext();


export const UserProvider = ({children}) =>{
    const [loginState, setLoginState] = useState({
        email: null,
        accountBalance: 0
    });

    useEffect(() =>{
      const user = localStorage.getItem('user');
      let localUser = JSON.parse(user);
      console.log(localUser);
      if(user){
        setLogin(localUser.email, localUser.accountBalance)
      }
    }, [])

    const setLogin = (x, y) =>{
      setLoginState({email: x, accountBalance: y})
    }
    const setLogout = () =>{
        setLoginState({email:  null})
      }

    return(
        <User.Provider value={{loginState:loginState.email, setLogin, setLogout}}>
            {children}
        </User.Provider>
    )
}

export default User;