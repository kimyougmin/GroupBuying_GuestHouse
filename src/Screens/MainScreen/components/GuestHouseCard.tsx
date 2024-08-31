import React from 'react';
import {CardType} from "../../../types/CardType";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "../../../styles/GuestHouseCard.css"
import {useCookies} from "react-cookie";
import {HeaderModalManagerBaseDate} from "../../../useContext/HeaderModalManagerBaseDate";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useNavigate} from "react-router-dom";

function GuestHouseCard({houseImages, id, houseName, price, like}: CardType) {
    const [cardDate, setCardDate] = React.useState<CardType>({
        houseImages: houseImages,
        id: id,
        houseName: houseName,
        price: price,
        like: like
    });
    const navi = useNavigate();
    const [imageCount, setImageCount] = React.useState<number>(0);
    const [isCodeHover, setIsCodeHover] = React.useState<boolean>(false);
    const [cookies,,] = useCookies(['userToken']);
    const {isLoginModal , setIsLoginModal} = React.useContext(HeaderModalManagerBaseDate);
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
        navi(`/rooms/${id}`, {
            state: {
                houseImages: houseImages,
                id: id,
                houseName: houseName,
                price: price,
                like: like
            }
        });
    }
    return (
        <div className={'guestHouseCard'}>
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
                <div style={{position: 'absolute'}}>
                    <div className={"card-eventItem"} onMouseOver={cardMouseOverHandler}
                         onMouseOut={cardMouseOutHandler}
                         onClick={(e) => cardClickHandler(e)}>
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
                <p>{cardDate.houseName}</p>
            </div>
            <p>₩{cardDate.price}/박</p>
        </div>
    );
}

export default GuestHouseCard