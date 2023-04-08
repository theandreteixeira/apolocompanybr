import { Box, Center, Flex, Image, Spacer, useColorMode, Badge, Icon, HStack, Text } from "@chakra-ui/react";
import { RiShoppingBagLine } from "react-icons/ri";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apoloLogo } from "../../constants/images";
import { setNavbarPath } from "../../redux/features/path/actions";
import { setItemSession } from "../../utils/sessionStorage";
import { Auth } from "../../components/auth/Auth";
import { Logout } from "../../components/auth/Logout";
import { DarkModeBtn } from "../../components/darkmode/DarkModeBtn";
import { Category, NavIcon, SearchBox } from "../../components/navbar/CategoryAndIcon";
import { SideDrawer } from "../../components/navbar/SideDrawer";
import { getCartQuantity } from "../../redux/features/cart/actions";
import { TbTruckDelivery } from "react-icons/tb";

export const Navbar = () => {

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.authReducer, shallowEqual);
    const { colorMode } = useColorMode();

    const handlePath = ({ target: { name } }) => {
        dispatch(setNavbarPath(name));
        setItemSession("path", name);
    };

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
                    <Link to={'/'}><Image src={apoloLogo} /></Link>
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
                        <Badge> {getCartQuantity()} </Badge>
                </HStack>
                    </Link>
                </Center>

                <Box display={['flex', 'flex', 'none', 'none', 'none']}>
                    <Center mr={'10px'}>
                        <SideDrawer handlePath={handlePath} />
                    </Center>
                </Box>

            </Flex>
            <Badge w={'100%'} p={3} bgColor={colorMode === 'light' && '#f5f5f5'} textAlign={'center'} >
                <Flex align="center" justifyContent="center">
                    <Icon  mx={'12px'} as={ TbTruckDelivery } boxSize={4} />
                    <Text>Frete grátis para todo o Brasil</Text>
                </Flex>
            </Badge>
            <Box h={['10px', '20px', '30px', '40px', '40px']} ></Box>
        </>
    );
};





