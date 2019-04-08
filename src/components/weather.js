import React from "react";

class Weather extends React.Component {

    state = {
        isLoading : true,
        city : null
    };
    
    async componentDidMount() {
        const url = "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=122591ecd157814b65c4bb7e244974f0";
        const response = await fetch(url);
        
        const data = await response.json();
        console.log(data.main);
        this.setState({ city: data.main, isLoading: false});
    }

    render() {
        if (this.state.isLoading){
            return <div>loading...</div>
        }

        if (!this.state.city){
            return <div> didn't get it </div>
        }
        return(
            <div>
                <div>{this.state.city.temp}</div>
                <div>{this.state.city.pressure}</div>
                <div>{this.state.city.humidity}</div>
                <div>{this.state.city.temp_min}</div>
                <div>{this.state.city.temp_max}</div>
            </div>
        );
    }

}

export default Weather;



