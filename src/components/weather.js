import React from "react";

const multiply = (val,multiplier) => val * multiplier

class Weather extends React.Component {
  state = {
    isLoading: true,
    city: null
  };

  async componentDidMount() {
    const url =
      "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=122591ecd157814b65c4bb7e244974f0";
    const response = await fetch(url);

    const data = await response.json();
    console.log(data.main);
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
   
    const temp = data.main.temp
    const multipliedTemp = multiply(temp, 2)
    this.setState({ city: data.main, isLoading: false, temp, multipliedTemp });


   
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
        <div>{temp}</div>
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
