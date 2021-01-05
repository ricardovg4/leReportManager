import { useEffect, useState } from 'react';

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');

const TrackingCard = (props) => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [carrier, setCarrier] = useState('UPS');

    const track = (e) => {
        e.preventDefault();
        const trackingNumbersList = handleTrackingNumber(trackingNumber);
        const usps = 'https://tools.usps.com/go/TrackConfirmAction?tLabels=';
        // https://tools.usps.com/go/TrackConfirmAction?tLabels=9361289725009343788332%2C9534616312770281686483%2C
        const ups = 'https://www.ups.com/track?loc=en_US&tracknum=';
        // https://www.ups.com/track?loc=en_US&tracknum=1Z70E25W0317034527%250D%250A1Z70E25W0317035071&requester=WT/tracksummary
        if (carrier === 'usps' && trackingNumber) {
            let numbers = '';
            trackingNumbersList.forEach((e) => {
                numbers += e + '%2C';
            });
            window.open(usps + numbers, '_blank');
        }
        if (carrier === 'ups' && trackingNumber) {
            let numbers = '';
            trackingNumbersList.forEach((e) => {
                numbers += e + '%250D%250A';
            });
            window.open(ups + numbers, '_blank');
        }
    };

    const handleTrackingNumber = (input) => {
        const trackingNumberList = input
            .split('\n')
            .filter((e) => {
                if (e) return e;
            })
            .map((e) => e.trim());
        return trackingNumberList;
    };

    useEffect(() => {
        const tc = document.getElementById('tracking-card');
        tc.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <section className="section pt-4 pb-2" id="tracking-card">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">Tracking</p>
                    <a className="card-header-icon" onClick={props.togglerender}>
                        <span className="icon has-text-danger">
                            <FontAwesomeIcon icon={['fas', 'times-circle']} size="1x" />
                        </span>
                    </a>
                </header>
                <div className="card-content">
                    <div className="field has-addons">
                        <div className="control" style={{ width: '40%' }}>
                            <textarea
                                rows="2"
                                placeholder="Enter tracking numbers"
                                autoFocus
                                className="textarea"
                                value={trackingNumber}
                                onChange={(e) => {
                                    setTrackingNumber(e.target.value);
                                }}
                            />
                        </div>
                        <div className="control">
                            <div className="select">
                                <select
                                    value={carrier}
                                    onChange={(e) => {
                                        setCarrier(e.target.value);
                                    }}
                                >
                                    <option value="ups">UPS</option>
                                    <option value="usps">USPS</option>
                                </select>
                            </div>
                        </div>
                        <div className="control">
                            <div className="button is-link" onClick={track}>
                                Search
                            </div>
                        </div>
                    </div>
                    <p className="help is-info">
                        Enter the tracking numbers, one per line.
                    </p>
                </div>
            </div>
        </section>
    );
};
export default TrackingCard;
