import { useEffect, useState } from 'react';
import getSkuStatus from '../apiCalls/skuStatus/getSkuStatus';

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');

const SkuStatusCard = (props) => {
    const [sku, setSku] = useState('');
    const [skuSearchResult, setSkuSearchResult] = useState(null);

    const search = async (e) => {
        e.preventDefault();
        const skuNumber = String(sku).trim();
        const result = await getSkuStatus(skuNumber);
        if (result) {
            console.log(result);
            setSkuSearchResult(result);
            return true;
        }
        console.log('failed to retrieve skustatus');
        setSkuSearchResult(false);
    };

    useEffect(() => {
        const tc = document.getElementById('sku-status');
        tc.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <section className="section pt-4 pb-2" id="sku-status">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">Check SKU Status</p>
                    <a className="card-header-icon" onClick={props.togglerender}>
                        <span className="icon has-text-danger">
                            <FontAwesomeIcon icon={['fas', 'times-circle']} size="1x" />
                        </span>
                    </a>
                </header>
                <div className="card-content">
                    <form onSubmit={search}>
                        <div className="field has-addons">
                            <div className="control" style={{ width: '40%' }}>
                                <input
                                    placeholder="Enter SKU"
                                    className="input"
                                    autoFocus
                                    value={sku}
                                    onChange={(e) => {
                                        setSku(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="control">
                                <button className="button is-link">Search</button>
                            </div>
                        </div>
                    </form>

                    {!skuSearchResult ? null : (
                        <table className="table">
                            <thead>
                                <tr>
                                    {Object.keys(skuSearchResult[0]).map((skuHeader) => {
                                        return (
                                            <th
                                                key={skuHeader + 1}
                                                style={{ textTransform: 'capitalize' }}
                                            >
                                                {skuHeader}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {skuSearchResult.map((skuObject) => {
                                    return (
                                        <tr key={skuObject.warehouse + skuObject.sku}>
                                            {Object.values(skuObject).map((skuResult) => {
                                                return (
                                                    <td key={skuResult + 1}>
                                                        {skuResult}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                    {skuSearchResult === false ? (
                        <p className="help is-danger">SKU not found on database...</p>
                    ) : null}
                </div>
            </div>
        </section>
    );
};
export default SkuStatusCard;
