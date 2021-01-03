import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

// Dayjs initialization for plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const BulmaCalendar = (props) => {
    const [timezone, setTimezone] = useState('Etc/UTC');
    const [date, setDate] = useState({ startDate: null, endDate: null });

    const getUtcOnTimezoneDate = (start, end) => {
        const mStart = dayjs.tz(start, timezone);
        const startDate = mStart.clone().startOf('day').utc().toISOString();
        const mEnd = dayjs.tz(end, timezone);
        const endDate = mEnd.clone().endOf('day').utc().toISOString();
        // console.log(startDate, timezone);
        // setDate({ startDate, endDate });
        return { startDate, endDate };
    };

    const initializeCalendars = () => {
        // // Initialize all input of date type.
        const calendars = bulmaCalendar.attach('[type="date"]', {
            isRange: true,
            labelFrom: ' Start date',
            labelTo: ' End date',
            color: 'info'
        });

        // // Loop on each calendar initialized
        calendars.forEach((calendar) => {
            // Add listener to select event
            calendar.on('select', (selectEvent) => {
                const date = calendar.date;
                const startDate = dayjs(date.start).format('YYYY-MM-DD');
                const endDate = dayjs(date.end).format('YYYY-MM-DD');
                // getUtcOnTimezoneDate(startDate, endDate);
                setDate({ startDate, endDate });
            });
        });
        const clearButton = document.getElementsByClassName(
            'datetimepicker-clear-button'
        );
        clearButton[0].addEventListener('click', () => {
            props.setdatefilters(null, null);
        });
        // change color of today's button
        let today = document.getElementsByClassName('datetimepicker-footer')[0]
            .children[1];
        today.classList.remove('has-text-warning');
        today.classList.add('has-text-info');
        // clear button on footer
        let clear = document.getElementsByClassName('datetimepicker-footer')[0]
            .children[2];
        clear.addEventListener('click', (e) => {
            props.setdatefilters(null, null);
        });

        // Add border radius to bulma calendar input
        const inputWrapper = document.getElementsByClassName(
            'datetimepicker-dummy-wrapper'
        )[0];
        inputWrapper.style.borderRadius = '4px';
    };

    useEffect(() => {
        initializeCalendars();
    }, []);

    useEffect(() => {
        props.handletimezone(timezone);
    }, [timezone]);

    useEffect(() => {
        if (timezone && date.startDate && date.endDate) {
            const tzUtcDate = getUtcOnTimezoneDate(date.startDate, date.endDate);
            props.setdatefilters(tzUtcDate.startDate, tzUtcDate.endDate);
        }
    }, [timezone, date]);

    return (
        <div className="field is-horizontal">
            <div className="control">
                <input type="date" className="input" />
            </div>
            <div className="control">
                <span className="select">
                    <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                    >
                        <option value="America/New_York">America/New York</option>
                        <option value="America/La_Paz">America/La Paz</option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="Europe/Berlin">Europe/Berlin</option>
                        <option value="Asia/Shanghai">Asia/Shanghai</option>
                        <option value="Etc/UTC">Etc/UTC</option>
                    </select>
                </span>
            </div>
        </div>
    );
};

export default BulmaCalendar;
