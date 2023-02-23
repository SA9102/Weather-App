import ForecastModal from "./ForecastModal";

import {
  Card,
  Box,
  Text,
  Image,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function CurrentWeatherCard({
  isOpen,
  onOpen,
  onClose,
  textColour,
  imageBrightness,
  isCelsius,
  cityData,
  breakpointW,
  breakpointH,
  forecast,
  forecastDays,
}) {
  const buttonColour = useColorModeValue("orange.200", "orange.500");
  const buttonHoverColour = useColorModeValue("orange.300", "orange.600");
  const extraInfoColour = useColorModeValue("gray.600", "gray.400");

  const sunriseDate = new Date(cityData.sunrise * 1000);
  const sunsetDate = new Date(cityData.sunset * 1000);

  return (
    <Card
      className="App"
      p={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
      color={textColour}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Text fontWeight="bold">{`${cityData.name}, ${cityData.country}`}</Text>
        <Box
          display="flex"
          flexDirection={breakpointH ? "column" : "row"}
          gap={!breakpointH && "2rem"}
          alignItems="center"
        >
          <Box id="current-temperature" display="flex" alignItems="center">
            <Image
              id="img-current"
              src={`http://openweathermap.org/img/wn/${cityData.weatherIcon}@2x.png`}
              alt="weather image:"
              style={{ filter: imageBrightness }}
            />
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="4xl">{`${Math.round(
                isCelsius ? cityData.temp : cityData.temp * (9 / 5) + 32
              )}°${isCelsius ? "C" : "F"}`}</Text>
              <Text color={extraInfoColour} fontSize="2xs">
                Feels like{" "}
                {`${Math.round(
                  isCelsius
                    ? cityData.feels_like
                    : cityData.feels_like * (9 / 5) + 32
                )}°${isCelsius ? "C" : "F"}`}
              </Text>
            </Box>
          </Box>
          <Box py={2}>
            <Text color={extraInfoColour} fontSize="xs">
              {`↑ ${sunriseDate.getHours()}:${sunriseDate.getMinutes()} | ↓ ${sunsetDate.getHours()}:${sunsetDate.getMinutes()}`}
            </Text>
            <Text color={extraInfoColour} fontSize="xs">
              Pressure: {`${Math.round(cityData.pressure)}hPa`}
            </Text>
            <Text color={extraInfoColour} fontSize="xs">
              Humidity: {`${Math.round(cityData.humidity)}%`}
            </Text>
          </Box>
        </Box>
        {breakpointW && (
          <Button
            size="xs"
            bg={buttonColour}
            _hover={{ bg: buttonHoverColour }}
            onClick={onOpen}
          >
            View Forecast
          </Button>
        )}
        {forecast !== [] ? (
          <ForecastModal
            isOpen={isOpen}
            onClose={onClose}
            isCelsius={isCelsius}
            textColour={textColour}
            imageBrightness={imageBrightness}
            forecast={forecast}
            forecastDays={forecastDays}
          />
        ) : null}
      </Box>
    </Card>
  );
}
