import {
  Input,
  IconButton,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function AreaInput({ value, onChange, onFetchCities }) {
  const toast = useToast();
  const searchButtonBgColour = useColorModeValue("green.200", "green.500");
  const searchButtonBgHoverColour = useColorModeValue("green.300", "green.600");

  return (
    <>
      <Input
        variant="filled"
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
        shadow="base"
        type="text"
        placeholder="Enter a city"
        value={value}
        onChange={onChange}
      />
      <IconButton
        bg={searchButtonBgColour}
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
        _hover={{ bg: searchButtonBgHoverColour }}
        icon={<SearchIcon />}
        shadow="base"
        onClick={() => {
          if (value.trim() === "") {
            toast({
              description: "Please enter an area name.",
              status: "error",
              duration: 2500,
              isClosable: true,
            });
          } else {
            onFetchCities();
          }
        }}
      >
        Enter
      </IconButton>
    </>
  );
}
