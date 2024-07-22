import React from "react";
import FetchWeather from "./FetchWeather"

/*
MUSTS:  
    1. city name - done
    2. temperature - done
    3. humidity - done
    4. wind speed - done
COULDS:
    1. weather icon
    2. images for sunny/rainy/cloudy/snowy
    3.refresh every 5mins
*/

export default class Weather extends React.Component {
    render() {
        return (
            <div>
                <div className="Title">What's the weather like?</div>
                <div>
                    <FetchWeather />
                </div>
            </div>
        )
    }
}