export const XssCheatSheet = (text: string) => {
    let newDate = text.replace("/</g", "&nr");
    newDate = newDate.replace("/>/g", "&nl");
    newDate = newDate.replace("/", "?");
    return newDate
}