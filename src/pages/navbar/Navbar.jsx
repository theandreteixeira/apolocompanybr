import { Box, Center, Flex, Image, Spacer, useColorMode, Badge, Icon, Text, HStack } from "@chakra-ui/react";
import { RiShoppingBagLine } from "react-icons/ri";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { nikeLogo } from "../../constants/images";
import { setNavbarPath } from "../../redux/features/path/actions";
import { setItemSession } from "../../utils/sessionStorage";
import { Auth } from "../../components/auth/Auth";
import { Logout } from "../../components/auth/Logout";
import { DarkModeBtn } from "../../components/darkmode/DarkModeBtn";
import { Category, NavIcon, SearchBox } from "../../components/navbar/CategoryAndIcon";
import { SideDrawer } from "../../components/navbar/SideDrawer";
import { getCartQuantity } from "../../redux/features/cart/actions";
import { FaTruckMoving } from 'react-icons/fa'


export const Navbar = () => {

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.authReducer, shallowEqual);
    const { colorMode } = useColorMode();

    const handlePath = ({ target: { name } }) => {
        dispatch(setNavbarPath(name));
        setItemSession("path", name);
    };

    console.log(getCartQuantity());

    return (
        <
        >
            <Box h={'36px'} bg={colorMode === 'light' && '#f5f5f5'} >
                <Center h={'36px'} justifyContent={'right'} mr={'40px'} fontSize={'16px'} cursor={'pointer'}>
                    {!token ? <Auth /> : <Logout />}
                    <DarkModeBtn />
                </Center>
            </Box>

            <Flex h={'60px'} flexDirection={"row"} px={'20px'}  >

                <Box w={'100px'} mt={'10px'}>
                    <Link to={'/'}><Image src={nikeLogo} /></Link>
                </Box>

                <Spacer />

                <Box display={['none', 'none', 'flex', 'flex', 'flex']}>
                    <Category handlePath={handlePath} name={'/'} text={"Início"} link={'/'} />
                    <Category handlePath={handlePath} name={'allProducts'} text={"Todos os produtos"} link={'/allProducts'} />
                    <Category handlePath={handlePath} name={'men'} text={"Masculino"} link={'/men'} />
                    <Category handlePath={handlePath} name={'women'} text={"Feminino"} link={'women'} />
                </Box>

                <Spacer />

                <Center mr={'10px'} >
                    <SearchBox />
                </Center>

                <Center mr={'10px'}>
                    <Link to={'/cart'}>
                <HStack>
                        <NavIcon iconName={RiShoppingBagLine} />
                        <Text> {getCartQuantity()} </Text>
                </HStack>
                    </Link>
                </Center>

                <Box display={['flex', 'flex', 'none', 'none', 'none']}>
                    <Center mr={'10px'}>
                        <SideDrawer handlePath={handlePath} />
                    </Center>
                </Box>

            </Flex>
            <Badge w={'100%'} p={4} color="grey" textAlign={'center'}>
               <Icon  mx={'12px'} as={FaTruckMoving} boxSize={4} /> Frete grátis para todo o Brasil
            </Badge>
            <Box h={['10px', '20px', '30px', '40px', '40px']} ></Box>
        </>
    );
};





