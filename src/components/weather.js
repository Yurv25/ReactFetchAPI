import React from "react";

class Weather extends React.Component {

    state = {
        isLoading : true,
        city : []
    };
    
    async componentDidMount() {
        const url = "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=122591ecd157814b65c4bb7e244974f0";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ city: data.main, isLoading: false});
    }

    render() {
        if (this.state.isLoading){
            return <div>loading...</div>
        }

        if (!this.state.person){
            return <div> didn't get a person </div>
        }
        return(
            <div>
                <div>{this.state.city.main.temp}</div>
            </div>
        )
    }

}

export default Weather;



