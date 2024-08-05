import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import i18n from "../utils/i18n";
import {Button, TextField} from "@mui/material";
import '../styles/LoginModal.css'
import {LoginModalBaseDate} from "../useContext/LoginModalBaseDate";
import {XssCheatSheet} from "../utils/XssCheatSheet";

function LoginModal() {
    const loginModalRef = React.useRef<HTMLDivElement>(null);
    const [loginId, setLoginId] = React.useState<string>("");
    const [loginPw, setLoginPw] = React.useState<string>("");
    const {setIsLoginModal} = React.useContext(LoginModalBaseDate);
    const loginModalBackgroundClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        if (target.className === "loginModal-background") {
            setIsLoginModal(false)
        }
    }
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    return (
        <div className={'loginModal-background'} ref={loginModalRef} onClick={(e) => {loginModalBackgroundClickHandler(e)}}>
            <div className={'loginModal'}>
                <div className={'loginModal-header'}>
                    <CloseIcon onClick={() => {setIsLoginModal(false)}}/>
                    <p>{i18n.t("login_or_sign_up")}</p>
                    <div/>
                </div>
                <div className={'loginModal-body'}>
                    <p>{i18n.t("welcome_guest_house")}</p>
                    <div>
                        <TextField
                            id="outlined-password-input"
                            label={`${i18n.t('id')}`}
                            autoComplete="current-password"
                            value={loginId}
                            onChange={(e) => {setLoginId(XssCheatSheet(e.target.value))}}
                        />
                        <TextField
                            id="outlined-password-input"
                            label={`${i18n.t('pw')}`}
                            type="password"
                            value={loginPw}
                            onChange={(e) => {setLoginPw(XssCheatSheet(e.target.value))}}
                            autoComplete="current-password"
                        />
                    </div>
                    <Button variant="contained">{i18n.t("continue")}</Button>
                    <div >
                        <div className={"div-line"}/>
                        <p>{i18n.t("or")}</p>
                        <div className={"div-line"}/>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;

