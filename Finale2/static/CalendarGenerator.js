function CalendarGenerator(configs) {

    let getDaysInMonth = function (month, year) {
        let list = [];

        let day = moment(new Date(year, month, 1)).startOf('isoWeek');
        let numberOfDays = 7 * 6;
        let count = 0;
        while (count < numberOfDays) {
            list.push(day);
            day = day.clone().add(1, 'days');
            count++;
        }

        return list;
    };

    let getMonthName = function(month) {
        return moment(new Date(0,month, 1)).format('MMMM');
    };

    let getWeekdayName = function(moment) {
        return moment.format('dddd');
    };

    let getNumberOfDaysInMonth = function (month, year) {
        return moment(new Date(year, month + 1, 0)).daysInMonth();
    };

    let isLeapYear = function (year) {
        return year % 400 == 0 || (year % 100 != 0 && year % 4 == 0);
    };

    let getDateString = function (moment) {
        return moment.format("Do MMMM YYYY");
    };

    let instance = {
        getDaysInMonth,
        getDateString,
        getWeekdayName,
        getMonthName,
    };
    return instance;
}