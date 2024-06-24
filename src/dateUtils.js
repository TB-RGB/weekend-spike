import { format, parse, parseISO } from "date-fns";

export const formatDate = (dateString)=>{
    const date = parseISO(dateString)
    return format(date, 'MMM d, yyy')
}

export const formatTime = (timeString)=>{
    const [time, offset] = timeString.split('/([+-])')
    const parsedTime = parse(time, 'HH:mm:ss', new Date())
    return format(parsedTime, 'h:mm a')
}

export const formatDateAndTime = (dateString, timeString)=>{
    const formattedDate = formatDate(dateString)
    const formattedTime = formatTime(timeString)
    return `${formatDate} at ${formattedTime}`
}