import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./components/auth.jsx";
import Register from "./components/register.jsx";
import Chat from "./components/chatRoom.jsx";
import NoAccess from "./components/noAccess.js";
const token = localStorage.getItem("AuthLogin")


const App = () => {

    let data = useSelector((state)=>state.messageLogin)
    return( 
        <Routes>
            <Route exact path="/" element={<Auth></Auth>} />
            <Route exact path="/register" element={<Register></Register>} />
            <Route exact path="/chat" element={data.state || token?<Chat></Chat>:<NoAccess></NoAccess>} />
        </Routes>
    );
};

export default App;
