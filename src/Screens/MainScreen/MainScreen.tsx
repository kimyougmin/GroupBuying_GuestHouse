import React from 'react';
import HeaderSearch from "../../components/HeaderSearch";
import LoginModal from "../../components/LoginModal";
import {HeaderModalManagerBaseDate} from "../../useContext/HeaderModalManagerBaseDate";
import GuestHouseCard from "./components/GuestHouseCard";
import {CardType} from "../../types/CardType";
import {useCookies} from "react-cookie";
import "../../styles/MainScreen.css"
import i18n from "../../utils/i18n";
import useInfiniteScrolling from "../../hooks/useInfiniteScrolling";
import LanguageModal from "../../components/LanguageModal";

function MainScreen() {
    const [isObserver, setIsObserver] = React.useState<boolean>(true);
    const [cookies,,] = useCookies(['userToken']);
    const {isLoginModal, isLanguageModal} = React.useContext(HeaderModalManagerBaseDate);
    const [mainCard, setMainCard] = React.useState<CardType[]>([]);
    const [scrollHookRef, setScrollHookRef] = React.useState<null | HTMLDivElement>(null);
    const [isHasMore, setIsHasMore] = React.useState(true);
    const [page, setPage] = React.useState(0);
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        houseDateJoinInit();
    }, [cookies.userToken]);

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            // cleanup
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    const houseDateJoinInit = () => {
        const date:CardType[] = [];
        fetch(`${process.env.REACT_APP_MAIN_HOUSE}`, {
            method: "get",
            headers:{ "content-type": "application/json" },
        }).then((res) => res.json())
            .then((res) => {res.forEach((e: CardType) => {
                const row: CardType = {
                    houseImages: e.houseImages,
                    id: e.id,
                    houseName: e.houseName,
                    price: e.price,
                    like: false
                }
                date.push(row);
            })})
            .then(() => {setMainCard(date);})
            .catch((e) => alert(`${i18n.t('error_reload')} ${e}`))
    }

    const fetchBoxList = React.useCallback(async () => {
        let size: number = 5
        if (width <= 1477 && width > 1127) size = 4
        else if (width <= 1127 && width > 950) size = 3
        else if (width <= 950) size = 2
        const date:CardType[] = mainCard;
        console.log("size", size, "page", page);
        fetch(`${process.env.REACT_APP_MAIN_HOUSE_ADD}`,{
            method: "get",
            headers:{ "content-type": "application/json",
                "page": `${page}`,
                "size": `${size}` },
        }).then((res) => res.json())
            .then((res) => {
                console.log("res", res)
            })
            // .then((res) =>  {res.forEach((e: CardType) => {
            //     const row: CardType = {
            //         houseImages: e.houseImages.map((e) => {
            //             return {"url": e.url};
            //         }),
            //         id: e.id,
            //         houseName: e.houseName,
            //         price: e.price,
            //         like: false
            //     }
            //     date.push(row);
            // })})
            .then(() => {
                setMainCard(date);
                setPage(page+1);
            })
            .catch((e) => {
                console.log("fetchBoxList", e);
            })
    }, []);

    useInfiniteScrolling({
        scrollHookRef,
        fetchMore: fetchBoxList,
        hasMore: true,
    });

    return (
        <div>
            <HeaderSearch/>
            <div className={'main-body'}>
                <div className={'card-grid'}>
                    {mainCard.map((e, index) => {
                        return <GuestHouseCard key={index} houseImages={e.houseImages} houseName={e.houseName}
                                               price={e.price} id={e.id} like={false}/>
                    })}
                </div>
            </div>
            {isObserver ? (
                <div className={'main-seeMore'}>
                    <div/>
                    <button onClick={() => setIsObserver(false)}>더 보기</button>
                    <div/>
                </div>
            ) : null}
            <div className={"footer"}>

            </div>
            {isLoginModal ? <LoginModal/> : null}
            {isLanguageModal ? <LanguageModal/> : null}
            {!isObserver ? <div style={{height: '5px', marginBottom: '20px', backgroundColor: "red"}} ref={setScrollHookRef}/>: null}
        </div>
    );
}

export default MainScreen;

