import React from 'react';
import {LoginModalBaseDate} from "./LoginModalBaseDate";

function LoginModalContext({children}: {children: React.ReactNode}) {
    const [isLoginModal, setIsLoginModal] = React.useState<boolean>(false);
    return (
        <LoginModalBaseDate.Provider value={{isLoginModal, setIsLoginModal}} >
            {children}
        </LoginModalBaseDate.Provider>
    );
}

export default LoginModalContext;