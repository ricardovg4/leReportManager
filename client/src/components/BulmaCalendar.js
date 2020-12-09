import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar';
import { useEffect } from 'react';

const BulmaCalendar = (props) => {
    const initializeCalendars = () => {
        // // Initialize all input of date type.
        const calendars = bulmaCalendar.attach('[type="date"]', { isRange: true });

        // // Loop on each calendar initialized
        calendars.forEach((calendar) => {
            // Add listener to select event
            calendar.on('select', (selectEvent) => {
                const date = calendar.date;
                date.start.setHours(0, 0, 0, 0);
                date.end.setHours(0, 0, 0, 0);
                // normalize to ISO string so can compare with sort
                const startDate = date.start.toISOString();
                const endDate = date.end.toISOString();
                // callback from parent to set state on date filter
                props.setdatefilters(startDate, endDate);
            });
        });
    };

    useEffect(() => {
        initializeCalendars();
    }, []);

    return <input type="date" />;
};

export default BulmaCalendar;
