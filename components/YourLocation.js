import React from 'react';
import cities from '../lib/city.list.json';
import TodaysWeather from './TodaysWeather';

const getInfo = async (city) => {
    console.log(city);

    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=65c8730921cae031c54a5640d4dc7a39&units=metric&exclude=minutely`);

    const data = res.json();

    return data;
}

export default function YourLocation() {

    const [city, setCity] = React.useState();
    const [data, setData] = React.useState();

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            for (const city of cities) {
                if ((Math.abs(city.coord.lon - position.coords.longitude) <= 0.02) && 
                        (Math.abs(city.coord.lat - position.coords.latitude) <= 0.02)) {
                    setCity(city);

                    setData(getInfo(city));
                    
                    break;
                }
            }

            
        });
      }, []);
    
      console.log(data);

    return (
        <div>
            jkl
        </div>
    )
}
