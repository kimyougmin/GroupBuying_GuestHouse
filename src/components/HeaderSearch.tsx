import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import './HeaderSearch.css'
import i18n from "../utils/i18n";

export default function HeaderSearch() {
    const [isLanguageModal, setIsLanguageModal] = React.useState<boolean>(false);
    const [isUserModal, setIsUserModal] = React.useState<boolean>(false);
    const [isLoginModal, setIsLoginModal] = React.useState<boolean>(false);
    const onChangeLanguage = (lag: string) => {
        i18n.changeLanguage(lag);
        setIsLanguageModal(false);
    }
    return (
        <div className={"header"}>
            <div className={'header-1layer'}>
                <div className={"header-left"}>
                    <p>guestHouse</p>
                </div>
                <div>
                </div>
                <div className={"header-right"}>
                    <p>{i18n.t("guestHouse_registration")}</p>
                    <LanguageIcon onClick={() => setIsLanguageModal(!isLanguageModal)}/>
                    <div className={"header-userList"} onClick={() => setIsUserModal(!isUserModal)}>
                        <ListIcon/>
                        <AccountCircleIcon/>
                    </div>
                </div>
            </div>
            <div>
                <div className={"header-searchBox"}>
                    <div>
                        <p>{i18n.t("travel_destination")}</p>
                        <p>{i18n.t("travel_destination_search")}</p>
                    </div>
                    <div>
                        <p>{i18n.t("check_in")}</p>
                        <p>{i18n.t("add_date")}</p>
                    </div>
                    <div>
                        <p>{i18n.t("check_out")}</p>
                        <p>{i18n.t("add_date")}</p>
                    </div>
                    <div>
                        <p>{i18n.t("traveler")}</p>
                        <p>{i18n.t("add_guest")}</p>
                    </div>
                    <div className={"searchIcon-background"}>
                        <SearchIcon className={"header-searchIcon"}/>
                    </div>
                </div>
            </div>
            {isLanguageModal ? (
                    <div className={'languageSelector-modal'} onClick={() => {setIsLanguageModal(false)}}>
                        <div>
                            <div>
                                <div/>
                                <p>{i18n.t("select_language")}</p>
                                <CloseIcon onClick={() => setIsLanguageModal(false)}/>
                            </div>
                            <Button variant="outlined" color={'inherit'} onClick={() => onChangeLanguage('ko')}>한국어<br/>대한민국</Button>
                            <Button variant="outlined" color={'inherit'} onClick={() => onChangeLanguage('en')}>english<br/>U.S.A</Button>
                            <Button variant="outlined" color={'inherit'} onClick={() => onChangeLanguage('jp')}>日本語<br/>日本</Button>
                        </div>
                    </div>) :
                null}
            {isUserModal ? (
                <div className={"guestUser"}>
                    <p>{i18n.t("login")}</p>
                    <p>{i18n.t("sign_up")}</p>
                    <div />
                    <p>{i18n.t("turn_your_space_into_a_guesthouse")}</p>
                    <p>{i18n.t("help_center")}</p>
                </div>
            ) : null}
            {isLoginModal ? (
                <div>
                    <div>
                        <CloseIcon onClick={() => setIsLoginModal(false)}/>
                        <p></p>
                    </div>
                </div>
            ) : null}
        </div>
    );
}