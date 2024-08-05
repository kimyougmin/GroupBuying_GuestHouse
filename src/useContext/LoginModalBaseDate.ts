import React from 'react';
import LoginModalType from "../types/LoginModalType";

export const LoginModalBaseDate = React.createContext<LoginModalType>({isLoginModal: false, setIsLoginModal: () => {}});
