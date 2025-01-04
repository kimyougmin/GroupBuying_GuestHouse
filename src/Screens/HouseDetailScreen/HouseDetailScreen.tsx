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
import DetailScreenFetchModel from "../../TestModel/DetailScreenFetchModel";
import HouseDetailHeaderMobile from "./components/HouseDetailHeaderMobile";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {Avatar, Button} from "@mui/material";

function HouseDetailScreen() {
    const location = useLocation();
    const {isLoginModal, setIsLoginModal, isLanguageModal} = React.useContext(HeaderModalManagerBaseDate);
    const [cookies,,] = useCookies(['userToken']);
    const [isShareModal, setIsShareModal] = React.useState(false);
    const shareModalRef = React.useRef(null);
    const [isCopyCompleted, setIsCopyCompleted] = React.useState(false);
    const [detailDate, setDetailDate] = React.useState({
        detailTitle: "",
        hostName: "",
        hostImage: "",
        houseExplanation: ""
    });
    const [width, setWidth] = React.useState(window.innerWidth);
    const [imageNumber, setImageNumber] = React.useState<number>(1);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    React.useEffect(() => {
        setDetailDate(DetailScreenFetchModel);
        window.scrollTo(0,0);
        window.addEventListener("resize", handleResize);
        return () => {
            // cleanup
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    React.useEffect(() => {
        if (isShareModal){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isShareModal]);

    const imageLikeEventHandler = () => {
        if (!cookies.userToken) {
            setIsLoginModal(true);
            return;
        }
    };

    const onShareClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (target.className !== "shareModal_back") {
            return;
        }
        setIsShareModal(false);
    };

    const onUrlCopyHandler = async () => {
        try {
            await navigator.clipboard.writeText(location.pathname);
            setIsShareModal(false);
            setIsCopyCompleted(true);
            setTimeout(() => {
                setIsCopyCompleted(false);
            }, 3000);
        } catch {
            alert(i18n.t("copy_error"));
        }
    };

    const hostNameHandler = () => {
        if (i18n.language === "ko") return <p style={{display: 'flex'}}>호스트: {<p style={{fontWeight:'bold', marginLeft: '5px'}}>{detailDate.hostName}</p>}님</p>
        if (i18n.language === "en") return <p style={{display: 'flex'}}>Hosted by {<p style={{fontWeight:'bold', marginLeft: '5px'}}>{detailDate.hostName}</p>}</p>
        if (i18n.language === "jp") return <p style={{display: 'flex'}}>ホスト: {<p style={{fontWeight:'bold', marginLeft: '5px'}}>{detailDate.hostName}</p>}さん</p>
    };
    const mobileSwiperHandler = (swiper: any) => {
        setImageNumber(swiper.activeIndex + 1);
    }
    return (
        <div className={'detailScreen'}>
            {width < 780 ? <HouseDetailHeaderMobile setIsShareModal={setIsShareModal} imageLikeEventHandler={imageLikeEventHandler}/> : <HouseDetailHeader />}
            {isCopyCompleted ?
                    <div className={'copyCompleted'}>
                        <div className={'copyCompleted-body'}>
                            <p>{i18n.t("link_copy_completed")}</p>
                            <CheckCircleIcon/>
                        </div>
                    </div>
                : null}
            {width < 780 ? (
                    <div className={"detailBody-m"}>
                        <div className={'detailImage'}>
                            <Swiper pagination={true} onSlideChange={(swiper: any) => {
                                mobileSwiperHandler(swiper)
                            }} className="mySwiper">
                                {location.state.houseImages.map((e: {
                                    url: string | undefined;
                                }, index: React.Key | null | undefined) => {
                                    return (<SwiperSlide key={index}>
                                        <img src={e.url}/>
                                    </SwiperSlide>)
                                })}
                            </Swiper>
                            <div className={"detailImage-index"}>
                                <div>
                                    <p>{imageNumber} / {location.state.houseImages.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className={'detailExplanation'}>
                            <p className={'detailExplanation-title'}>{detailDate.detailTitle}</p>
                            <div className={'detailExplanation-host'}>
                                <div>
                                    <Avatar alt="Remy Sharp" src={detailDate.hostImage}/>
                                    <p>{detailDate.hostName}</p>
                                </div>
                            </div>
                            <p>{detailDate.houseExplanation}</p>
                        </div>
                        <div className={"detailReservation"}>
                            <div>
                                <p>₩{location.state.price} /{i18n.t("day")}</p>
                                <div>
                                    <p>{i18n.t("max_sale")}: 10%</p>
                                </div>
                            </div>
                            <Button>{i18n.t("reservation_application")}</Button>
                        </div>
                    </div>) :

                (<div className={'detailBody'}>
                    <div className={'detailBody-title'}>
                        <p>{location.state.houseName}</p>
                        <div>
                            <div onClick={() => setIsShareModal(true)}>
                                <OutboxIcon/>
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
                        <div className={'detailBody-mainLeft'}>
                            <p>{detailDate.detailTitle}</p>
                            <div>
                                <img src={detailDate.hostImage}/>
                                {hostNameHandler()}
                            </div>
                            <p>{detailDate.houseExplanation}</p>
                        </div>
                        <div className={'detailBody-mainRight'}>
                            <CalenderContextProvider>
                                <PaymentUi />
                            </CalenderContextProvider>
                        </div>
                    </div>
                </div>)
            }
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
        </div>
    );
}

export default HouseDetailScreen;
