export default interface CalenderType {
    isCalenderModal: boolean
    setIsCalenderModal:(isModel: boolean) => void
    checkIn: number[]
    setCheckIn: (checkIn: number[]) => void
    checkOut: number[]
    setCheckOut: (checkOut: number[]) => void
    count: number
    setCount: (count: number) => void
}