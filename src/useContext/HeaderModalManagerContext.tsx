import React from 'react';
import {HeaderModalManagerBaseDate} from "./HeaderModalManagerBaseDate";

function HeaderModalManagerContext({children}: {children: React.ReactNode}) {
    const [isLoginModal, setIsLoginModal] = React.useState<boolean>(false);
    const [isLanguageModal, setIsLanguageModal] = React.useState<boolean>(false);
    const [isUserModal, setIsUserModal] = React.useState<boolean>(false);
    return (
        <HeaderModalManagerBaseDate.Provider value={{isLoginModal, setIsLoginModal, isLanguageModal, setIsLanguageModal, isUserModal, setIsUserModal}} >
            {children}
        </HeaderModalManagerBaseDate.Provider>
    );
}

export default HeaderModalManagerContext;