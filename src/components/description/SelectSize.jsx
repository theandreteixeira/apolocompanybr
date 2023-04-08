import { Box, HStack, useColorMode, useRadio, useRadioGroup } from "@chakra-ui/react";


const RadioCard = (props) => {

    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
    const { colorMode } = useColorMode();
    const isDisabled = props.item.quantity == 0;

    console.log(checkbox)

    return (
        <Box as="label">
            <input {...input} />
            <Box
                onClick= { !isDisabled ? props.onClick : null}
                bgColor={isDisabled ? "#f5f5f5" : null}
                {...checkbox}
                cursor={isDisabled ? "not-allowed" : "pointer"}
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
                const radio = getRadioProps({ value: value.name });
                return (
                    <RadioCard
                        onClick={() => {
                            setMySize(value.name);
                        }}
                        item={value}
                        {...radio}
                    >
                        {value.name}
                    </RadioCard>
                );
            })}
        </HStack>
    );
};
