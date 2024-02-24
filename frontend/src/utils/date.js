const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const getTodayDate = () => {
    const date = new Date();
    return `${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}