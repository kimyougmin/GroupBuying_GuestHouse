import React from 'react';
import HeaderSearch from "../../components/HeaderSearch";
import LoginModal from "../../components/LoginModal";
import {HeaderModalManagerBaseDate} from "../../useContext/HeaderModalManagerBaseDate";
import "../../styles/MainScreen.css"
import i18n from "../../utils/i18n";
import useInfiniteScrolling from "../../hooks/useInfiniteScrolling";
import LanguageModal from "../../components/LanguageModal";
import GuestHouseCard from "./components/GuestHouseCard";
import {ScreenWidthCalc} from "../../utils/ScreenWidthCalc";

function MainScreen() {
    const [isObserver, setIsObserver] = React.useState<boolean>(true);
    const { isLoginModal, isLanguageModal } = React.useContext(HeaderModalManagerBaseDate);
    const [cardLength, setCardLength] = React.useState<number[]>([]);
    const [scrollHookRef, setScrollHookRef] = React.useState<null | HTMLDivElement>(null);

    const calculateCards = () => {
        const screenWidth = new Array(ScreenWidthCalc(window.innerWidth)).fill(0);
        setCardLength(screenWidth);
    };

    React.useEffect(() => {
        // 초기 화면 크기 계산
        calculateCards();
    }, []);

    useInfiniteScrolling({
        scrollHookRef,
        fetchMore: () => {
            console.log("Fetching more items...");
        },
        hasMore: true,
    });
    return (
        <div>
            <HeaderSearch />
            <div className="main-body">
                <div className="card-grid">
                    {cardLength.map((_, index) => (
                        <GuestHouseCard key={index} cardId={index}/>
                    ))}
                </div>
            </div>
            {isObserver ? (
                <div className="main-seeMore">
                    <div />
                    <button onClick={() => setIsObserver(false)}>{i18n.t("show_more")}</button>
                    <div />
                </div>
            ) : null}
            <div className="footer"></div>
            {isLoginModal ? <LoginModal /> : null}
            {isLanguageModal ? <LanguageModal /> : null}
            {!isObserver ? (
                <div
                    style={{ height: "5px", marginBottom: "20px", backgroundColor: "red" }}
                    ref={(ref) => setScrollHookRef(ref)}
                />
            ) : null}
        </div>
    );
}

export default MainScreen;