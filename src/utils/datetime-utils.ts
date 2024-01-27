
export const parseTimeToDate = (timeString: string): Date => {
    const combinedString = new Date().toLocaleDateString() + ' ' + timeString;
    const dateObject = new Date(combinedString);
    return dateObject
}

export const parseStringDateToDate = (dateString: string): Date => {
    return new Date(dateString + " 12:00 PM")
}

export const combineDateAndTime = (date: Date, time: Date): Date => {
    const year = date.getFullYear(); 
    const month = date.getMonth();
    const day = date.getDate();

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return new Date(year, month, day, hours, minutes, seconds);
}
