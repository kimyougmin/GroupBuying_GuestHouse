import CurrentDay from "./CurrentDay";
import MonthDateType from "../types/MonthDateType";
import CalenderObjectType from "../TextModel/CalenderObjectType";

export default function CalenderObject({year, month, reservation}: CalenderObjectType){
    let array: MonthDateType[] = []
    const currentDate = CurrentDay();
    const firstDate = new Date(year, month -1, 1);
    const lastDate = new Date(year, month , 0);

    let day = firstDate.getDay()

    for(let i = 1; i <= lastDate.getDate(); i++){
        let coin = 0
        if(day > 6){
            day = 0;
        }
        if(i < currentDate.date && currentDate.month === firstDate.getMonth() + 1) {
            array.push({date: i, day: day, reservation: 0});
        } else {
            reservation.forEach((e) => {
                if (e === i) {
                    array.push({date: i, day: day, reservation: 0});
                    coin = 1;
                }
            })
            if(coin !== 1){
                array.push({date: i, day: day, reservation: 1});
                coin = 0;
            }
        }
        day++
    }
    return array
}