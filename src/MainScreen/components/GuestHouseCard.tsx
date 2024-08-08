import React from 'react';
import {CardType} from "../../types/CardType";
import TestFetchModel from "../../components/TestFetchModel";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./GuestHouseCard.css"
import {useCookies} from "react-cookie";
import {LoginModalBaseDate} from "../../useContext/LoginModalBaseDate";
import FavoriteIcon from '@mui/icons-material/Favorite';

function GuestHouseCard() {
    const [cardDate, setCardDate] = React.useState<CardType>({
        images: [''],
        title: "",
        scope: "",
        checkInDays: "",
        checkOutDays: "",
        price: "",
        like: false
    });
    const [imageCount, setImageCount] = React.useState<number>(0);
    const [isCodeHover, setIsCodeHover] = React.useState<boolean>(true);
    const [cookies,,] = useCookies(['userToken']);
    const {isLoginModal , setIsLoginModal} = React.useContext(LoginModalBaseDate);
    const [style, setStyle] = React.useState({
        transform: `translateX(-${imageCount}00%)`,
        transition: `all 0.4s ease-in-out`,
    });

    const cardMouseOverHandler = () => {
        setIsCodeHover(true);
    }
    const cardMouseOutHandler = () => {
        setIsCodeHover(false);
    }

    React.useEffect(() => {
        setCardDate(TestFetchModel)
    }, []);

    const imageSlideEventHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        const target = e.target as HTMLDivElement;
        if(target.id === 'images-before') {
            setStyle({
                transform: `translateX(-${imageCount - 1}00%)`,
                transition: `all 0.4s ease-in-out`,
            });
            setImageCount(num => num - 1);
        }
        if(target.id === 'images-next') {
            setStyle({
                transform: `translateX(-${imageCount + 1}00%)`,
                transition: `all 0.4s ease-in-out`,
            });
            setImageCount((num) => num+ 1);
        }
    }

    const imageLikeEventHandler = () => {
        if (!cookies.userToken) {
            setIsLoginModal(true);
            return;
        }
        //더미 코드 추후 패치 진할 것
        setCardDate({
            images: cardDate.images,
            title: cardDate.title,
            scope: cardDate.scope,
            checkInDays: cardDate.checkInDays,
            checkOutDays: cardDate.checkOutDays,
            price: cardDate.price,
            like: true
        })
    }
    const imageUnLikeEventHandler = () => {
        //더미 코드 추후 패치 진할 것
        setCardDate({
            images: cardDate.images,
            title: cardDate.title,
            scope: cardDate.scope,
            checkInDays: cardDate.checkInDays,
            checkOutDays: cardDate.checkOutDays,
            price: cardDate.price,
            like: false
        })
    }
    return (
        <div>
            <div>
                <div className={"card-f"}>
                    <div className={'card-imageBox'} style={style}>
                        {cardDate.images.map((item, index) => {
                            return (
                                <div key={index}>
                                    <img src={item}/>
                                </div>)
                        })}
                    </div>
                </div>
                <div style={{position: 'absolute'}}>
                    <div className={"card-eventItem"} onMouseOver={cardMouseOverHandler}
                         onMouseOut={cardMouseOutHandler}>
                        <div className={"card-likeSVG"}>
                            <div/>
                            {cardDate.like && isLoginModal? <FavoriteIcon onClick={imageUnLikeEventHandler} id={'card-favoriteIcon'}/>:<FavoriteBorderIcon id={'card-favoriteBorderIcon'} onClick={imageLikeEventHandler}/>}
                        </div>
                        {isCodeHover ?
                            <div>
                                <div className={'card-slideSVG'}>
                                    {imageCount !== 0 ?
                                        <div className={'card-svgBackground'}>
                                            <NavigateNextIcon id={'images-before'} onClick={imageSlideEventHandler}/>
                                        </div> :
                                        <div/>}
                                    {imageCount !== 4 ?
                                        <div className={'card-svgBackground'}>
                                            <NavigateNextIcon id={'images-next'} onClick={imageSlideEventHandler}/>
                                        </div> :
                                        <div/>}
                                </div>
                            </div> : null}
                    </div>
                </div>
            </div>
            <div>
                <p>{cardDate.title}</p>
                <p>{cardDate.scope}</p>
            </div>
            <p>{cardDate.checkInDays}~{cardDate.checkOutDays}</p>
            <p>₩{cardDate.price}/박</p>
        </div>
    );
}

export default GuestHouseCard