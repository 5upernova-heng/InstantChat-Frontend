import {createContext, useContext, useState} from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {login} from "../api/loginApi.js";
import {toast} from "react-toastify";
import { TimeContext } from "./TimeContextProvider.jsx";

export const LoginContext = createContext(null);

function LoginContextProvider({children, isLogin, setLogin}) {
    const {formatDate, setLastMsgTime} = useContext(TimeContext);
    
    const emptyAccount = {username: "", name: "", id: ""};
    const [loginAccount, setAccount] = useState(emptyAccount);
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const tryLogin = async (account) => {
        const {code, data} = await login(account);
        if (code) {
            const {jwt, user} = data;
            setToken(jwt);
            setAccount({
                username: user.username,
                name: user.name,
                id: user.id,
            });
            setLogin(true);
            toast(`登录成功。您好，${user.name}!`, {
                autoClose: 1000,
            });
            console.log(formatDate(new Date()));
            setLastMsgTime(formatDate(new Date()));
            navigate("/chat");
        } else {
            toast("登录失败，请检查用户名和密码是否正确");
        }
    };
    const quitLogin = () => {
        setLogin(false);
        setToken("");
        setAccount(emptyAccount);
    };
    return (
        <LoginContext.Provider
            value={{
                token,
                isLogin,
                tryLogin,
                quitLogin,
                loginAccount,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export default LoginContextProvider;

LoginContextProvider.propTypes = {
    children: PropTypes.element,
    isLogin: PropTypes.bool,
    setLogin: PropTypes.func,
}
