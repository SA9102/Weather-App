import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function SelectCityModal({
  isOpen,
  onClose,
  textColour,
  cityProfiles,
  onFetchWeather,
}) {
  const citySelectBgColour = useColorModeValue("gray.100", "gray.600");
  const citySelectHoverColour = useColorModeValue("green.200", "green.600");
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" color={textColour}>
          Select specific area
        </ModalHeader>
        <ModalBody display="flex" flexDirection="column" color={textColour}>
          {cityProfiles.map((cityProfile, index) => (
            <Box
              key={index}
              as="button"
              bg={citySelectBgColour}
              p={5}
              m={1}
              borderRadius="lg"
              _hover={{ bg: citySelectHoverColour }}
              onClick={() => {
                onFetchWeather(cityProfile.lat, cityProfile.lon);
                // setIsLoading(true);
                onClose();
              }}
            >
              <Text fontSize="lg">{`${cityProfile.name}, ${cityProfile.country}`}</Text>
            </Box>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
