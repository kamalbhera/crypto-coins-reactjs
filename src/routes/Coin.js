import axios from 'axios'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import DOMPurify from 'dompurify'

import './Coin.css'

function Coin() {

    const params = useParams()
    const [coin, setCoin] = useState({});

    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`

    useEffect(() => {
        axios.get(url).then((res) => {
            setCoin(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [url])

    return (
        <div>
            <div className="coin-container">
                <div className="content">
                    <h1>#{coin.market_cap_rank} - {coin.name}</h1>
                </div>
                
                <div className="content">

                    <div className="info">
                        <div className="coin-heading">
                            {coin.image ? <img src={coin.image.small} alt="" /> : null}
                            <p>{coin.name}</p>
                            {coin.symbol ? <p>{coin.symbol.toUpperCase()}/EUR</p> : null}
                        </div>
                        <div className="coin-price">
                            {coin.market_data?.current_price ? <h1>{coin.market_data.current_price.eur.toLocaleString()}€</h1> : null}
                        </div>
                    </div>
                </div>

                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>1h</th>
                                <th>24h</th>
                                <th>7j</th>
                                <th>14j</th>
                                <th>30j</th>
                                <th>1 an</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{coin.market_data?.price_change_percentage_1h_in_currency ? <p>{coin.market_data.price_change_percentage_1h_in_currency.eur.toFixed(1)}%</p> : null}</td>
                                <td>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_24h_in_currency.eur.toFixed(1)}%</p> : null}</td>
                                <td>{coin.market_data?.price_change_percentage_7d_in_currency ? <p>{coin.market_data.price_change_percentage_7d_in_currency.eur.toFixed(1)}%</p> : null}</td>
                                <td>{coin.market_data?.price_change_percentage_14d_in_currency ? <p>{coin.market_data.price_change_percentage_14d_in_currency.eur.toFixed(1)}%</p> : null}</td>
                                <td>{coin.market_data?.price_change_percentage_30d_in_currency ? <p>{coin.market_data.price_change_percentage_30d_in_currency.eur.toFixed(1)}%</p> : null}</td>
                                <td>{coin.market_data?.price_change_percentage_1y_in_currency ? <p>{coin.market_data.price_change_percentage_1y_in_currency.eur.toFixed(1)}%</p>  : null}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="content">
                    <div className="stats">

                        <div className="left">
                            <div className="row">
                                <h4>24h Low</h4>
                                {coin.market_data?.low_24h ? <p>{coin.market_data.low_24h.eur.toLocaleString()}€</p> : null}
                            </div>
                            <div className="row">
                                <h4>24h High</h4>
                                {coin.market_data?.high_24h ? <p>{coin.market_data.high_24h.eur.toLocaleString()}€</p> : null}
                            </div>
                        </div>

                        <div className="right">
                            <div className="row">
                                <h4>Market Cap</h4>
                                {coin.market_data?.market_cap ? <p>{coin.market_data.market_cap.eur.toLocaleString()}€</p> : null}
                            </div>
                            <div className="row">
                                <h4>En circulation</h4>
                                {coin.market_data ? <p>{coin.market_data.circulating_supply}</p> : null}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="about">
                        <h3>A propos</h3>
                        <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(coin.description ? coin.description.fr : '')
                        }}>
                        </p>   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Coin