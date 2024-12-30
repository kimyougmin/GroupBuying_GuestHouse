export function ScreenWidthCalc(width: number): number {
    if (width > 1880) {
        return 24;
    }
    if (width <= 1880 && width > 1127){
        return 20;
    }
    if (width <= 1477 && width > 1127){
        return 20;
    }
    if (width <= 1127 && width > 950){
        return 16;
    }
    if (width <= 950){
        return 9;
    }
    return 20;
}
export function ScreenWidthWithScrollCalc(width: number, scroll: number): number {
    if (width > 1880) {
        return 24 + 12 * scroll;
    }
    if (width <= 1880 && width > 1127){
        return 20 + 10 * scroll;
    }
    if (width <= 1477 && width > 1127){
        return 20 +  10 * scroll;
    }
    if (width <= 1127 && width > 950){
        return 16 + 8 * scroll;
    }
    if (width <= 950){
        return 9 + 4 * scroll;
    }
    return 20;
}