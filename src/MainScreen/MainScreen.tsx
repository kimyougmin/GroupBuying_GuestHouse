import React from 'react';
import HeaderSearch from "../components/HeaderSearch";
import LoginModal from "../components/LoginModal";
import {LoginModalBaseDate} from "../useContext/LoginModalBaseDate";
import GuestHouseCard from "./components/GuestHouseCard";
import {CardType} from "../types/CardType";
import {useCookies} from "react-cookie";
import "../styles/MainScreen.css"
import i18n from "../utils/i18n";
import useInfiniteScrolling from "../hooks/useInfiniteScrolling";

function MainScreen() {
    const [isObserver, setIsObserver] = React.useState<boolean>(true);
    const [cookies,,] = useCookies(['userToken']);
    const {isLoginModal} = React.useContext(LoginModalBaseDate);
    const [mainCard, setMainCard] = React.useState<CardType[]>([]);
    const [scrollHookRef, setScrollHookRef] = React.useState<null | HTMLDivElement>(null);

    React.useEffect(() => {
        houseDateJoinInit();
    }, [cookies.userToken]);

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
            })}).then(() => {setMainCard(date)})
            .catch((e) => alert(`${i18n.t('error_reload')} ${e}`))
    }

    const fetchBoxList = React.useCallback(async () => {
        // setIsLoading(true);


        // setIsLoading(false);
    }, []);

    useInfiniteScrolling({
        scrollHookRef,
        fetchMore: fetchBoxList,
        hasMore: false,
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
            {!isObserver ?
                <div
                style={{height: '5px', marginBottom: '20px', backgroundColor: 'red'}}
                ref={setScrollHookRef}
            />: null}
        </div>
    );
}

export default MainScreen;

