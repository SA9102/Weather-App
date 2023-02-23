import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function ForecastDayCard({
  isCelsius,
  date,
  data,
  imageBrightness,
}) {
  const cardBorderColour = useColorModeValue("gray.300", "gray.800");
  const cardHeaderColour = useColorModeValue("gray.100", "gray.600");
  const cardHeaderBottomBorderColour = useColorModeValue(
    "gray.200",
    "gray.700"
  );

  return (
    <Card
      display="flex"
      flexDirection="column"
      alignItems="center"
      borderRadius={0}
      boxShadow="none"
      border="1px solid"
      borderColor={cardBorderColour}
    >
      <CardHeader
        bg={cardHeaderColour}
        w="100%"
        p={2}
        borderBottom="1px solid"
        borderColor={cardHeaderBottomBorderColour}
      >
        <Text>{date}</Text>
      </CardHeader>
      <CardBody>
        <Text fontSize="2xl">{`${Math.round(
          isCelsius ? data.temp : data.temp * (9 / 5) + 32
        )}°${isCelsius ? "C" : "F"}`}</Text>
        <Image
          id="img-forecast"
          src={`http://openweathermap.org/img/wn/${data.weatherIcon}@2x.png`}
          style={{ filter: imageBrightness }}
        />
      </CardBody>
    </Card>
  );
}
