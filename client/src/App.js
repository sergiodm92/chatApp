import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./components/chatRoom.jsx";
import Register from "./components/register.jsx";
import Auth from "./components/auth.jsx";
import NoAccess from "./components/noAccess.js";
import { useSelector } from "react-redux";
const token = localStorage.getItem("AuthLogin")


const App = () => {
    let state = useSelector((state)=>state.messageLogin)
    return( 
        <Routes>
            <Route exact path="/" element={<Auth></Auth>} />
            <Route exact path="/register" element={<Register></Register>} />
            <Route exact path="/chat" element={state=='ok' || token?<Chat></Chat>:<NoAccess></NoAccess>} />
        </Routes>
    );
};

export default App;
