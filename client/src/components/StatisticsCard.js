import dayjs from 'dayjs';
import getReportRows from '../apiCalls/reportRows/getReportRows';
import BulmaCalendar from '../components/BulmaCalendar';
import NivoLine from '../components/NivoLine';
import Loading from '../pages/Loading/Loading';
import { useEffect, useState } from 'react';

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');

const StatisticsCard = (props) => {
    const [currentUserReport, setCurrentUserReport] = useState(
        props.role === 'ct reviewer' ? props.userPermissions[0] : props.user
    );
    const [data, setData] = useState(null);
    const [timezone, setTimezone] = useState(null);
    const [loading, setLoading] = useState(false);
    const today = dayjs().endOf('day');
    const lastDays = dayjs(today.subtract(7, 'day')).startOf('day');
    const resetQuery = {
        date: {
            startDate: lastDays,
            endDate: today
        },
        count: true
    };

    const [query, setQuery] = useState(resetQuery);

    const setDateFilters = (startDate, endDate) => {
        // reset pagination if dates are null
        if (startDate === null && endDate === null) {
            setQuery((prev) => {
                return { ...prev, date: resetQuery.date };
            });
            return false;
        }
        // set filters with new data
        setQuery((prev) => {
            return { ...prev, date: { startDate, endDate } };
        });
    };

    const getData = async () => {
        setLoading(true);
        const resultData = await getReportRows(currentUserReport, query);
        setLoading(false);

        console.log(resultData);

        if (resultData && resultData[0].result.length > 0) {
            // console.log('res');
            const sortedData = resultData[0].result.sort(function (a, b) {
                return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
            });
            const returnedData = sortedData.map((ele) => {
                return {
                    x: dayjs(new Date(ele.date)).format('DD-MMM'),
                    y: ele.count
                };
            });
            setData([
                {
                    id: resultData[0].username,
                    color: 'hsl(290, 70%, 50%)',
                    data: returnedData
                }
            ]);
        } else {
            setData([
                {
                    id: resultData[0].username,
                    color: 'hsl(290, 70%, 50%)',
                    data: [{ x: 0, y: 0 }]
                }
            ]);
        }
    };
    const handleTimezone = (tz) => {
        setTimezone(tz);
    };

    useEffect(() => {
        const tc = document.getElementById('statistics-card');
        tc.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        getData();
    }, [currentUserReport, query]);

    return (
        <section className="section pt-4 pb-2" id="statistics-card">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">Statistics</p>
                    <a className="card-header-icon" onClick={props.togglerender}>
                        <span className="icon has-text-danger">
                            <FontAwesomeIcon icon={['fas', 'times-circle']} size="1x" />
                        </span>
                    </a>
                </header>
                <div className="card-content">
                    <div className="level mb-0">
                        <div className="level-left">
                            {props.role === 'ct reviewer' ? (
                                <div className="level-item">
                                    <p className="has-text-weight-semibold mr-2">
                                        CS Representative
                                    </p>
                                    <div className="field ">
                                        <div className="control">
                                            <div className="select">
                                                <select
                                                    value={currentUserReport}
                                                    onChange={(e) => {
                                                        setCurrentUserReport(
                                                            e.target.value
                                                        );
                                                    }}
                                                >
                                                    {props.userPermissions.map((user) => {
                                                        return (
                                                            <option
                                                                value={user}
                                                                key={user}
                                                            >
                                                                {user}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            <div className="level-item">
                                <BulmaCalendar
                                    setdatefilters={setDateFilters}
                                    handletimezone={handleTimezone}
                                />
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div style={{ height: '500px' }}>
                            <Loading fullheight={false} />
                        </div>
                    ) : !data ? null : (
                        <div style={{ height: '500px' }}>
                            <NivoLine
                                data={data}
                                axisBottomLegend="Date"
                                axisLeftLegend="Cases"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
export default StatisticsCard;
