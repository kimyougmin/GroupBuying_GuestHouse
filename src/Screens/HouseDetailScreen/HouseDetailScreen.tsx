import React from 'react';
import HouseDetailHeader from "./components/HouseDetailHeader";
import {Link, useLocation} from "react-router-dom";
import OutboxIcon from '@mui/icons-material/Outbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {HeaderModalManagerBaseDate} from "../../useContext/HeaderModalManagerBaseDate";
import LoginModal from "../../components/LoginModal";
import LanguageModal from "../../components/LanguageModal";
import "../../styles/HouseDetailScreen.css";
import {useCookies} from "react-cookie";
import i18n from "../../utils/i18n";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentUi from "./components/PaymentUi";
import {CalenderContextProvider} from "../../useContext/CalenderContext";

function HouseDetailScreen() {
    const location = useLocation();
    const {isLoginModal, setIsLoginModal, isLanguageModal} = React.useContext(HeaderModalManagerBaseDate);
    const [cookies,,] = useCookies(['userToken']);
    const [isShareModal, setIsShareModal] = React.useState(false);
    const shareModalRef = React.useRef(null);
    const [isCopyCompleted, setIsCopyCompleted] = React.useState(false);

    const imageLikeEventHandler = () => {
        if (!cookies.userToken) {
            setIsLoginModal(true);
            return;
        }
    }
    const onShareClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (target.className !== "shareModal_back") {
            return;
        }
        setIsShareModal(false);
    }
    const onUrlCopyHandler = async () => {
        try {
            await navigator.clipboard.writeText(location.pathname);
            setIsShareModal(false);
            setIsCopyCompleted(true);
            setTimeout(() => {
                setIsCopyCompleted(false);
            }, 3000)
        } catch {
            alert(i18n.t("copy_error"));
        }
    }
    return (
        <div>
            <HouseDetailHeader />
            <div className={'detailBody'}>
                <div className={'detailBody-title'}>
                    <p>{location.state.houseName}</p>
                    <div>
                        <div onClick={() => setIsShareModal(true)}>
                            <OutboxIcon />
                            <p>{i18n.t("share")}</p>
                        </div>
                        {/*찜하기 기능 구현시 추가 구현*/}
                        <div onClick={imageLikeEventHandler}>
                            <FavoriteBorderIcon />
                            <p>{i18n.t("like")}</p>
                        </div>
                    </div>
                </div>
                <div className={'detailBody-imagesTable'}>
                    <div className={'imagesTable-first'}>
                        <Link to={`/rooms/${location.state.id}/images`}>
                            <div className={'divImage-hover'}/>
                            <img src={location.state.houseImages[0].url}/>
                        </Link>
                    </div>
                    <div className={'imagesTable-col'}>
                        <Link to={`/rooms/${location.state.id}/images`}>
                            <div className={'divImage-hover'}/>
                            <img src={location.state.houseImages[1].url}/>
                        </Link>
                        <Link to={`/rooms/${location.state.id}/images`}>
                            <div className={'divImage-hover'}/>
                            <img src={location.state.houseImages[2].url}/>
                        </Link>
                    </div>
                    <div className={'imagesTable-col'}>
                        <Link to={`/rooms/${location.state.id}/images`}>
                            <div className={'divImage-hover'}/>
                            <img src={location.state.houseImages[3].url}/>
                        </Link>
                        <Link to={`/rooms/${location.state.id}/images`}>
                            <div className={'divImage-hover'}/>
                            <img src={location.state.houseImages[4].url}/>
                        </Link>
                    </div>
                </div>
                <div className={'detailBody-main'}>
                    <div>

                    </div>
                    <div>
                        <CalenderContextProvider>
                            <PaymentUi />
                        </CalenderContextProvider>
                    </div>
                </div>
            </div>
            {isLoginModal ? <LoginModal/> : null}
            {isLanguageModal ? <LanguageModal/> : null}
            {isShareModal ? <div className={"shareModal_back"} ref={shareModalRef} onClick={onShareClickHandler}>
                <div className={"shareModal"}>
                    <CloseIcon onClick={() => setIsShareModal(false)} />
                    <p>{i18n.t("house_share")}</p>
                    <div>
                        <img src={location.state.houseImages[0].url}/>
                        <p>{location.state.houseName}</p>
                    </div>
                    <div onClick={onUrlCopyHandler}>
                        <ContentCopyIcon />
                        <p>{i18n.t("url_copy")}</p>
                    </div>
                </div>
            </div>: null}
            {isCopyCompleted ? <div className={'copyCompleted'}>
                <p>{i18n.t("link_copy_completed")}</p>
                <CheckCircleIcon/>
            </div> : null}
        </div>
    );
}

export default HouseDetailScreen;
