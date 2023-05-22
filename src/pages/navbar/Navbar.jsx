import {
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  useColorMode,
  Badge,
  Icon,
  HStack,
  Text
} from '@chakra-ui/react'
import { BsHandbag, BsSearch } from 'react-icons/bs'
import { IoMenuOutline } from 'react-icons/io'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { apoloLight, apoloDark } from '../../constants/images'
import { setNavbarPath } from '../../redux/features/path/actions'
import { setItemSession } from '../../utils/sessionStorage'
import { Logout } from '../../components/auth/Logout'
import {
  Category,
  NavIcon,
  SearchBox
} from '../../components/navbar/CategoryAndIcon'
import { SideDrawer } from '../../components/navbar/SideDrawer'
import { TbBolt } from 'react-icons/tb'

export const Navbar = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cartReducer.cartProducts)
  const { colorMode } = useColorMode()

  const handlePath = name => {
    const path = JSON.stringify(name)
    dispatch(setNavbarPath(path))
    setItemSession('path', path)
  }

  return (
    <>
      <Flex px={'20px'} py={'15px'} justifyContent={'center'}>
        <Box display={['none', 'none', 'flex', 'flex', 'flex']}>
          <Center h={'60px'} cursor={'pointer'} paddingX={'15px'}>
            <Link to={'/'}>
              <Image width={'75px'} src={apoloLight} />
            </Link>
          </Center>
          <Category
            handlePath={handlePath}
            name={'/'}
            text={'Início'}
            link={'/'}
          />
          <Category
            handlePath={handlePath}
            name={'allProducts'}
            text={'Todos os produtos'}
            link={'/allProducts'}
          />
          <Category
            handlePath={handlePath}
            name={'men'}
            text={'Masculino'}
            link={'/men'}
          />
          <Category
            handlePath={handlePath}
            name={'women'}
            text={'Feminino'}
            link={'women'}
          />
        </Box>

        <Spacer />

        <Center mr={'30px'} my={'5px'}>
          <NavIcon iconName={BsSearch} />
        </Center>

        <Center mr={'10px'}>
          <Link to={'/cart'}>
            <HStack>
              <NavIcon iconName={BsHandbag} />
              <Text color={'black'}> {cart.length} </Text>
            </HStack>
          </Link>
        </Center>

        <Box display={['flex', 'flex', 'none', 'none', 'none']}>
          <Center>
            <SideDrawer handlePath={handlePath} />
          </Center>
        </Box>
      </Flex>
      {/* <Badge
        w={'100%'}
        p={3}
        bgColor={colorMode === 'light' && '#f5f5f5'}
        textAlign={'center'}
      >
        <Flex align='center' justifyContent='center'>
          <Icon mx={'12px'} as={TbBolt} boxSize={4} />
          <Text>PEÇAS APOLO FLEX DISPONÍVEIS.</Text>
        </Flex>
      </Badge> */}
      <Box h={['10px', '20px', '30px', '40px', '40px']}></Box>
    </>
  )
}
