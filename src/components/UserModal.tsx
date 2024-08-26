import React from 'react';
import i18n from "../utils/i18n";
import {HeaderModalManagerBaseDate} from "../useContext/HeaderModalManagerBaseDate";
import {useCookies} from "react-cookie";

function UserModal() {
    const userModalRef = React.useRef<HTMLDivElement>(null);
    const [,, removeCookie] = useCookies(['userToken']);
    const {setIsUserModal} = React.useContext(HeaderModalManagerBaseDate);

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
    const logoutHandler = () => {
        removeCookie("userToken");
        setIsUserModal(false);
    }
    return (
        <div className={"loginUser"} ref={userModalRef} onClick={(e) => outSideClick(e)}>
            <p>{i18n.t("my_travel")}</p>
            <div/>
            <p>{i18n.t("turn_your_space_into_a_guesthouse")}</p>
            <p>{i18n.t("my_account")}</p>
            <div/>
            <p onClick={logoutHandler}>{i18n.t("log_out")}</p>
            <p>{i18n.t("help_center")}</p>
        </div>
    );
}

export default UserModal;
