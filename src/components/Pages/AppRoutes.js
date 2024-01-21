import React from "react";
import {Routes, Route} from 'react-router-dom';
import UserInfo from "./UserInfo";
import Result from "./Result";

const AppRoutes = ({onSubmit, userData}) =>{
    return(
        <Routes>
            <Route path="/userInfo" element={<UserInfo onSubmit={onSubmit}/>}/>
            <Route path="/Result" element={<Result data={userData}/>} />
        </Routes>
    )
}

export default AppRoutes;