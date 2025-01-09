import React from 'react';
import logo from "../../gg_logo.png"
import i18n from "../../utils/i18n";
import {Button} from "@mui/material";
import PhotoModal from "../../components/PhotoModal";
import { PhotoCamera } from "@mui/icons-material";
import "../../styles/HouseRegistrationScreen.css"
import LanguageIcon from "@mui/icons-material/Language";

function HouseRegistrationScreen() {
    const [isPhotoModal, setIsPhotoModal] = React.useState<boolean>(false);

    return (
        <div className={"houseRegistration"}>
            <div className={"houseRegistration-header"}>
                <img src={logo}/>
                <LanguageIcon />
            </div>
            <div className={"houseRegistration-body"}>
                <h1>{i18n.t("add_guestHouse_photo")}</h1>
                <p>{i18n.t("add_guestHouse_photo_detail")}</p>
                <div className={"photoArea"}>
                    <PhotoCamera/>
                    <div/>
                    <Button onClick={() => {setIsPhotoModal(!isPhotoModal)}}>{i18n.t("add_photo")}</Button>
                </div>
            </div>
            {isPhotoModal ? <PhotoModal/> : null}
        </div>
    );
}

export default HouseRegistrationScreen;