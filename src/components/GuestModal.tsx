import React from 'react';
import i18n from "../utils/i18n";
import {HeaderModalManagerBaseDate} from "../useContext/HeaderModalManagerBaseDate";

function GuestModal() {
    const userModalRef = React.useRef<HTMLDivElement>(null);
    const {setIsLoginModal, setIsUserModal} = React.useContext(HeaderModalManagerBaseDate);

    React.useEffect(() => {
        window.addEventListener("keydown", modalEscape);
        window.addEventListener('mousedown', outSideClick as unknown as EventListener);
        return () => {
            window.removeEventListener("keydown", modalEscape);
            window.removeEventListener('mousedown', outSideClick as unknown as EventListener);
        }
    }, [])

    const modalEscape = (key: KeyboardEvent) => {
        if (key.key === "Escape") {
            setIsUserModal(false);
        }
    }
    const outSideClick = (e: React.MouseEvent) => {
        if (userModalRef.current && !userModalRef.current.contains(e.target as Node)) {
            setIsUserModal(false);
        }
    }
    const onLoginModalHandler = () => {
        setIsUserModal(false);
        setIsLoginModal(true);
    }
    return (
        <div className={"guestUser"} ref={userModalRef} onClick={(e) => outSideClick(e)}>
            <p onClick={onLoginModalHandler}>{i18n.t("login")}</p>
            <p onClick={onLoginModalHandler}>{i18n.t("sign_up")}</p>
            <div/>
            <p>{i18n.t("turn_your_space_into_a_guesthouse")}</p>
            <p>{i18n.t("help_center")}</p>
        </div>
    );
}

export default GuestModal;