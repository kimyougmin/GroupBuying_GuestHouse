import React from 'react';
import LoginModalType from "../types/LoginModalType";

export const HeaderModalManagerBaseDate = React.createContext<LoginModalType>({isLoginModal: false, setIsLoginModal: () => {}, isLanguageModal: false, setIsLanguageModal: () => {}, isUserModal: false, setIsUserModal: () => {}});
