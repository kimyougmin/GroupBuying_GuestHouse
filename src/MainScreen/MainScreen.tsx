import React from 'react';
import HeaderSearch from "../components/HeaderSearch";
import LoginModal from "../components/LoginModal";
import {LoginModalBaseDate} from "../useContext/LoginModalBaseDate";
import GuestHouseCard from "./components/GuestHouseCard";
import {CardType} from "../types/CardType";
import {useCookies} from "react-cookie";

function MainScreen() {
    const [isSeeMore, setIsSeeMore] = React.useState<boolean>(true);
    const [cookies,,] = useCookies(['userToken']);
    const {isLoginModal} = React.useContext(LoginModalBaseDate);
    const [mainCard, setMainCard] = React.useState<CardType[]>([]);

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
            .catch((e) => console.log('error', e));
    }
    return (
        <div>
            <HeaderSearch />
            <div className={'body'}>
                {mainCard.map((e, index) => {
                    return <GuestHouseCard key={index} houseImages={e.houseImages} houseName={e.houseName} price={e.price} id={e.id} like={false} />
                })}
            </div>
            {isSeeMore ? (
                    <div>
                        <button onClick={() => setIsSeeMore(false)}>더 보기</button>
                    </div>
                ): null}
            <div className={"footer"}>

            </div>
            {isLoginModal ? <LoginModal />: null}
        </div>
    );
}

export default MainScreen;

