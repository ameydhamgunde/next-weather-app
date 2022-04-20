import React from 'react';
import cities from '../lib/city.list.json';
import TodaysWeather from './TodaysWeather';
import Link from 'next/link';

const getInfo = async (city) => {
    console.log(city);

    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&units=metric&exclude=minutely`);

    const data = res.json();

    return data;
}

export default function YourLocation() {

    const [city, setCity] = React.useState();
    const [data, setData] = React.useState();

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            for (const city of cities) {
                if ((Math.abs(city.coord.lon - position.coords.longitude) <= 0.02) && 
                        (Math.abs(city.coord.lat - position.coords.latitude) <= 0.02)) {
                    setCity(city);

                    setData(await getInfo(city));
                    
                    break;
                }
            }

            
        });
      }, []);
    
    return (
        <div>
            {(data != undefined) && (
                <Link href={`/location/${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`}>
                    <a className="yourLocation">
                        <div>
                            <TodaysWeather city={city} weather={data.daily[0]} timezone={data.timezone} />
                        </div>
                    </a>
                </Link>
            )}
        </div>
    )
}
