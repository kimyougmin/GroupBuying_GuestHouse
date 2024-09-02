import CurrentDay from "./CurrentDay";
import NextMont from "./NextMonth";
import TestModelReservedData from "../TextModel/TestModelReservedData";
import CalenderObject from "./CalenderObject";

const CalenderInit = () => {
    const currentDay = CurrentDay();
    const nextMonth = NextMont()
    const reservedDay = TestModelReservedData();
    const currentCalendarDate = CalenderObject({year: currentDay.year, month: currentDay.month, reservation: reservedDay.CurrenMonth});
    const nextMonthCalendarDate = CalenderObject({year: nextMonth.year, month: nextMonth.month, reservation: reservedDay.NextMonth});
    let checkIn: number[] = []
    let checkOut: number[] = []
    let count = false;
    const currentLastDate = new Date(currentDay.year, currentDay.month, 0);
    const nextLastDate  = new Date(nextMonth.year, nextMonth.month, 0);

    for (let i = currentDay.date; i <= currentLastDate.getDate() - 1; i++) {
        if (currentCalendarDate[i].reservation === 0) {
            continue;
        }
        if (i === currentCalendarDate.length - 1){
            for (let j = 0; j <= nextLastDate.getDate() - 1; j++){
                if (nextMonthCalendarDate[j].reservation === 0) {
                    continue;
                }
                if (j === 0 && nextMonthCalendarDate[j].reservation === 1) {
                    checkIn = [currentDay.year, currentDay.month, currentCalendarDate[i].date];
                    checkOut = [nextMonth.year, nextMonth.month, nextMonthCalendarDate[j].date];
                    count = true;
                    break;
                }
                if (j === nextMonthCalendarDate.length - 1){
                    break;
                }
                if (nextMonthCalendarDate[i + 1].reservation === 1) {
                    checkIn =  [nextMonth.year, nextMonth.month, nextMonthCalendarDate[j].date];
                    checkOut = [nextMonth.year, nextMonth.month, nextMonthCalendarDate[j+1].date];
                    count = true
                    break;
                }
            }
            break;
        }
        if (currentCalendarDate[i + 1].reservation === 1) {
            checkIn =  [currentDay.year, currentDay.month, currentCalendarDate[i].date];
            checkOut = [currentDay.year, currentDay.month, currentCalendarDate[i+1].date];
            count = true
            break;
        }
    }
    return {
        checkIn: checkIn,
        checkOut: checkOut,
        count: count? 2 : 0
    }
}

export default CalenderInit()