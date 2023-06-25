import {createContext, useState} from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {login} from "../api/loginApi.js";
import {toast} from "react-toastify";

export const LoginContext = createContext(null);

function LoginContextProvider({children, isLogin, setLogin}) {
    const emptyAccount = {username: "", userId: ""};
    const [loginAccount, setAccount] = useState(emptyAccount);
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const tryLogin = async (account) => {
        const {code, data} = await login(account);
        if (code) {
            const {username} = account;
            setToken(data);
            setAccount({
                username: username,
                userId: username,
            });
            setLogin(true);
            toast("登录成功", {
                autoClose: 3000,
            });
            navigate("/chat");
        } else {
            toast("登录失败，请检查用户名和密码是否正确");
        }
    };
    const quitLogin = () => {
        setLogin(false);
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
