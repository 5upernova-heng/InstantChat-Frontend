import {createContext, useState} from "react";
import {toast} from "react-toastify";
// import {getOneUserApi} from "../api/userApi";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

export const LoginContext = createContext(null);

function LoginContextProvider({children, isLogin, setLogin}) {
    const emptyAccount = {username: "", userId: ""};
    const [loginAccount, setAccount] = useState(emptyAccount);
    const navigate = useNavigate();
    const tryLogin = async (account) => {
        // const {response} = await login(account);
        const response = true;
        if (response) {
            const {username} = account;
            setAccount({
                username: username,
                userId: username,
            });
            // const {response} = await getOneUserApi(
            //     username,
            //     date.getTime(),
            //     username
            // );
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
