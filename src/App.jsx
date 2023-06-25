import "/src/styles/App.css"
import {useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";
import LoginContextProvider from "./context/LoginContextProvider.jsx";


function App() {
    const [isLogin, setLogin] = useState(false);
    const defaultPage = <Navigate to={isLogin ? "/chat" : "/login"}/>
    const rootPageRoute = <Route path={"/"} element={defaultPage}/>
    const renderRoutes = () => {
        return <Routes>
            {rootPageRoute}
            <Route path={"/chat"} element={<Chat/>}/>
            <Route path={"/login"} element={<Login/>}/>
        </Routes>
    }
    return (<>
        <div className="background"></div>
        <LoginContextProvider isLogin={isLogin} setLogin={setLogin}>
            {renderRoutes()}
        </LoginContextProvider>
    </>)
}

export default App
