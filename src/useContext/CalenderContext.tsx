import React from 'react';
import {CalenderContext} from "./CalenderContextDateBase"
import CalenderInit from "../utils/CalenderInit";

export function CalenderContextProvider({children}: {children: React.ReactNode}) {
    const calenderInit = CalenderInit;
    const [isCalenderModal, setIsCalenderModal] = React.useState<boolean>(false);
    const [checkIn, setCheckIn] = React.useState(calenderInit.checkIn);
    const [checkOut, setCheckOut] = React.useState(calenderInit.checkOut);
    const [count, setCount] = React.useState(calenderInit.count);

    return(
        <CalenderContext.Provider value={{isCalenderModal, setIsCalenderModal, checkIn, setCheckIn, checkOut, setCheckOut, count, setCount}}>
                {children}
        </CalenderContext.Provider>
    )
}
