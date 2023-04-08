import { Box, HStack, useColorMode, useRadio, useRadioGroup } from "@chakra-ui/react";


const RadioCard = (props) => {

    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
    const { colorMode } = useColorMode();

    console.log(props)
    console.log(props.value)

    return (
        <Box as="label">
            <input {...input} />
            <Box
                onClick= { props.value.quantity > 0 ? props.onClick : null}
                bgColor={props.value.quantity == 0 ? "#f5f5f5" : null}
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
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
                            setMySize(value.name);
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
