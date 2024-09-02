import React from 'react';
import '../../../styles/PaymentUi.css';
import CalenderModal from "./CalenderModal";
import {CalenderContext} from "../../../useContext/CalenderContextDateBase";
import {Button} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import {useLocation} from "react-router-dom";

function PaymentUi() {
    const {isCalenderModal, setIsCalenderModal, checkIn, checkOut, count, setCount} = React.useContext(CalenderContext);
    const [isSelectDay, setIsSelectDay] = React.useState<boolean>(true);
    const [reservationInformation, setReservationInformation] = React.useState({
        dayPrice: 0,
        checkIn: checkIn,
        checkOut: checkOut,
        cleaningFee: 0
    });
    const location = useLocation();
    React.useEffect(() => {
        dummyModule();
    }, []);

    const dummyModule = () => {
        setReservationInformation({
            dayPrice: location.state.price,
            checkIn,
            checkOut,
            cleaningFee: 20000
        });
    };
    const onOpenModalHandler = () => {
        setIsCalenderModal(true);
    }
    const onSelectCheckInOutHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        target.id === 'checkIn' ? setIsSelectDay(true) : setIsSelectDay(false)
    }
    return (
        <div className='payment-none'>
            <div className={'payment-header'}>
                <p>₩{reservationInformation.dayPrice.toLocaleString()} </p>
                <p>/박</p>
            </div>
            <div className={'payment-selector'}>
                {
                    isCalenderModal ?
                        isSelectDay ?
                            <div className={'selector-checkIn'}>
                                <div>
                                    <div className='checkIn-btn' id={'checkIn'}
                                         onClick={(e) => onSelectCheckInOutHandler(e)}>
                                        <div id={'checkIn'}>
                                            <p id={'checkIn'}>check-in</p>
                                            <p id={'checkIn'}>{checkIn[0]}. {checkIn[1]}. {checkIn[2]}.</p>
                                        </div>
                                        <CloseIcon className={'closeIcon'}/>
                                    </div>
                                    <div className={'checkOut-btn'} id={'checkOut'}
                                         onClick={(e) => onSelectCheckInOutHandler(e)}>
                                        <div id={'checkOut'}>
                                            <p id={'checkOut'}>check-out</p>
                                            <p id={'checkOut'}>{checkOut[0]}. {checkOut[1]}. {checkOut[2]}.</p>
                                        </div>
                                        <CloseIcon className={'closeIcon'}/>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className={'selector-checkOut'} onClick={(e) => onSelectCheckInOutHandler(e)}>
                                <div>
                                    <div className='checkIn-btn' id={'checkIn'}>
                                        <div id={'checkIn'}>
                                            <p id={'checkIn'}>check-in</p>
                                            <p id={'checkIn'}>{checkIn[0]}. {checkIn[1]}. {checkIn[2]}.</p>
                                        </div>
                                        <CloseIcon className={'closeIcon'}/>
                                    </div>
                                    <div className={'checkOut-btn'} id={'checkOut'}
                                         onClick={(e) => onSelectCheckInOutHandler(e)}>
                                        <div id={'checkOut'}>
                                            <p id={'checkOut'}>check-out</p>
                                            <p id={'checkOut'}>{checkOut[0]}. {checkOut[1]}. {checkOut[2]}.</p>
                                        </div>
                                        <CloseIcon className={'closeIcon'}/>
                                    </div>
                                </div>
                            </div>
                        : <div className={'selector-day'}>
                            <div onClick={onOpenModalHandler}>
                                <p>check-in</p>
                                <p>{checkIn[0]}. {checkIn[1]}. {checkIn[2]}.</p>
                            </div>
                            <div onClick={onOpenModalHandler}>
                                <p>check-out</p>
                                <p>{checkOut[0]}. {checkOut[1]}. {checkOut[2]}.</p>
                            </div>
                        </div>
                }
                <div className={'selector-person'}>
                    <div>
                        <p>인원</p>
                        <p>게스트 1인 </p>
                    </div>
                    <ArrowBackIosIcon className={'person-icon'}/>
                </div>
            </div>
            <div className={'payment-footer'}>
                <Button variant="contained" disableElevation>
                    예약하기
                </Button>
                <span>
                    <p>₩{reservationInformation.dayPrice.toLocaleString()} X {count.toLocaleString()}박</p>
                    <p>₩{(reservationInformation.dayPrice * count).toLocaleString()}</p>
                </span>
                {
                    reservationInformation.cleaningFee === 0 ?
                        null :
                        <span>
                            <p>청소비</p>
                            <p>₩{reservationInformation.cleaningFee.toLocaleString()}</p>
                        </span>
                }
                <span>
                    <p>총 합계</p>
                    <p>₩{(reservationInformation.dayPrice * count + reservationInformation.cleaningFee).toLocaleString()}</p>
                </span>
            </div>
            {isCalenderModal ?
                <div className='modal-box'>
                    <CalenderModal isSelectDay={isSelectDay} setIsSelectDay={setIsSelectDay}/>
                    <div>
                        <button onClick={() => {
                            setIsCalenderModal(false)
                        }}>close
                        </button>
                    </div>
                </div> : null}
        </div>
    )
}

export default PaymentUi;