import React from 'react';
import HeaderSearch from "../../components/HeaderSearch";
import LoginModal from "../../components/LoginModal";
import {HeaderModalManagerBaseDate} from "../../useContext/HeaderModalManagerBaseDate";
import "../../styles/MainScreen.css"
import i18n from "../../utils/i18n";
import useInfiniteScrolling from "../../hooks/useInfiniteScrolling";
import LanguageModal from "../../components/LanguageModal";
import GuestHouseCard from "./components/GuestHouseCard";
import {ScreenWidthCalc, ScreenWidthWithScrollCalc} from "../../utils/ScreenWidthCalc";

interface limitType {
    limits: number
    scroll: number
}

function MainScreen() {
    const [isObserver, setIsObserver] = React.useState<boolean>(true);
    const { isLoginModal, isLanguageModal } = React.useContext(HeaderModalManagerBaseDate);
    const [cardLength, setCardLength] = React.useState<number[]>([]);
    const [scrollHookRef, setScrollHookRef] = React.useState<null | HTMLDivElement>(null);
    const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);
    const [renderLimits, setRenderLimits] = React.useState<limitType>({
        limits: 0,
        scroll: 1
    });

    const useDebounce = (callback: () => void, delay: number) => {
        const timer = React.useRef<NodeJS.Timeout | null>(null);

        const debouncedCallback = React.useCallback(() => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                callback();
            }, delay);
        }, [callback, delay]);

        return debouncedCallback;
    };

    const handleResize = useDebounce(() => {
        setWindowWidth(window.innerWidth);
    }, 300);

    const calculateCards = () => {
        const screenWidth = new Array(ScreenWidthCalc(window.innerWidth)).fill(0);
        setCardLength(screenWidth);
        setRenderLimits({limits: screenWidth.length, scroll: 1});
    };

    React.useEffect(() => {
        // 초기 화면 크기 계산
        calculateCards();
    }, []);
    React.useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    useInfiniteScrolling({
        scrollHookRef,
        fetchMore: () => {
            const addArray = new Array(12).fill(0);
            setCardLength([...cardLength, ...addArray]);
            setRenderLimits({limits: ScreenWidthWithScrollCalc(windowWidth, renderLimits.scroll++), scroll: renderLimits.scroll++});
        },
        hasMore: true,
    });
    return (
        <div>
            <HeaderSearch />
            <div className="main-body">
                <div className="card-grid">
                    {cardLength.map((_, index) => (
                        renderLimits.limits > index ?
                        <GuestHouseCard key={index} cardId={index}/>: null
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