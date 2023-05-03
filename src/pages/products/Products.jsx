import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Image,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { IoOptionsOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { getRequest } from '../../redux/features/products/actions'
import { LeftSideFilter } from '../../components/products/LeftSideFilter'
import { SortFilters } from '../../components/products/SortFilters'
import { useLocation, useNavigate } from 'react-router-dom'
import { getItemSession, setItemSession } from '../../utils/sessionStorage'
import { ProductDisplayBox } from '../../components/products/ProductDisplayBox'
import { Loading } from '../../components/loading/Loading'
import { Error } from '../../components/loading/Error'
import { useMediaQuery } from 'react-responsive'
import { print } from '../../utils/print'
import { Filters } from '../../components/products/Filters'

export const Products = () => {
  const { colorMode } = useColorMode()
  const [isFilter, setIsFilter] = useState(
    useMediaQuery({ minDeviceWidth: 1224 })
  )
  const { products, isLoading, isError } = useSelector(
    state => state.prodReducer
  )
  const path = getItemSession('path')
  const route = useLocation()
  const search = route.state?.search
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const resetFilter = () => {
    setIsFilter(!isFilter)
    dispatch(getRequest(path))
  }

  const handleSingleProduct = data => {
    navigate('/description', {
      state: {
        id: data.id
      }
    })
  }

  useEffect(() => {
    print('puts', path)
    const attr = JSON.parse(path)
    const { gender, category } = attr
    print('me aceita', gender, category)
    dispatch(getRequest(attr.category, attr.gender, search))
  }, [path, search])

  return (
    <>
      <Flex
        direction={['column', 'column', 'row', 'row', 'row']}
        h={['100px', '100px', '60px', '60px', '60px']}
        position={'sticky'}
        top={'0px'}
        bg={colorMode === 'light' ? 'white' : '#1a202c'}
        zIndex={1}
      >
        <Center textAlign={'start'}>
          <Text
            w={'100%'}
            ml={['20px', '20px', '30px', '40px', '50px']}
            fontSize={['20px', '25px']}
            fontWeight={500}
          >
            {path === 'men'
              ? 'Masculino'
              : path === 'women'
              ? 'Feminino'
              : path === 'kids'
              ? "Kids's Products"
              : 'Produtos'}
          </Text>
        </Center>
        <Spacer />
        <Center>
          <Flex
            gap={['4px']}
            w={'100%'}
            my={['10px', '10px', '0px', '0px', '0px']}
            px={['8px', '8px', '20px', '20px', '20px']}
          >
            <Button
              onClick={() => {
                onOpen()
              }}
              fontSize={['13px', '16px']}
              rightIcon={<IoOptionsOutline />}
            >
              {isFilter ? 'Ocultar filtros' : 'Filtros'}
            </Button>
            <Spacer />
            <Button onClick={resetFilter} fontSize={['13px', '16px']}>
              Apagar filtros
            </Button>
            <Spacer />
            <SortFilters />
          </Flex>
        </Center>
      </Flex>

      <Grid
        gap={['20px', '20px', '2%', '2%', '2%']}
        templateColumns={[
          '100%',
          '100%',
          isFilter ? '32% 66%' : '100%',
          isFilter ? '28% 70%' : '100%',
          isFilter ? '20% 78%' : '100%'
        ]}
        justifyContent={'center'}
      >
        {isFilter && (
          <Box
            minH={['120px', '120px', '600px', '600px', '600px']}
            maxH={['900px', '600px']}
            position={['none', 'none', 'sticky', 'sticky', 'sticky']}
            top={['0px', '70px']}
            overflowY={'scroll'}
            className='scroll'
            zIndex={0}
            mt={['10px', '10px', '20px', '20px', '20px']}
          >
            <LeftSideFilter />
          </Box>
        )}

        <Box minH={'400px'}>
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <Error />
          ) : products.length > 0 ? (
            <Grid
              gap={[2, 4]}
              p={['10px', '10px', '20px', '20px', '20px']}
              templateColumns={[
                'repeat(2, 1fr)',
                'repeat(2, 1fr)',
                'repeat(2, 1fr)',
                'repeat(2, 1fr)',
                'repeat(3, 1fr)'
              ]}
            >
              {/* {products.length > 0 ? ( */}
              {products.map((product, index) => (
                <ProductDisplayBox
                  {...product}
                  key={index}
                  onClick={() => {
                    handleSingleProduct(product)
                  }}
                />
              ))}
            </Grid>
          ) : (
            <Container
              my={'140px'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
            >
              <Text textAlign={'center'} color={'gray'}>
                Nenhum produto foi encontrado.
              </Text>
            </Container>
          )}
          <Filters isOpen={isOpen} onClose={onClose} />
        </Box>
      </Grid>
    </>
  )
}
