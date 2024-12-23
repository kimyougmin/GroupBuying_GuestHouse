export function ScreenWidthCalc(width: number): number {
    if (width <= 1477 && width > 1127){
        return 20;
    }
    if (width <= 1127 && width > 950){
        return 16;
    }
    if (width <= 950){
        return 9;
    }
    return 36;
}
export function ScreenWidthWithLengthCalc(width: number, length: number): number {
    if (width <= 1477 && width > 1127){
        return 20
    }
    if (width <= 1127 && width > 950){
        return 16
    }
    if (width <= 950){
        return 9
    }
    return 0
}