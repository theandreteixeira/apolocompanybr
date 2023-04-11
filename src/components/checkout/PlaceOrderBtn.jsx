import { Input } from "@chakra-ui/react";


export const PlaceOrderBtn = ({ onClick }) => {
    return (
        <>
            <Input
                onClick={onClick}
                as={'button'}
                type={'submit'}
                h={"60px"}
                bg={'black'}
                color={'white'}
                borderRadius={0}
                w={"100%"}
                fontSize={"17px"}
                mt={'20px'}
                _hover={{ borderColor: 'black' }}
            >
                REALIZAR PEDIDO
            </Input>
        </>
    );
};