import { useState } from "react";

import AreaInput from "./components/AreaInput";
import SelectCityModal from "./components/SelectCityModal";
import CurrentWeatherCard from "./components/CurrentWeatherCard";

import {
  Flex,
  Text,
  Box,
  IconButton,
  Link,
  Heading,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";

import { ExternalLinkIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";

import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";

import "./App.css";

export default function App() {
  // useState
  const [searchInput, setSearchInput] = useState("");
  const [cityProfiles, setCityProfiles] = useState([]);
  const [cityData, setCityData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [forecast, setForecast] = useState([]);
  const [forecastDays, setForecastDays] = useState([]);

  // useDisclosure
  const {
    isOpen: isOpenCitySelect,
    onOpen: onOpenCitySelect,
    onClose: onCloseCitySelect,
  } = useDisclosure();
  const {
    isOpen: isOpenForecast,
    onOpen: onOpenForecast,
    onClose: onCloseForecast,
  } = useDisclosure();

  // useColorMode
  const { colorMode, toggleColorMode } = useColorMode();

  // useColorModeValue
  const normalTextColour = useColorModeValue("gray.800", "gray.50");
  const imageBrightness = useColorModeValue(
    "brightness(85%)",
    "brightness(100%)"
  );

  // useMediaQuery
  const [isTallerThan465] = useMediaQuery("(min-height: 465px)");
  const [isLongerThan680] = useMediaQuery("(min-width: 680px)");

  // useToast
  const toast = useToast();

  const handleSearchInput = (e) => setSearchInput(e.target.value);

  const handleFetchCities = async () => {
    const location = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=19d16d9b83a8935cd4e7d9c74f994a93`
    );
    const data = await location.json();

    if (data == "") {
      toast({
        description: "No results found.",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } else {
      setCityProfiles(data);
      setCityData(null);
      onOpenCitySelect();
    }
  };

  const handleFetchWeather = async (lat, lon) => {
    // Fetch weather for the given location.
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=19d16d9b83a8935cd4e7d9c74f994a93`
    );

    const weatherJSON = await weather.json();

    setCityData({
      name: weatherJSON.name,
      country: weatherJSON.sys.country,
      dt: weatherJSON.dt,
      ...weatherJSON.main,
      sunrise: weatherJSON.sys.sunrise,
      sunset: weatherJSON.sys.sunset,
      weatherId: weatherJSON.weather[0].id,
      weatherIcon: weatherJSON.weather[0].icon,
    });

    // Fetch 5-day forecast for the given location.
    const forecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=19d16d9b83a8935cd4e7d9c74f994a93`
    );

    const forecastJSON = await forecast.json();

    const forecastJSONList = forecastJSON.list;

    const forecastFiltered = forecastJSONList.map((item) => {
      return {
        dtTxt: item.dt_txt,
        temp: item.main.temp,
        weatherId: item.weather[0].id,
        weatherIcon: item.weather[0].icon,
      };
    });

    let forecastDays = [];
    let currentDay = [];
    let date = forecastFiltered[0].dtTxt.split(" ")[0];
    let daysOfTheWeek = [
      new Date(date).toLocaleDateString("en-GB", { weekday: "long" }),
    ];
    for (let index in forecastFiltered) {
      if (forecastFiltered[index].dtTxt.split(" ")[0] === date) {
        currentDay.push(forecastFiltered[index]);
      } else {
        forecastDays.push(currentDay);
        currentDay = [];
        currentDay.push(forecastFiltered[index]);
        date = forecastFiltered[index].dtTxt.split(" ")[0];
        daysOfTheWeek = [
          ...daysOfTheWeek,
          new Date(date).toLocaleDateString("en-GB", { weekday: "long" }),
        ];
      }

      if (index == forecastFiltered.length - 1) {
        forecastDays.push(currentDay);
      }
    }
    setForecast(forecastDays);
    setForecastDays(daysOfTheWeek);
    setCityProfiles([]);
  };

  return (
    <Flex
      direction="column-reverse"
      gap={5}
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <Text fontSize="2xs" color={normalTextColour}>
        <Link href="https://github.com/SA9102" isExternal>
          &copy; Shayan Ali (SA9102) <ExternalLinkIcon />
        </Link>
      </Text>
      <Box display="flex">
        <IconButton
          bg="none"
          onClick={() => {
            setIsCelsius(!isCelsius);
          }}
          icon={
            isCelsius ? <TbTemperatureFahrenheit /> : <TbTemperatureCelsius />
          }
        ></IconButton>
        <IconButton
          bg="none"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        ></IconButton>
      </Box>
      <Box id="input" display="flex">
        <AreaInput
          value={searchInput}
          onChange={handleSearchInput}
          onFetchCities={handleFetchCities}
        />
      </Box>
      {cityProfiles !== [] ? (
        <SelectCityModal
          isOpen={isOpenCitySelect}
          onClose={onCloseCitySelect}
          textColour={normalTextColour}
          cityProfiles={cityProfiles}
          onFetchWeather={handleFetchWeather}
        />
      ) : null}
      {cityData !== null ? (
        <CurrentWeatherCard
          isOpen={isOpenForecast}
          onOpen={onOpenForecast}
          onClose={onCloseForecast}
          textColour={normalTextColour}
          imageBrightness={imageBrightness}
          isCelsius={isCelsius}
          cityData={cityData}
          breakpointW={isLongerThan680}
          breakpointH={isTallerThan465}
          forecast={forecast}
          forecastDays={forecastDays}
        />
      ) : (
        <Heading m={3} color={normalTextColour} textAlign="center">
          Search For Weather Data
        </Heading>
      )}
    </Flex>
  );
}
