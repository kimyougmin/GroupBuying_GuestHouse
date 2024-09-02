import React from "react";
import CalenderType from "../types/CalenderType";

export const CalenderContext = React.createContext<CalenderType>({isCalenderModal: false, setIsCalenderModal: () => {}, checkIn: [0,0,0], setCheckIn: () => {}, checkOut: [0,0,0], setCheckOut: () => {}, count: 0, setCount: () => {}});
