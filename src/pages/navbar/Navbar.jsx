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
import { RiShoppingBagLine } from 'react-icons/ri'
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
  const { token } = useSelector(state => state.authReducer, shallowEqual)
  const cart = useSelector(state => state.cartReducer.cartProducts)
  const { colorMode } = useColorMode()

  const handlePath = name => {
    console.log('ele entra no navbar:' + name)
    const path = JSON.stringify(name)
    dispatch(setNavbarPath(path))
    setItemSession('path', path)
  }

  return (
    <>
      {token ? (
        <Flex px={'20px'} bg={colorMode === 'light' && '#f5f5f5'} h={'36px'}>
          <Box w={'90px'} mt={'10px'}>
            <Link to={'/'}>
              <Image
                width={'60px'}
                src={colorMode === 'light' ? apoloLight : apoloDark}
              />
            </Link>
          </Box>
          <Spacer />
          <Box>
            <Center
              h={'36px'}
              justifyContent={'right'}
              fontSize={'16px'}
              cursor={'pointer'}
            >
              <Logout />
            </Center>
          </Box>
        </Flex>
      ) : (
        <Box h={'36px'} bg={colorMode === 'light' && '#f5f5f5'}>
          <Center
            h={'36px'}
            justifyContent={'right'}
            mr={'20px'}
            fontSize={'16px'}
            cursor={'pointer'}
          ></Center>
        </Box>
      )}

      <Flex px={'20px'} justifyContent={'center'}>
        <Box display={['none', 'none', 'flex', 'flex', 'flex']}>
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

        <Center mr={'10px'} my={'5px'}>
          <SearchBox />
        </Center>

        <Center mr={'10px'}>
          <Link to={'/cart'}>
            <HStack>
              <NavIcon iconName={RiShoppingBagLine} />
              <Badge> {cart.length} </Badge>
            </HStack>
          </Link>
        </Center>

        <Box display={['flex', 'flex', 'none', 'none', 'none']}>
          <Center>
            <SideDrawer handlePath={handlePath} />
          </Center>
        </Box>
      </Flex>
      <Badge
        w={'100%'}
        p={3}
        bgColor={colorMode === 'light' && '#f5f5f5'}
        textAlign={'center'}
      >
        <Flex align='center' justifyContent='center'>
          <Icon mx={'12px'} as={TbBolt} boxSize={4} />
          <Text>PEÇAS APOLO FLEX DISPONÍVEIS.</Text>
        </Flex>
      </Badge>
      <Box h={['10px', '20px', '30px', '40px', '40px']}></Box>
    </>
  )
}
