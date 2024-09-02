export default  function NextMont() {
    const today = new Date();
    today.setMonth(today.getMonth() + 1)
    return {year: today.getFullYear(), month: (today.getMonth() + 1), date: today.getDate()};
}