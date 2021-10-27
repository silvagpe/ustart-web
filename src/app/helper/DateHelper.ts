export class DateHelper {

    public static toJsonDate(date: Date) {

        //"2021-08-10T01:04:08.053Z"

        const year = date.getFullYear();
        const month = (date.getMonth()+1).toString().padStart(2,"0");
        const day = (date.getDate()).toString().padStart(2,"0");
        const hour = (date.getHours()).toString().padStart(2,"0");
        const minute = (date.getMinutes()).toString().padStart(2,"0");
        const sec = (date.getSeconds()).toString().padStart(2,"0");
        const milliSec = (date.getMilliseconds()).toString().padStart(3,"0");
        

        return `${year}-${month}-${day}T${hour}:${minute}:${sec}.${milliSec}Z`;

    }
}