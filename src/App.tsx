import React from 'react';
import './App.css';
import MainScreen from "./Screens/MainScreen/MainScreen";
import LoginModalContext from "./useContext/LoginModalContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HouseDetailScreen from "./Screens/HouseDetailScreen/HouseDetailScreen";

function App() {
  return (
    <div className="App">
        <LoginModalContext>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<MainScreen />}/>
                    <Route path={'/:houseNumber'} element={<HouseDetailScreen/>}/>
                </Routes>
            </BrowserRouter>
        </LoginModalContext>
    </div>
  );
}

export default App;
