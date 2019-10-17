import React from "react";

const multiply = (val, multiplier) => val * multiplier
const apikey = "122591ecd157814b65c4bb7e244974f0";
class Weather extends React.Component {
  state = {
    isLoading: true,
    city: null,
    country: null,
    value: '',
    weather: null
  };


  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    const ctr = e.target.elements.country.value;
    e.preventDefault();
    const url =
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value},${ctr}&appid=122591ecd157814b65c4bb7e244974f0`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('the response is ', data)

        data.main.temp = Math.round(data.main.temp - 273.15);
        data.main.temp_min = Math.round(data.main.temp_min - 273.15)
        data.main.temp_max = Math.round(data.main.temp_max - 273.15)

        this.setState({ city: data.main, country: ctr, weather: data.weather[0], isLoading: false });

      }).catch(console.error)


    //e.preventDefault();
  }

  async componentDidMount() {
    
    //const apikey= "122591ecd157814b65c4bb7e244974f0";
    const url =
      `http://api.openweathermap.org/data/2.5/weather?q=Toronto,Canada&appid=${apikey}`;
    const response = await fetch(url);

    const data = await response.json();

    //console.log(data.main);
    /*
    assigning properties and values in an object does not when accessing a property;
    
    bad:
        {
            city.temp // error,
            city
        }
    
    good:
        let temp = city.temp
        temp = doTempConversion(temp)

        {
            city,
            temp
        }
    */

    data.main.temp = Math.round(data.main.temp - 273.15)
    data.main.temp_min = Math.round(data.main.temp_min - 273.15)
    data.main.temp_max = Math.round(data.main.temp_max - 273.15)
    //const multipliedTemp = multiply(temp, 2)
    console.log(data.weather[0].icon);
    this.setState({ city: data.main, weather: data.weather[0], isLoading: false });
    


  }



  render() {
    if (this.state.isLoading) {
      return <div>loading...</div>;
    }

    // destructure
    const { city } = this.state;
    const { temp, pressure, humidity, temp_min, temp_max } = city;
    const { weather } = this.state;
    const { id, main, description, icon} =  weather;
    if (!this.state.city) {
      return <div> didn't get it </div>;
    }
    return (
      <div style={{ margin: "10px" }}>
        <form onSubmit={this.handleSubmit}>
          <label> City: <input type="text" name="city" value={this.state.value} onChange={this.handleChange} className="srch"/> </label>
          <label><input type ="text" name="country" placeholder="Country..."/></label>
          <input type="submit" value="Search" />
        </form>
        <div><p>Temperature in {this.state.value} : {temp} Celsius</p></div>
        <div><img src={"http://openweathermap.org/img/w/"  + icon  + ".png"} alt="Weather"></img></div>
        <div><p>Humidity: {humidity}</p></div>
        <div><p>Minimum temperature: {temp_min}</p></div>
        <div><p>Maximum temperature: {temp_max}</p></div>
        <div><p>Description: {description}</p></div>
        {/* another way to peak at objects cleanly during dev */}
        {/*<div><pre className="test">{JSON.stringify(this.state, null, "\t")}</pre></div>*/}
      </div>
    );
  }
}

export default Weather;
