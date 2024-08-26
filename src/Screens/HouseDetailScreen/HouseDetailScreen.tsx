import React from 'react';
import HouseDetailHeader from "./components/HouseDetailHeader";
import {useLocation} from "react-router-dom";
import OutboxIcon from '@mui/icons-material/Outbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {HeaderModalManagerBaseDate} from "../../useContext/HeaderModalManagerBaseDate";
import LoginModal from "../../components/LoginModal";
import LanguageModal from "../../components/LanguageModal";
import "../../styles/HouseDetailScreen.css";
import {useCookies} from "react-cookie";

function HouseDetailScreen() {
    const location = useLocation();
    const {isLoginModal, setIsLoginModal, isLanguageModal} = React.useContext(HeaderModalManagerBaseDate);
    const [cookies,,] = useCookies(['userToken']);

    const imageLikeEventHandler = () => {
        if (!cookies.userToken) {
            setIsLoginModal(true);
            return;
        }
    }

    return (
        <div>
            <HouseDetailHeader />
            <div className={'detailBody'}>
                <div className={'detailBody-title'}>
                    <p>{location.state.houseName}</p>
                    <div>
                        <div>
                            <OutboxIcon />
                            <p>공유</p>
                        </div>
                        {/*찜하기 기능 구현시 추가 구현*/}
                        <div onClick={imageLikeEventHandler}>
                            <FavoriteBorderIcon />
                            <p>찜</p>
                        </div>
                    </div>
                </div>
                <div className={'detailBody-imagesTable'}>
                    <div className={'imagesTable-first'}>
                        <div className={'divImage-hover'}>
                            <img src={location.state.houseImages[0].url}/>
                        </div>
                    </div>
                    <div className={'imagesTable-col'}>
                        <div className={'divImage-hover'}>
                            <img src={location.state.houseImages[1].url}/>
                        </div>
                        <div className={'divImage-hover'}>
                            <img src={location.state.houseImages[2].url}/>
                        </div>
                    </div>
                    <div className={'imagesTable-col'}>
                        <div className={'divImage-hover'}>
                            <img src={location.state.houseImages[3].url}/>
                        </div>
                        <div className={'divImage-hover'}>
                            <img src={location.state.houseImages[4].url}/>
                        </div>
                    </div>
                </div>
            </div>
            {isLoginModal ? <LoginModal/> : null}
            {isLanguageModal ? <LanguageModal/> : null}
        </div>
    );
}

export default HouseDetailScreen;
