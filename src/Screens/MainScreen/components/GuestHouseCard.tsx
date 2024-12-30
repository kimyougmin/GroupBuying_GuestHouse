import React from 'react';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {CardType} from "../../../types/CardType";
import axios from "axios";
import "../../../styles/GuestHouseCard.css"
import {HeaderModalManagerBaseDate} from "../../../useContext/HeaderModalManagerBaseDate";
import TestFetchModel from "../../../TestModel/TestFetchModel";
import {useNavigate} from "react-router-dom";

interface Card {
    cardId: number
}
function GuestHouseCardDispersion({cardId}: Card ) {
    const [isFetch, setIsFetch] = React.useState(false);
    const navigate = useNavigate();
    const [cardDate, setCardDate] = React.useState<CardType>({
        houseImages: [],
        id: 0,
        houseName: "",
        price: 0,
        like: false
    });
    // const navi = useNavigate();
    const [imageCount, setImageCount] = React.useState<number>(0);
    const [isCodeHover, setIsCodeHover] = React.useState<boolean>(false);

    const {isLoginModal , setIsLoginModal} = React.useContext(HeaderModalManagerBaseDate);
    const [style, setStyle] = React.useState({
        transform: `translateX(-${imageCount}00%)`,
        transition: `all 0.4s ease-in-out`,
    });

    React.useEffect(() => {
        Promise.allSettled([initialCardFetch]).then((res) => {
            if(res[0].status !== "fulfilled") {
                return;
            }
            const data: CardType = {
                houseImages: res[0].value.data.houseImages,
                id: res[0].value.data.id,
                houseName: res[0].value.data.houseName,
                price: res[0].value.data.price,
                like: false
            }
            setCardDate(data)
            setIsFetch(true)
        })
    }, [])
    const initialCardFetch = axios.get(`${process.env.REACT_APP_MAIN_HOUSE_TEST}?cardId=${cardId+1}`, {
        headers: {"content-type": "application/json"}
    })


    const cardMouseOverHandler = () => {
        setIsCodeHover(true);
    }
    const cardMouseOutHandler = () => {
        setIsCodeHover(false);
    }
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
        // if (!cookies.userToken) {
        //     setIsLoginModal(true);
        //     return;
        // }
        //더미 코드 추후 패치 진할 것
        setCardDate({
            houseImages: cardDate.houseImages,
            houseName: cardDate.houseName,
            id: cardDate.id,
            price: cardDate.price,
            like: true
        });
    }
    const imageUnLikeEventHandler = () => {
        //더미 코드 추후 패치 진할 것
        setCardDate({
            houseImages: cardDate.houseImages,
            houseName: cardDate.houseName,
            id: cardDate.id,
            price: cardDate.price,
            like: false
        });
    }
    const cardClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        if(target.id === 'images-next' || target.id === 'images-before' || target.id === 'card-favoriteBorderIcon' || target.id === 'card-favoriteIcon') {
            return;
        }
        navigate(`/rooms/${cardId+1}`, {
            state: {
                houseImages: cardDate.houseImages,
                id: cardDate.id,
                houseName: cardDate.houseName,
                price: cardDate.price,
                like: cardDate.like
            }
        });
    }
    return (<div>
        {isFetch? <div className={'guestHouseCard'}>
                <div className={'card-header'}>
                    <div className={"card-f"}>
                        <div className={'card-imageBox'} style={style}>
                            {cardDate.houseImages.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <img src={item.url}/>
                                    </div>)
                            })}
                        </div>
                    </div>
                    <div style={{position: 'absolute', height: "0"}}>
                        <div className={"card-eventItem"} onMouseOver={cardMouseOverHandler}
                             onMouseOut={cardMouseOutHandler}
                             onClick={(e) => cardClickHandler(e)}>
                            <div className={"card-likeSVG"}>
                                <div/>
                                {cardDate.like && isLoginModal ?
                                    <FavoriteIcon onClick={imageUnLikeEventHandler} id={'card-favoriteIcon'}/> :
                                    <FavoriteBorderIcon id={'card-favoriteBorderIcon'} onClick={imageLikeEventHandler}/>}
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
                    <p className={"card-name"}>{cardDate.houseName}</p>
                </div>
                <p>₩{cardDate.price}/박</p>
            </div> :
            <div className={"loading-Card"}>
                <div className={"loading-image"}>

                </div>
                <div className={"loading-body"}>
                    <div></div>
                    <div></div>
                </div>
            </div>}
    </div>);
}

export default GuestHouseCardDispersion;


