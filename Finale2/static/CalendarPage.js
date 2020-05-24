"use strict"

function CalendarPage(configs) {
    let daySelector = '.day';
    let dayThisMonthSelector = '.day:not(.day__other-month)'
    let daySelectedSelector = '.day__selected';
    let dayHasItemSelector = '.day__has-item';
    let dayOtherMonthSelector = '.day__other-month';

    let dayOtherMonthClass = 'day__other-month';
    let dayItemPrevMonthClass = 'day__prev-month';
    let dayItemNextMonthClass = 'day__next-month';
    let daySelectedClass = 'day__selected';
    let dayHasItemClass = 'day__has-item';

    let monthContainerSelector = '.month--container';
    let todoContainerSelector = '.'
    let generator = new CalendarGenerator();
    let eventBus = new EventBus();

    let thisMoment;

    let createDayItem = function (day, month, other, value) {
        return `<div value="${value}" class="day ${month} ${other}"><span>${day}</span></div>`;
    }

    let changeTodoListHeading = function () {
        $('.todo-day-of-week').html(generator.getWeekdayName(thisMoment));
        $('.todo-date').html(generator.getDateString(thisMoment));
    }

    let changeSelectedDate = function (dayValue) {
        $(daySelector).removeClass(daySelectedClass);
        $(`[value="${dayValue}"]`).addClass(daySelectedClass);
        //DISPATCH SELECT DAY
    }

    let buildCalendar = function () {
        //change month heading
        let $container = $('.month');
        $container.find('.month--name').html(generator.getMonthName(thisMoment.month()) + ' ' + thisMoment.year());

        //set up month calendar
        $('.day').remove();
        var $month = $('.month--container');
        let days = generator.getDaysInMonth(thisMoment.month(), thisMoment.year());
        days.forEach(function (el, i) {
            let monthClass = '';
            let otherMonthClass = '';
            if (el.month() < thisMoment.month()) {
                monthClass = dayItemPrevMonthClass;
                otherMonthClass = dayOtherMonthClass;
            } else if (el.month() > thisMoment.month()) {
                monthClass = dayItemNextMonthClass;
                otherMonthClass = dayOtherMonthClass;
            }
            let string = generator.getDateString(el);
            $month.append(createDayItem(el.date(), monthClass, otherMonthClass, string));
        });

        //change to do list heading
        changeTodoListHeading();
        changeSelectedDate(generator.getDateString(thisMoment));
    }

    let init = function () {
        thisMoment = moment(new Date());
        buildCalendar();
        changeSelectedDate(generator.getDateString(thisMoment));
    }();

    let EVENT_NAMES = {

    };

    $(monthContainerSelector).on('click', dayThisMonthSelector, function (e) {
        let $day = $(this);
        thisMoment.date(parseInt($day.find('span').html()));
        changeTodoListHeading();
        let val = $day.attr('value');
        changeSelectedDate(val);
    });

    $(monthContainerSelector).on('click', dayOtherMonthSelector, function (e) {
        let $day = $(this);
        let val = $day.attr('value');
        if ($day.hasClass(dayItemPrevMonthClass)) {
            thisMoment.month(thisMoment.month()-1);
        } else {
            thisMoment.month(thisMoment.month()+1);
        }
        thisMoment.date(parseInt($day.find('span').html()));
        buildCalendar();
        changeTodoListHeading();
    });

    const drake = dragula([$('.todo-container')[0]], {
        removeOnSpill: true,
    });

    drake.on('remove', function (el, container, source) {
        //DISPATCH REMOVE TODO ITEM
    });

    $('.arrow-prev').on('click', function (e) {
        thisMoment.month(thisMoment.month() - 1);
        buildCalendar();
        console.log(generator.getDateString(thisMoment))
        changeSelectedDate(generator.getDateString(thisMoment));
    });

    $('.arrow-next').on('click', function (e) {
        thisMoment.month(thisMoment.month() + 1);
        buildCalendar();
        changeSelectedDate(generator.getDateString(thisMoment));
    });


    let instance = {

    };

    return instance;
}