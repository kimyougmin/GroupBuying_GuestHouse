import React from 'react';
import HeaderSearch from "../components/HeaderSearch";

function MainScreen() {
    const [isSeeMore, setIsSeeMore] = React.useState<boolean>(true);
    return (
        <div>
            <HeaderSearch />
            <div>

            </div>
            {isSeeMore ? (
                <div>
                    <button onClick={() => setIsSeeMore(false)}>더 보기</button>
                </div>
            ): null}
            <div>

            </div>
        </div>
    );
}

export default MainScreen;

