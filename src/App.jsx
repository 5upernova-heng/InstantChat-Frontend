import "/src/styles/App.css"
import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";
import LoginContextProvider from "./context/LoginContextProvider.jsx";


function App() {
    const [isLogin, setLogin] = useState(false);
    const renderRoutes = () => {
        return isLogin ? (<Routes>
            <Route path={"/chat"} element={<Chat/>}/>
        </Routes>) : (<Login/>)
    }
    return (
        <>
            <div className="background"></div>
            <LoginContextProvider isLogin={isLogin} setLogin={setLogin}>
                {renderRoutes()}
            </LoginContextProvider>
        </>
    )
}

export default App
