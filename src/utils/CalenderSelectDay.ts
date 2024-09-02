import MonthDateType from "../types/MonthDateType";

interface props {
    selectDay: number
    selectMonth: string
    currentMonth: MonthDateType[]
    nextMonth: MonthDateType[]
}

export default function ({selectDay, selectMonth, currentMonth, nextMonth}: props) {
    let leftCalender: MonthDateType[] = [];
    let rightCalender: MonthDateType[] = [];
    let restartPoint: number = 0
    let isOverMonth: boolean = false;

    if (selectMonth === 'true') {
        for (let i = 0; i <= currentMonth.length - 1; i++){
            if (currentMonth[i].date === selectDay) {
                for (let j = i; j <= currentMonth.length - 1; j++){
                    if (currentMonth[j].reservation === 0){
                        break;
                    }
                    if ((currentMonth[currentMonth.length - 1].reservation === 1) && (currentMonth.length - 1 === j)){
                        isOverMonth = true;
                        leftCalender.push({date: currentMonth[i].date, day: currentMonth[i].day, reservation: 1});
                        break;
                    }
                    leftCalender.push({date: currentMonth[i].date, day: currentMonth[i].day, reservation: 1});
                    i++
                }
            }else {
                leftCalender.push({date: currentMonth[i].date, day: currentMonth[i].day, reservation: 0});
            }
        }
        if (isOverMonth){
            for (let i = 0; i <= nextMonth.length - 1; i++){
                if (nextMonth[i].reservation === 0){
                    restartPoint = i+1;
                    rightCalender.push({date: nextMonth[i].date, day: nextMonth[i].day, reservation: 0});
                    break;
                }
                rightCalender.push({date: nextMonth[i].date, day: nextMonth[i].day, reservation: 1});
            }
            for (let i = restartPoint; i < nextMonth.length -1; i++) {
                rightCalender.push({date: nextMonth[i].date, day: nextMonth[i].day, reservation: 0});
            }
        } else {
            rightCalender = nextMonth.map((e) => {
                return {date: e.date, day: e.day, reservation: 0};
            })
        }
    } else {
        leftCalender = currentMonth.map((e) => {
            return {date: e.date, day: e.day, reservation: 0};
        });

        for (let i = 0; i <= nextMonth.length - 1; i++){
            if (nextMonth[i].date === selectDay ) {
                for (let j = i; j <= nextMonth.length - 1; j++){
                    if (nextMonth[j].reservation === 0){
                        i--
                        break;
                    }
                    rightCalender.push({date: nextMonth[i].date, day: nextMonth[i].day, reservation: 1});
                    i++
                }
            }else {
                rightCalender.push({date: nextMonth[i].date, day: nextMonth[i].day, reservation: 0});
            }
        }
    }
    return {
        leftCalender,
        rightCalender,
    }
}