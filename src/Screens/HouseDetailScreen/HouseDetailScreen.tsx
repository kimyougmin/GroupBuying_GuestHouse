import React from 'react';
import HouseDetailHeader from "./components/HouseDetailHeader";
import {useLocation} from "react-router-dom";
import OutboxIcon from '@mui/icons-material/Outbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {HeaderModalManagerBaseDate} from "../../useContext/HeaderModalManagerBaseDate";
import LoginModal from "../../components/LoginModal";
import LanguageModal from "../../components/LanguageModal";

function HouseDetailScreen() {
    const location = useLocation();
    const {isLoginModal, isLanguageModal} = React.useContext(HeaderModalManagerBaseDate);
    return (
        <div>
            <HouseDetailHeader />
            <div>
                <div>
                    <p>{location.state.houseName}</p>
                    <div>
                        <div>
                            <OutboxIcon />
                            <p>공유</p>
                        </div>
                        <div>
                            <FavoriteBorderIcon />
                            <p>찜</p>
                        </div>
                    </div>
                </div>
                {location.state.houseImages.map((e: {url: string}, index: number) => {
                    return <img key={index} src={e.url}/>
                })}
            </div>
            {isLoginModal? <LoginModal/>: null}
            {isLanguageModal? <LanguageModal/>: null}
        </div>
    );
}

export default HouseDetailScreen;
