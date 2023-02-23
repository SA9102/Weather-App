import ForecastDayCard from "./ForecastDayCard";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";

export default function ForecastModal({
  isOpen,
  onClose,
  textColour,
  forecast,
  forecastDays,
  isCelsius,
  imageBrightness,
}) {
  const headerColour = useColorModeValue("orange.100", "orange.800");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxW="50rem" minH="22rem">
        <ModalCloseButton />
        <ModalHeader
          textAlign="center"
          color={textColour}
          bg={headerColour}
          borderTopRadius="md"
        >
          Forecast
        </ModalHeader>
        <ModalBody
          display="flex"
          justifyContent="center"
          alignItems="center"
          color={textColour}
        >
          <Tabs variant="enclosed" align="center">
            <TabList>
              {/* Since the tabs cannot be rearranged or deleted, it should be safe to have the index as the key. */}
              {forecast.map((_, index) => {
                return (
                  <>
                    <Tab key={index}>{forecastDays[index]}</Tab>
                  </>
                );
              })}
            </TabList>

            <TabPanels>
              {forecast.map((forecastDay, index) => {
                return (
                  <TabPanel key={index} display="flex" justifyContent="center">
                    {forecastDay.map((data, index) => {
                      // dtTxt contains the date and time separated by a space.
                      // The time is represented by hh:mm:ss
                      // First we retrieve the 'time' portion, then we retrieve
                      // the hh:mm part of the time.
                      const date = data.dtTxt.split(" ")[1].slice(0, 5);
                      return (
                        <ForecastDayCard
                          key={index}
                          isCelsius={isCelsius}
                          date={date}
                          data={data}
                          imageBrightness={imageBrightness}
                        />
                      );
                    })}
                  </TabPanel>
                );
              })}
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
