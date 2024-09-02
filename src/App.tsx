import React from 'react';
import './App.css';
import MainScreen from "./Screens/MainScreen/MainScreen";
import HeaderModalManagerContext from "./useContext/HeaderModalManagerContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HouseDetailScreen from "./Screens/HouseDetailScreen/HouseDetailScreen";
import HouseImagesScreen from "./Screens/HouseImagesScreen/HouseImagesScreen";

function App() {
  return (
    <div className="App">
        <HeaderModalManagerContext>
                <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={<MainScreen />}/>
                        <Route path={'/rooms/:id'} element={<HouseDetailScreen/>}/>
                        <Route path={'/rooms/:id/images'} element={<HouseImagesScreen />}/>
                    </Routes>
                </BrowserRouter>
        </HeaderModalManagerContext>
    </div>
  );
}

export default App;
