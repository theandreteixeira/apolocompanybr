import { Text } from "@chakra-ui/react";


export const DescText = ({ children }) => {
    return (
        <Text
            fontSize={['14px', '14px', '15px', '18px', '19px']}
            color={'gray'}
        >
            {children}
        </Text>
    );
};

export const PriceText = ({children}) => {

    return (
        <>
            <Text
                fontSize={['14px', '18px', '15px', '18px', '18px']}
                fontWeight={600}
                my={'6px'}
            >
                {children}
            </Text>
        </>
    );
};