import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { Button } from '@mui/material';
import './HeaderSearch.css'
import i18n from "../utils/i18n";

export default function HeaderSearch() {
    const [isModal, setIsModal] = React.useState<boolean>(false);
    const onChangeLanguage = (lag: string) => {
        i18n.changeLanguage(lag);
        setIsModal(false);
    }
    return (
        <div className={'header'}>
            <div>
                <p>guestHouse</p>
            </div>
            <div>

            </div>
            <div>
                <p>{i18n.t("guestHouse_registration")}</p>
                <LanguageIcon onClick={() => setIsModal(!isModal)}/>
                {isModal ? (
                    <div className={'languageSelector-modal'}>
                        <div>
                            <Button variant="outlined" color={'inherit'} onClick={() => onChangeLanguage('ko')}>한국어<br/>대한민국</Button>
                            <Button variant="outlined" color={'inherit'} onClick={() => onChangeLanguage('en')}>english<br/>U.S.A</Button>
                            <Button variant="outlined" color={'inherit'} onClick={() => onChangeLanguage('jp')}>日本語<br/>日本</Button>
                        </div>
                    </div>):
                    null}
            </div>
        </div>
    );
}