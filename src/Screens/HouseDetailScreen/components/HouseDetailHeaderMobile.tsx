import React from 'react';
import i18n from "../../../utils/i18n";
import LanguageIcon from "@mui/icons-material/Language";
import {HeaderModalManagerBaseDate} from "../../../useContext/HeaderModalManagerBaseDate";
import "../../../styles/HouseDetailHeaderMobile.css"
import {Link} from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type props = {
    setIsShareModal: (isShareModal: boolean) => void
    imageLikeEventHandler: () => void
}

function HouseDetailHeader({setIsShareModal, imageLikeEventHandler}: props) {
    const {setIsLanguageModal} = React.useContext(HeaderModalManagerBaseDate);
    return (
        <div className={'houseDetailHeader'}>
            <div className={'houseDetailHeader-body-m'}>
                <Link to={'/'}>
                    <ArrowBackIosNewIcon/>
                    <p>{i18n.t("back")}</p>
                </Link>
                <div/>
                <div>
                    <LanguageIcon onClick={() => setIsLanguageModal(true)}/>
                    <ContentCopyIcon onClick={() => setIsShareModal(true)}/>
                    <FavoriteBorderIcon onClick={imageLikeEventHandler}/>
                </div>
            </div>
        </div>
    );
}

export default HouseDetailHeader;