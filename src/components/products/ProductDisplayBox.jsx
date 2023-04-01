import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { numberWithCommas, shortString } from "../../utils/extraFunctions";
import { DescText, PriceText } from "./DescText";


export const ProductDisplayBox = ({ title, price, img, onClick, category }) => {

    return (
        <>
            <Flex onClick={onClick} flexDirection={'column'} cursor="pointer" mb={'10px'}>
                <Box overflow={'hidden'}>
                    <Image className="imgAnimation" src={img[0]} />
                </Box>
                <Box>
                    <Flex justifyItems={'center'} mt={'10px'}>
                        <Text
                            fontSize={['13px', '15px', '17px', '17px', '18px']}
                            fontWeight={500}
                        >
                            {shortString(title, 40)}
                        </Text>
                    </Flex>

                    <DescText>{category}</DescText>
                    <PriceText>R$ {numberWithCommas(price)}</PriceText>
                </Box>
            </Flex>
        </>
    );
};

