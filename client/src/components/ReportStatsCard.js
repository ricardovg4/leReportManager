import { useEffect, useState } from 'react';
import getReportRows from '../apiCalls/reportRows/getReportRows';
import dayjs from 'dayjs';

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');

const ReportStatsCard = (props) => {
  const [currentUserReport, setCurrentUserReport] = useState(
    props.role === 'ct reviewer' ? props.userPermissions[0] : props.user
  );

  const today = dayjs().startOf('day');
  const todayEnd = dayjs().endOf('day');

  const [dataSummary, setDataSummary] = useState(null);

  const [data, setData] = useState(null);

  const calculateSummary = (data) => {
    const result = { source: {}, caseStatus: {} };
    data.forEach((ele) => {
      // save total sources
      if (ele.source in result.source) {
        result.source[ele.source] = result.source[ele.source] + 1;
      } else {
        result.source[ele.source] = 1;
      }

      // save total status
      if (ele.caseStatus in result.caseStatus) {
        result.caseStatus[ele.caseStatus] = result.caseStatus[ele.caseStatus] + 1;
      } else {
        result.caseStatus[ele.caseStatus] = 1;
      }
    });
    return result;
  };

  const resetQuery = {
    date: { startDate: today, endDate: todayEnd }
  };

  const [query, setQuery] = useState(resetQuery);

  const getData = async () => {
    const resultData = await getReportRows(currentUserReport, resetQuery);
    setData(resultData);
    setDataSummary(calculateSummary(resultData));
    // console.log(resultData);
  };

  useEffect(() => {
    const tc = document.getElementById('report-stats');
    tc.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="section pt-4 pb-2" id="report-stats">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Report Stats</p>
          <a className="card-header-icon" onClick={props.togglerender}>
            <span className="icon has-text-danger">
              <FontAwesomeIcon icon={['fas', 'times-circle']} size="1x" />
            </span>
          </a>
        </header>
        <div className="card-content">
          <p>
            {
              <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                {props.user}
              </span>
            }
            <br></br>
            {today ? dayjs().format('MMM DD, YYYY') : null}
            <br></br>
            <br></br>
            {data && dataSummary && dataSummary.source ? (
              <span>
                New cases: {data.length}
                <br></br>
                Amazon: {dataSummary.source.amazon ? dataSummary.source.amazon : 0}
                <br></br>
                Salesforce:{' '}
                {dataSummary.source.salesforce ? dataSummary.source.salesforce : 0}
                <br></br>
                Taks CT:{' '}
                {dataSummary.source['ct request'] ? dataSummary.source['ct request'] : 0}
                <br></br>
                Calls:{' '}
                {dataSummary.source['lost calls'] || dataSummary.source.phone
                  ? (dataSummary.source['lost calls']
                      ? dataSummary.source['lost calls']
                      : 0) + (dataSummary.source.phone ? dataSummary.source.phone : 0)
                  : 0}
                {/* {console.log(dataSummary)} */}
                <br></br>
                Facebook: {dataSummary.source.facebook ? dataSummary.source.facebook : 0}
                <br></br>
                <br></br>
                Solved: {dataSummary.caseStatus.solved}
                <br></br>
                Pending for CT: {dataSummary.caseStatus.pending}
                <br></br>
                Waiting: {dataSummary.caseStatus['waiting for cs answer']}
                <br></br>
                <br></br>
                Salesforce:
                <br></br>
                Pending: -
              </span>
            ) : null}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReportStatsCard;

// Salesforce UK:
// Pending: 6

// Salesforce US:
// Pending: 0
