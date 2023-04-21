import {
  Box,
  Divider,
  Grid,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  useToast,
  Icon,
  Flex
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { numberWithCommas, setToast } from '../../utils/extraFunctions'
import { ImageModal } from '../../components/description/ImageModal'
import { SelectSize } from '../../components/description/SelectSize'
import { NewButton } from '../../components/description/NewButton'
import { Loading } from '../../components/loading/Loading'
import { Error } from '../../components/loading/Error'
import { addToCartRequest } from '../../redux/features/cart/actions'
import { GrStar } from 'react-icons/gr'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator
} from '@chakra-ui/react'
import React from 'react'
import { ItemBoxToDescription } from '../../components/cart/ItemBox'
import { Measurements } from '../../components/description/Measurements'
import { handleCategory } from '../../utils/handleCategory'
import { verifyIsSouldOut } from '../../utils/VerifyIsSouldOut'
import axios from 'axios'

export const Description = () => {
  const location = useLocation()
  const id = location.state.id
  const [mySize, setMySize] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState()
  const cartProducts = useSelector(state => state.cartReducer.cartProducts)
  const currentSummary = useSelector(state => state.cartReducer.orderSummary)
  console.log('cartttttt')
  console.log(cartProducts)

  // drawer para carinho
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const handleAddToCart = async () => {
    if (mySize === false) {
      setToast(toast, 'Por favor selecione um tamanho', 'error')
    } else {
      const payload = { ...data, size: mySize.name, quantity: 1 }
      dispatch(addToCartRequest(payload, toast))
      onOpen()
    }
  }

  const handleGetProduct = async id => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('/obterProduto', {
        params: {
          id
        }
      })
      console.log(data)
      console.log(data.produto)
      setData(data.produto)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    handleGetProduct(id)
  }, [id])

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <>
      <Grid
        p={'10px'}
        gap={['40px', '40px', '4%', '4%', '4%']}
        templateColumns={['100%', '100%', '55% 41%', '62% 34%', '62% 34%']}
        w={['100%', '100%', '100%', '100%', '90%']}
        m={[
          '40px auto 20px',
          '40px auto 20px',
          '40px auto 10px',
          '40px auto 10px',
          '40px auto 10px'
        ]}
      >
        <ImageModal img={data.photos} />

        <Box px={['20px', '40px']}>
          <Text fontSize={'28px'} fontWeight={'black'}>
            {data.name.toUpperCase()}
          </Text>
          <Text fontSize={'22px'} mt='15px' mb='20px' fontWeight={'black'}>
            R$ {numberWithCommas(data.price)}
          </Text>
          <Box my={'15px'}>
            <Flex direction='row'>
              <Icon boxSize={6} color='#E2E8F0' as={GrStar} />
              <Icon boxSize={6} color='#E2E8F0' as={GrStar} />
              <Icon boxSize={6} color='#E2E8F0' as={GrStar} />
              <Icon boxSize={6} color='#E2E8F0' as={GrStar} />
              <Icon boxSize={6} color='#E2E8F0' as={GrStar} />
            </Flex>
          </Box>
          <Text color='grey'>{handleCategory(data.category)}</Text>
          <Divider my={'15px'} />
          <UnorderedList fontSize={'16px'} styleType='none' mb={'20px'}>
            <ListItem my={'10px'}>
              <Flex direction='row'>
                <Text fontWeight={'bold'}> Gênero: </Text> {data.gender}
              </Flex>
            </ListItem>
            <ListItem my={'10px'}>
              <Flex direction='row'>
                <Text fontWeight={'bold'}> Categoria: </Text>
                {handleCategory(data.category)}
              </Flex>
            </ListItem>
            <ListItem my={'10px'}>
              <Flex direction='row'>
                <Text fontWeight={'bold'}> Cor: </Text> {data.color}
              </Flex>
            </ListItem>
            <ListItem my={'10px'}>
              <Flex direction='row'>
                <Text fontWeight={'bold'}> Avaliação: </Text> {data.rating}
              </Flex>
            </ListItem>
          </UnorderedList>
          <Box my={'30px'}>
            {verifyIsSouldOut(data.sizes) ? (
              <Text color='grey' fontSize={'20px'}>
                PRODUTO ESGOTADO
              </Text>
            ) : (
              <SelectSize sizes={data.sizes} setMySize={setMySize} />
            )}
          </Box>
          {!verifyIsSouldOut(data.sizes) && (
            <NewButton
              click={handleAddToCart}
              name={'Adicionar a sacola'}
              bgColor={'black'}
              color={'white'}
              hoverBg={'#1e1e1e'}
              borderColor={'transparent'}
            />
          )}
        </Box>
      </Grid>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={'white'} />
          <DrawerHeader bgColor={'black'} color={'white'} fontSize={'15px'}>
            Produto adicionado à sacola
          </DrawerHeader>

          <DrawerBody>
            {cartProducts.map((prod, index) => (
              <ItemBoxToDescription {...prod} size={mySize} index={index} />
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Box w={'100%'}>
              <Flex my={'10px'} justifyContent='center'>
                <Text fontSize={'25px'} color={'grey'}>
                  Subtotal:
                </Text>
                <Text fontSize={'25px'} fontWeight={600}>
                  R${numberWithCommas(currentSummary.subTotal)}
                </Text>
              </Flex>
              {cartProducts.length > 0 && (
                <Button
                  color={'white'}
                  width={'100%'}
                  onClick={() => navigate('/cart')}
                  h={'60px'}
                  bg={'black'}
                  border={`1px solid ${'#cecdce'}`}
                  borderRadius='0'
                  w={'100%'}
                  fontSize={'17px'}
                  mb={'10px'}
                  _hover={{ bg: 'black', borderColor: 'black' }}
                >
                  FINALIZAR COMPRA
                </Button>
              )}
              <Button
                width={'100%'}
                onClick={onClose}
                h={'60px'}
                border={`1px solid ${'#cecdce'}`}
                borderRadius='0'
                w={'100%'}
                fontSize={'17px'}
                mb={'20px'}
                bgColor={'white'}
                color={'black'}
                hoverBorder={'black'}
                borderColor={'#cecdce'}
              >
                CONTINUAR COMPRANDO
              </Button>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box
        p={'10px'}
        w={['100%', '100%', '100%', '100%', '90%']}
        gap={['40px', '40px', '4%', '4%', '4%']}
        m={[
          '20px auto 50px',
          '20px auto 50px',
          '20px auto 40px',
          '20px auto 40px',
          '20px auto 40px'
        ]}
      >
        <Tabs position='relative' variant='unstyled'>
          <TabList color={'grey'}>
            <Tab fontWeight={'black'} _selected={{ color: 'black' }}>
              DESCRIÇÃO
            </Tab>
            <Tab fontWeight={'black'} _selected={{ color: 'black' }}>
              AVALIAÇÕES
            </Tab>
            <Tab fontWeight={'black'} _selected={{ color: 'black' }}>
              MEDIDAS
            </Tab>
          </TabList>
          <TabIndicator
            mt='-1.5px'
            height='3px'
            bg='blue.900'
            borderRadius='1px'
          />
          <TabPanels>
            <TabPanel>{data.description}</TabPanel>
            <TabPanel>
              <Text color={'grey'}>Nenhuma avaliação para esse produto.</Text>
            </TabPanel>
            <TabPanel>
              <Measurements measurements={data.measurements} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}
