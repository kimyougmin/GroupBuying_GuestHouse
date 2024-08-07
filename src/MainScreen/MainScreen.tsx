import React from 'react';
import HeaderSearch from "../components/HeaderSearch";
import LoginModal from "../components/LoginModal";
import {LoginModalBaseDate} from "../useContext/LoginModalBaseDate";
import GuestHouseCard from "./components/GuestHouseCard";

function MainScreen() {
    const [isSeeMore, setIsSeeMore] = React.useState<boolean>(true);
    const {isLoginModal} = React.useContext(LoginModalBaseDate);
    return (
        <div>
            <HeaderSearch />
            <div className={'body'}>
                <GuestHouseCard />
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

