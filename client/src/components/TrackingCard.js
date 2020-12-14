import { useState } from 'react';

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');

const TrackingCard = (props) => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [carrier, setCarrier] = useState('');

    const track = (e) => {
        e.preventDefault();
        const usps = 'https://tools.usps.com/go/TrackConfirmAction?tLabels=';
        // https://tools.usps.com/go/TrackConfirmAction?tLabels=9361289725009343788332%2C9534616312770281686483%2C
        const ups = 'https://www.ups.com/track?loc=en_US&tracknum=';
        // https://www.ups.com/track?loc=en_US&tracknum=1Z70E25W0317034527%250D%250A1Z70E25W0317035071&requester=WT/tracksummary
        if (carrier === 'usps' && trackingNumber) {
            window.open(usps + trackingNumber, '_blank');
        }
        if (carrier === 'ups' && trackingNumber) {
            window.open(ups + trackingNumber, '_blank');
        }
    };

    return (
        <section className="section pt-4 pb-2">
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
                            <input
                                type="text"
                                placeholder="Enter tracking number"
                                className="input"
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
                </div>
            </div>
        </section>
    );
};
export default TrackingCard;
