import Head from 'next/head';
import Searchbox from '../components/Searchbox';
import FamousPlaces from '../components/FamousPlaces';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App</title>
      </Head>

      <div className="home">
        <div className="container">
          <h1>Weather App - Created with NextJS</h1>
          <Searchbox placeholder="Search for a city..."/>
          <FamousPlaces />
        </div>
      </div>
    </div>
  )
}
