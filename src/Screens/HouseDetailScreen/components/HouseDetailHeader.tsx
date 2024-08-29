import React from 'react';
import i18n from "../../../utils/i18n";
import LanguageIcon from "@mui/icons-material/Language";
import ListIcon from "@mui/icons-material/List";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {HeaderModalManagerBaseDate} from "../../../useContext/HeaderModalManagerBaseDate";
import {useCookies} from "react-cookie";
import "../../../styles/HouseDetailHeader.css"
import UserModal from "../../../components/UserModal";
import GuestModal from "../../../components/GuestModal";
import {Link} from "react-router-dom";

function HouseDetailHeader() {
    const {setIsLanguageModal, setIsUserModal} = React.useContext(HeaderModalManagerBaseDate);
    const [cookies, , ] = useCookies(['userToken']);
    const [profileImg, setProfileImg] = React.useState<string>('');
    const {isUserModal} = React.useContext(HeaderModalManagerBaseDate);

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
        <div className={'houseDetailHeader'}>
            <Link to={'/'}>
                <p>guestHouse</p>
            </Link>
            <div></div>
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
            {isUserModal && !cookies.userToken ? <GuestModal/>: null}
            {isUserModal && cookies.userToken ? <UserModal/>: null}
        </div>
    );
}

export default HouseDetailHeader;