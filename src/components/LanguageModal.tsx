import React from 'react';
import i18n from "../utils/i18n";
import CloseIcon from "@mui/icons-material/Close";
import {Button} from "@mui/material";
import {HeaderModalManagerBaseDate} from "../useContext/HeaderModalManagerBaseDate";
import '../../../groupbuying_gusethouse/src/styles/LanguageModal.css'

function LanguageModal() {
    const languageModalRef = React.useRef<HTMLDivElement>(null);
    const {isLanguageModal, setIsLanguageModal} = React.useContext(HeaderModalManagerBaseDate);

    React.useEffect(() => {
        if(isLanguageModal) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isLanguageModal]);

    React.useEffect(() => {
        window.addEventListener("keydown", modalEscape);
        window.addEventListener('mousedown', outSideClick as unknown as EventListener);
        return () => {
            window.removeEventListener("keydown", modalEscape);
            window.removeEventListener('mousedown', outSideClick as unknown as EventListener);}
    }, [])

    const modalEscape = (key: KeyboardEvent) => {
        if (key.key === "Escape") {
            setIsLanguageModal(false);
        }
    }

    const outSideClick = (e: React.MouseEvent) => {
        if (languageModalRef.current && !languageModalRef.current.contains(e.target as Node)) {
            setIsLanguageModal(false);
        }
    }

    const onLanguageModalClickHandler = (e: React.MouseEvent) => {
        const target = e.target as HTMLDivElement
        if (target.className === "languageSelector-modal") {
            setIsLanguageModal(false);
        }
    }
    const onChangeLanguage = (lag: string) => {
        i18n.changeLanguage(lag);
        setIsLanguageModal(false);
    }
    return (
        <div className={'languageSelector-modal'} ref={languageModalRef} onClick={(e) => {
            onLanguageModalClickHandler(e)
        }}>
            <div>
                <div>
                    <div/>
                    <p>{i18n.t("select_language")}</p>
                    <CloseIcon onClick={() => setIsLanguageModal(false)}/>
                </div>
                <Button variant="outlined" color={'inherit'}
                        onClick={() => onChangeLanguage('ko')}>한국어<br/>대한민국</Button>
                <Button variant="outlined" color={'inherit'}
                        onClick={() => onChangeLanguage('en')}>english<br/>U.S.A</Button>
                <Button variant="outlined" color={'inherit'}
                        onClick={() => onChangeLanguage('jp')}>日本語<br/>日本</Button>
            </div>
        </div>
    );
}

export default LanguageModal;
