import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./components/chatRoom.jsx";
import Register from "./components/register.jsx";
import Auth from "./components/auth.jsx";


const App = () => {
    return( 
        <Routes>
            <Route exact path="/" element={<Auth></Auth>} />
            <Route exact path="/register" element={<Register></Register>} />
            <Route exact path="/chat" element={<Chat></Chat>} />
        </Routes>
    );
};

export default App;
