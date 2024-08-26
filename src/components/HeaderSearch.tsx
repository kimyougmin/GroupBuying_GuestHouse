import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import '../styles/HeaderSearch.css'
import i18n from "../utils/i18n";
import {useCookies} from "react-cookie";
import UserModal from "./UserModal";
import GuestModal from "./GuestModal";
import {HeaderModalManagerBaseDate} from "../useContext/HeaderModalManagerBaseDate";


export default function HeaderSearch() {
    const {isUserModal, setIsLanguageModal, setIsUserModal} = React.useContext(HeaderModalManagerBaseDate);
    const [profileImg, setProfileImg] = React.useState<string>('');
    const [cookies, , ] = useCookies(['userToken']);
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
                                <div className={"header-userList"} onClick={() => setIsUserModal(true)}>
                                    <ListIcon/>
                                    <img src={profileImg}/>
                                </div> :
                                <div className={"header-userList"} onClick={() => setIsUserModal(true)}>
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

            {isUserModal && !cookies.userToken? (<GuestModal/>) : null}
            {isUserModal && cookies.userToken? (<UserModal/>) : null}
        </div>
    );
}