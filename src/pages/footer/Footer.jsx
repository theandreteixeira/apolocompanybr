import { Box, Center, Flex, Grid, Icon, Link, Text } from "@chakra-ui/react";
import { FaInstagramSquare } from 'react-icons/fa';
import { IconLink } from "../../components/footer/IconLink";

export const Footer = () => {

    return (
        <Box h={'450px'} bg={'black'} color={'white'} mt={'80px'} paddingTop={'60px'}>

            {/* <Center h={'80px'}>
                <Text className="typeWritertheme">Made with <Icon as={FcLike} /> by Mohit Sehrawat</Text>
            </Center> */}

            <Grid
                h={'220px'}
                p={'10px'}
                templateColumns={['100%', '48% 2% 50%', '48% 2% 50%', '25% 25% 50%']}
            >
                <Center>
                    <Flex
                        fontSize={["13px", '16px', '17px', '17px', '17px']}
                        gap={'10px'}
                        fontWeight={600}
                        flexDirection={'column'}
                    >
                        <Text>FIND A NEARBY STORE</Text>
                        <Text>BECOME A MEMBER</Text>
                        <Text>ALREADY A MEMBER</Text>
                        <Text>SIGNUP FOR EMAIL</Text>
                        <Text>SEND US FEEDBACK</Text>
                    </Flex>
                </Center>

                <Center>
                    <Flex
                        display={['none', 'none', 'none', 'flex', 'flex']}
                        fontSize={'14px'}
                        gap={'10px'}
                        flexDirection={'column'}
                        color={'gray'}
                    >
                        <Text color={'white'} fontWeight={600}>GET HELP</Text>
                        <Text>Order Status</Text>
                        <Text>Delivery</Text>
                        <Text>Returns</Text>
                        <Text>Payment Options</Text>
                    </Flex>
                </Center>

                <Flex
                    mt={'20px'}
                    gap={'15px'}
                    flexDirection={'row-reverse'}
                    justifyContent={['center', 'right', 'right', 'right', 'right']}
                    color={'gray'}
                    mr={['0px', '30px', '80px', '80px', '80px']}
                >
                    <IconLink
                        icon={FaInstagramSquare}
                        link={"https://instagram.com/apolocompanybr"}
                    />
                </Flex>

            </Grid>
        </Box>
    );
};




