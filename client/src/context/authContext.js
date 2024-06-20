
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const authContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    // Default Headers
    axios.defaults.headers.common["Authorization"] = auth?.token;
    // axios.defaults.baseURL = process.env.REACT_APP_API;

    useEffect(() => {
        const Data = localStorage.getItem("auth");
        if (Data) {
            const ParseData = JSON.parse(Data);
            setAuth({
                ...auth,
                user: ParseData.user,
                token: ParseData.token
            })

        }
        // eslint-disable-next-line
    }, [])
    return (
        <authContext.Provider value={[auth, setAuth]}>
            {children}
        </authContext.Provider>
    )
}

//  Custom hook 

const useAuth = () => useContext(authContext);

export { useAuth, AuthProvider }