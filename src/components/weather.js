import React from "react";

const multiply = (val, multiplier) => val * multiplier

class Weather extends React.Component {
  state = {
    isLoading: true,
    city: null,
    value: ''
  };


  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const url =
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=122591ecd157814b65c4bb7e244974f0`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('the response is ', data)

        data.main.temp = data.main.temp - 273.15

        this.setState({ city: data.main, isLoading: false });

      }).catch(console.error)


    //e.preventDefault();
  }

  async componentDidMount() {
    const url =
      "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=122591ecd157814b65c4bb7e244974f0";
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

    data.main.temp = data.main.temp - 273.15
    //const multipliedTemp = multiply(temp, 2)
    this.setState({ city: data.main, isLoading: false });



  }



  render() {
    if (this.state.isLoading) {
      return <div>loading...</div>;
    }

    // destructure
    const { city } = this.state;
    const { temp, pressure, humidity, temp_min, temp_max } = city;
    if (!this.state.city) {
      return <div> didn't get it </div>;
    }
    return (
      <div style={{ margin: "10px" }}>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Search" />
        </form>
        <div><p>Temperature in {this.state.value} : {temp}</p></div>
        <div>{pressure}</div>
        <div>{humidity}</div>
        <div>{temp_min}</div>
        <div>{temp_max}</div>
        {/* another way to peak at objects cleanly during dev */}
        <pre>{JSON.stringify(this.state, null, "\t")}</pre>
      </div>
    );
  }
}

export default Weather;
