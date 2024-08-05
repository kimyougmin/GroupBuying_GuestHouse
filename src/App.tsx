import React from 'react';
import './App.css';
import MainScreen from "./MainScreen/MainScreen";
import LoginModalContext from "./useContext/LoginModalContext";

function App() {
  return (
    <div className="App">
        <LoginModalContext>
            <MainScreen />
        </LoginModalContext>
    </div>
  );
}

export default App;
