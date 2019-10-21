import React from "react";

const multiply = (val, multiplier) => val * multiplier
const apikey = "122591ecd157814b65c4bb7e244974f0";
class Weather extends React.Component {
  state = {
    isLoading: true,
    temp: 0,
    city: null,
    country: null,
    humidity: null,
    description: null,
    icon: null,
    min: 0,
    max: 0,
    value: ''
  };


  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    const ctr = e.target.elements.country.value;
    e.preventDefault();
    const url =
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value},${ctr}&appid=${apikey}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        data.main.temp = Math.round(data.main.temp - 273.15);
        data.main.temp_min = Math.round(data.main.temp_min - 273.15)
        data.main.temp_max = Math.round(data.main.temp_max - 273.15)

        this.setState({temp: data.main.temp, city: data.name, country: ctr, humidity: data.main.humidity,  description: data.weather[0].description, icon: data.weather[0].icon, min: data.main.temp_min,max: data.main.temp_max, isLoading: false });

      }).catch(console.error)


    //e.preventDefault();
  }

  async componentDidMount() {
    
    //const apikey= "122591ecd157814b65c4bb7e244974f0";
    const url =
      `http://api.openweathermap.org/data/2.5/weather?q=Toronto,Canada&appid=${apikey}`;
    const response = await fetch(url);

    const data = await response.json();

    // console.log(data)

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
    // console.log(data.main.temp);
    this.setState({ 
      isLoading: false, 
      temp: data.main.temp, 
      city: "Toronto", 
      country: "Canada", 
      humidity: data.main.humidity, 
      description: data.weather[0].description, 
      icon: data.weather[0].icon, 
      min: data.main.temp_min,
      max: data.main.temp_max 
       });
    
  }



  render() {
    const { isLoading, temp, city, country, humidity, description, icon, min, max } = this.state;

    // const { temp, city, country, humidity, description, icon, min, max } = Fullweather;
    if (isLoading && isLoading) {
      return <div>loading...</div>;
    }
    console.log(icon);
    return(
      <div style={{ margin: "10px" }}>
        <form onSubmit={this.handleSubmit}>
          <label><input type="text" name="city" placeholder="City..."value={this.state.value} onChange={this.handleChange} /> </label>
          <label><input type ="text" name="country" placeholder="Country..."/></label>
          <input type="submit" value="Search" />
        </form>
        <div><p className="weather__key">Temperature in {this.state.value} : <span className="weather__value">{temp && temp} Celsius</span></p></div>
        <div><p>Country: <span className="weather__value">{country}</span></p></div>
        <div><img src={"http://openweathermap.org/img/w/"  + icon  + ".png"} alt="Weather"></img></div> 
        
        <div><p>Humidity: <span className="weather__value">{humidity}</span></p></div>
        <div><p>Minimum temperature: <span className="weather__value">{min}</span></p></div>
        <div><p>Maximum temperature: <span className="weather__value">{max}</span></p></div>
        <div><p>Conditions: <span className="weather__value">{description}</span></p></div>
        {/* another way to peak at objects cleanly during dev */}
        {/*<div><pre className="test">{JSON.stringify(this.state, null, "\t")}</pre></div>*/}
      </div>
    );
  }
}

export default Weather;
