import { FaLocationDot } from "react-icons/fa6";
import "./App.css";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import Haze from "./images/Haze.png";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [responseData, setResponseData] = useState({});
  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  const api_endpoint = "https://api.openweathermap.org/data/2.5/weather?";

  const api_key = "57fdbf3ef0ebec42def8719da7dcdee5";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    let finalApiEndpoint = `${api_endpoint}lat=${latitude}&lon=${longitude}&appid=${api_key}`;
    const fetchLocation = async () => {
      const responseLocation = await fetch(finalApiEndpoint);
      const locationData = await responseLocation.json();
      setResponseData(locationData);
      console.log(responseData);
    };
    fetchLocation();
  }, [latitude, longitude]);

  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Delhi");

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=57fdbf3ef0ebec42def8719da7dcdee5`
      );
      const data = await response.json();
      setCity(data);
      console.log(city)
    };

    fetchApi();
  }, [search]);

  const handleChange = (e) => {
    let input = e.target.value;
    setSearch(input);
  };

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, `dddd, mmmm dS, h:MM TT`);
  };

  return (
    <>
      <div className="main mx-auto p-5 md:w-1/2">
        <div className="addCity my-3 flex justify-center">
          <input
            type="text"
            value={search}
            placeholder="search..."
            className="rounded-2xl search-input"
            onChange={handleChange}
          />
        </div>
        <p className="text-center text-2xl pt-4 text-white ">
              {renderDate()}
            </p>
        {!city ? (
          <p
            className="text-center text-2xl
      py-5"
          >
            No Data Found
          </p>
        ) : 
          <div>
            <div className="img">
              <img src={Haze} alt="" />
            </div>
            <div className="info ">
              <div>
                {city.main ? (
                  <div>
                    <h1 className="temp text-center m-3 text-4xl">
                      {city.main.temp}°C{" "}
                      {city.weather ? (
                        <p className="text-xl">{city.weather[0].main}</p>
                      ) : (
                        ""
                      )}
                    </h1>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex">
                <FaLocationDot className="text-4xl" />
                <h2 className="location text-4xl font-bold ">
                  {search} ,{city.sys ? <span>{city.sys.country}</span> : ""}
                </h2>
              </div>

              <div className="extra-info">
                {city.main ? (
                  <div>
                    <h3 className="text-center">
                      Min : {city.main.temp_min} °C | Max : {city.main.temp_max}{" "}
                      °C | Humidity : {city.main.humidity}
                    </h3>
                  </div>
                ) : (
                  ""
                )}
                {city.wind ? (
                  <h3 className=" mt-2 text-center">
                    Wind speed : {city.wind.speed}
                  </h3>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        }
        {responseData.name ? (
          <p className="text-center text-2xl pt-4">
            Current location:{responseData.name}
          </p>
        ) : (
          <p className="text-center text-2xl pt-4">
            Current Location: Unable to fetch
          </p>
        )}
      </div>
    </>
  );
}

export default App;
