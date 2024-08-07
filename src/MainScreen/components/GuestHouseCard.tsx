import React from 'react';
import {CardType} from "../../types/CardType";
import TestFetchModel from "../../components/TestFetchModel";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./GuestHouseCard.css"

function GuestHouseCard() {
    const [cardDate, setCardDate] = React.useState<CardType>();
    const [imageCount, setImageCount] = React.useState<number>(0);
    const [style, setStyle] = React.useState({
        transform: `translateX(-${imageCount}00%)`,
        transition: `all 0.4s ease-in-out`,
    });
    React.useEffect(() => {
        setCardDate(TestFetchModel)
    }, []);
    const imageEventHandler = (e: React.MouseEvent<SVGSVGElement>) => {
        const target = e.target as HTMLDivElement;
        console.log(imageCount)
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
    return (
        <div>
            <div>
                <div  className={"card-f"}>
                    <div className={'card-imageBox'} style={style}>
                        {cardDate?.images.map((item, index) => {
                            return (
                                <div key={index}>
                                    <img src={item}/>
                                </div>)
                        })}
                    </div>
                </div>
                <div className={"card-eventItem"}>
                    <div className={"card-likeSVG"}>
                        <div/>
                        <FavoriteBorderIcon/>
                    </div>
                    <div className={'card-slideSVG'}>
                        {imageCount !== 0 ? <NavigateNextIcon id={'images-before'} onClick={imageEventHandler}/> : <div />}
                        {imageCount !== 4 ? <NavigateNextIcon id={'images-next'} onClick={imageEventHandler}/> : <div/>}
                    </div>
                </div>
            </div>
            <div>
                <p>{cardDate?.title}</p>
                <p>{cardDate?.scope}</p>
            </div>
            <p>{cardDate?.checkInDays}~{cardDate?.checkOutDays}</p>
            <p>₩{cardDate?.price}/박</p>
        </div>
    );
}

export default GuestHouseCard