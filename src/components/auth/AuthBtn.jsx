import { Input } from "@chakra-ui/react";

export const AuthBtn = ({ value, isDisabled }) => {
    return (
        <Input
            value={value}
            type={'submit'}
            backgroundColor={'black'}
            _hover={{ backgroundColor: "#1e1e1e" }}
            color={'white'}
            borderRadius={0}
            w={'100%'}
            height={"50px"}
            isDisabled={isDisabled}
        />
    );
};