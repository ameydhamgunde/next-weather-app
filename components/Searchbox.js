import React from 'react';
import cities from '../lib/city.list.json';
import Link from 'next/link';
import Router from 'next/router';


export default function Searchbox({placeholder}) {
    const [query, setQuery] = React.useState("");
    const [results, setresults] = React.useState([]);

    React.useEffect(() => {
        const clearQuery = () => setQuery("");

        Router.events.on("routeChangeComplete", clearQuery);

        return () => {
            Router.events.off("routeChangeComplete", clearQuery);
        }
    }, [])

    const onChange = (e) => {
        const {value} = e.target;

        setQuery(value);

        let matchingcities = [];

        if(value.length > 3) {
            for (let city of cities) {
                if (matchingcities.length >=5) {
                    break;

                }

                const match = city.name.toLowerCase().startsWith(value.toLowerCase());

                if (match) {
                    const citydata = {
                        ...city,
                        slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`
                    }
                    matchingcities.push(citydata);

                }
            }
        }
        console.log(matchingcities);

        return setresults(matchingcities);
    }


    return (
        <div className="search">
            <input type="text" value = {query} onChange={onChange} placeholder={placeholder}/>

            {query.length > 3 && (
                <ul>
                    {results.length > 0 ? (
                        results.map((city) => (
                            <li key={city.slug}>
                                <Link href={`/location/${city.slug}`}>
                                    <a>
                                        {city.name}
                                        {city.state ? `, ${city.state}`: ''} {" "}
                                        <span>({city.country})</span>
                                    </a>
                                </Link>
                            </li>
                        ))
                    ): (
                        <li className="search__no-results">No Results</li>
                    )}
                </ul>
            )}
        </div>
    )
}
