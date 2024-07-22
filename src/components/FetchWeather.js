import React, { Component } from "react";

export default class FetchWeather extends Component {
    state = {
        city: "",
        weatherData: null,
        cityError: "",
        weatherVisible: false
    };

    async fetchWeatherData(city) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1dba51a51555e53ccca30ff74e753575&units=metric`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            this.setState({ weatherData: data, cityError: "" });
        } catch {
            this.setState({ cityError: "Can't find city" });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            this.fetchWeatherData(this.state.city);
            this.setState({ weatherVisible: true });
        }
    };

    validate = () => {
        let cityError = "";
        const { city } = this.state;

        if (/\d/.test(city)) {
            cityError = "City must not include numbers";
        }

        if (cityError) {
            this.setState({ cityError });
            return false;
        }
        return true;
    };

    render() {
        return (
            <div>
                <div className="searchForm">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            name="city"
                            placeholder="City name"
                            value={this.state.city}
                            onChange={this.handleChange}
                        />
                        {this.state.cityError && (
                            <div style={{ fontSize: 12, color: "red" }}>{this.state.cityError}</div>
                        )}
                    </form>
                </div>
                {this.state.weatherVisible && this.state.weatherData && (
                    <div>
                        <div className="cityData">{this.state.city}</div>
                        <div className="tempText">Temperature</div>
                        <div className="tempData">{this.state.weatherData.main.temp}°C</div>
                        <div className="humText">Humidity</div>
                        <div className="humData">{this.state.weatherData.main.humidity}%</div>
                        <div className="windText">Wind speed</div>
                        <div className="windData">{this.state.weatherData.wind.speed} KPH</div>
                    </div>
                )}
            </div>
        );
    }
}
