import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import '../styles/HeaderSearch.css'
import i18n from "../utils/i18n";
import {HeaderModalManagerBaseDate} from "../useContext/HeaderModalManagerBaseDate";
import {useCookies} from "react-cookie";


export default function HeaderSearch() {
    const [isUserModal, setIsUserModal] = React.useState<boolean>(false);
    const userModalRef = React.useRef<HTMLDivElement>(null);
    const {setIsLoginModal, setIsLanguageModal} = React.useContext(HeaderModalManagerBaseDate);
    const [profileImg, setProfileImg] = React.useState<string>('');
    const [cookies, , removeCookie] = useCookies(['userToken']);
    const [width, setWidth] = React.useState(window.innerWidth);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            // cleanup
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    React.useEffect(() => {
        if (cookies.userToken) {
            fetch(`${process.env.REACT_APP_USER_PROFILE_IMG}`, {
               headers: {"Authorization": cookies.userToken.token, 'content-type': 'application/json'},
               method: "GET"
            }).then((res) => res.json())
                .then((res) => setProfileImg(res.profileImage))
                .catch((e) => alert(e))
        }
    }, [cookies.userToken]);

    React.useEffect(() => {
        window.addEventListener("keydown", modalEscape);
        window.addEventListener('mousedown', outSideClick as unknown as EventListener);
        return () => {
            window.removeEventListener("keydown", modalEscape);
            window.removeEventListener('mousedown', outSideClick as unknown as EventListener);}
    }, [])

    const modalEscape = (key: KeyboardEvent) => {
        if (key.key === "Escape") {
            setIsUserModal(false);
        }
    }

    const outSideClick = (e: React.MouseEvent) => {
        if (userModalRef.current && !userModalRef.current.contains(e.target as Node)) {
            setIsUserModal(false)
        }
    }

    const onLoginModalHandler = () => {
        setIsUserModal(false)
        setIsLoginModal(true);
    }
    const logoutHandler = () => {
        removeCookie("userToken");
        setIsUserModal(false);
    }
    return (
        <div className={"header"}>
            {width < 830 ?
                <div className={'mini-searchBox'}>
                    <SearchIcon/>
                    <p>{i18n.t('Where_going_trip')}</p>
                </div>:
                <>
                    <div className={'header-1layer'}>
                        <div className={"header-left"}>
                            <p>guestHouse</p>
                        </div>
                        <div>
                        </div>
                        <div className={"header-right"}>
                            <p>{i18n.t("guestHouse_registration")}</p>
                            <LanguageIcon onClick={() => setIsLanguageModal(true)}/>
                            {cookies.userToken ?
                                <div className={"header-userList"} onClick={() => setIsUserModal(!isUserModal)}>
                                    <ListIcon/>
                                    <img src={profileImg}/>
                                </div> :
                                <div className={"header-userList"} onClick={() => setIsUserModal(!isUserModal)}>
                                    <ListIcon/>
                                    <AccountCircleIcon/>
                                </div>}
                        </div>
                    </div>
                    <div>
                        <div className={"header-searchBox"}>
                            <div>
                                <div>
                                    <p>{i18n.t("travel_destination")}</p>
                                    <p>{i18n.t("travel_destination_search")}</p>
                                </div>
                            </div>
                            <div>
                                <div className={'left-block'}>
                                    <p>{i18n.t("check_in")}</p>
                                    <p>{i18n.t("add_date")}</p>
                                </div>
                            </div>
                            <div>
                                <div className={'left-block'}>
                                    <p>{i18n.t("check_out")}</p>
                                    <p>{i18n.t("add_date")}</p>
                                </div>
                            </div>
                            <div>
                                <div className={'left-block'}>
                                    <p>{i18n.t("traveler")}</p>
                                    <p>{i18n.t("add_guest")}</p>
                                </div>
                            </div>
                            <div className={"searchIcon-background"}>
                                <SearchIcon className={"header-searchIcon"}/>
                            </div>
                        </div>
                    </div>
            </>}

            {isUserModal && !cookies.userToken? (
                <div className={"guestUser"} ref={userModalRef} onClick={(e) => outSideClick(e)}>
                    <p onClick={onLoginModalHandler}>{i18n.t("login")}</p>
                    <p onClick={onLoginModalHandler}>{i18n.t("sign_up")}</p>
                    <div />
                    <p>{i18n.t("turn_your_space_into_a_guesthouse")}</p>
                    <p>{i18n.t("help_center")}</p>
                </div>
            ) : null}
            {isUserModal && cookies.userToken? (
                <div className={"loginUser"} ref={userModalRef} onClick={(e) => outSideClick(e)}>
                    <p>{i18n.t("my_travel")}</p>
                    <div/>
                    <p>{i18n.t("turn_your_space_into_a_guesthouse")}</p>
                    <p>{i18n.t("my_account")}</p>
                    <div/>
                    <p onClick={logoutHandler}>{i18n.t("log_out")}</p>
                    <p>{i18n.t("help_center")}</p>
                </div>
            ) : null}
        </div>
    );
}