import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth.jsx";
import ChatRoom from "./components/ChatRoom.jsx";



const App = () => {
    return( 
        <Routes>
            <Route exact path="/" element={<Auth></Auth>} />
            <Route exact path="/chat" element={<ChatRoom></ChatRoom>} />
        </Routes>
    );
};

export default App;
