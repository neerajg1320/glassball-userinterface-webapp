import { format } from 'date-fns';


export const defaultFormat = 'dd-MM-yyyy';

export const jsToExcelDate = function (inDate) {
    const returnDateTime = 25569.0 + ((inDate.getTime() - (inDate.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
    return returnDateTime.toString().substr(0,5);

}

export const excelToJSDate = function(date) {
    return new Date(Math.round((date - 25569)*86400*1000));
}

export const jsDateToString = function (date) {
    return format(date, defaultFormat)
}

export const jsDateToStringFormat = function (date, format) {
    return format(date, format)
}

export const dateFormatter = function (dateStr, format) {
    const d = new Date(dateStr)

    let formattedDate;
    if (format) {
        formattedDate = jsDateToStringFormat(d, format)
    } else {
        formattedDate = jsDateToString(d)
    }

    return formattedDate;
}