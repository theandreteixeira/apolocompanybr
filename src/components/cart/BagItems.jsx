import { Box, Text } from "@chakra-ui/react";
import { ItemBox } from "./ItemBox";


export const BagItems = ({products}) => {
    console.log("PRODUCTS: abaixo:");
    console.log(products);

    return (
        <>
            <Box>

                <Text mb={'20px'} fontSize={'20px'} fontWeight={600}>CARRINHO</Text>

                {
                    products.map((item, index) => (
                        <ItemBox key={index} {...item} index={index} data={item} />
                    ))
                }
                {}

            </Box>
        </>
    );
};
