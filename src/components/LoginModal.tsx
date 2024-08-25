import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import i18n from "../utils/i18n";
import {Button, TextField} from "@mui/material";
import '../styles/LoginModal.css'
import {HeaderModalManagerBaseDate} from "../useContext/HeaderModalManagerBaseDate";
import {XssCheatSheet} from "../utils/XssCheatSheet";
import {useCookies} from "react-cookie";

function LoginModal() {
    const loginModalRef = React.useRef<HTMLDivElement>(null);
    const [loginId, setLoginId] = React.useState<string>("");
    const [loginPw, setLoginPw] = React.useState<string>("");
    const {setIsLoginModal} = React.useContext(HeaderModalManagerBaseDate);
    const [, setCookie, ] = useCookies(['userToken'])

    const loginModalBackgroundClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        if (target.className === "loginModal-background") {
            setIsLoginModal(false)
        }
    }
    React.useEffect(() => {
        window.addEventListener('keydown', modalStateManager);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', modalStateManager);
            document.body.style.overflow = 'unset';
        };
    }, []);

    const modalStateManager = (key: KeyboardEvent) =>  {
        if (key.key === "Enter") {
            onLoginButtonHandler()
        }
        if (key.key === "Escape") {
            setIsLoginModal(false)
        }
    }

    const onLoginButtonHandler = () => {
        fetch(`${process.env.REACT_APP_LOGIN_URL}`, {
            method: "POST",
            credentials: 'include',
            headers: {'content-type': 'application/json','Access-Control-Allow-Origin':'http://localhost:3000/',},
            body: JSON.stringify({"id": loginId, "password": loginPw})
        }).then((res) => res.json())
            .then((res) => {loginSuccessLogic(res.token)})
            .catch((e) => {alert(e)})
    }
    const loginSuccessLogic = (token: string) => {
        setCookie('userToken', {"token": token}, {expires: new Date(Date.now() + 60000), httpOnly: true});
        setIsLoginModal(false);
    }
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
                    <Button variant="contained" onClick={onLoginButtonHandler}>{i18n.t("continue")}</Button>
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

