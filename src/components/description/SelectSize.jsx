import { Box, HStack, useColorMode, useRadio, useRadioGroup } from "@chakra-ui/react";


const RadioCard = (props) => {

    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
    const { colorMode } = useColorMode();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                onClick={props.onClick}
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                _disabled={props.value.quantity == 0}
                _checked={{ border: `2px solid ${colorMode === 'light' ? 'black' : 'white'}` }}
                px={5} py={3}
            >
                {props.children}
            </Box>
        </Box>
    );
};


export const SelectSize = ({ sizes, setMySize }) => {
    const { getRootProps, getRadioProps } = useRadioGroup({ name: "SelectSize" });
    const group = getRootProps();

    return (
        <HStack {...group}>
            {sizes.map((value) => {
                const radio = getRadioProps({ value });
                return (
                    <RadioCard
                        onClick={() => {
                            setMySize(value);
                        }}
                        value={value}
                        {...radio}
                    >
                        {value.name}
                    </RadioCard>
                );
            })}
        </HStack>
    );
};
