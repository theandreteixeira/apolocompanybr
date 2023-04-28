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
  Flex,
  useDisclosure
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
import React from 'react'
import { ItemBoxToDescription } from '../../components/cart/ItemBox'
import { Measurements } from '../../components/description/Measurements'
import { handleCategory } from '../../utils/handleCategory'
import { verifyIsSouldOut } from '../../utils/VerifyIsSouldOut'
import axios from 'axios'
import { Cart } from '../../components/description/Cart'
import { ProductDetails } from '../../components/description/ProductDetails'

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
  const { isOpen, onOpen, onClose } = useDisclosure()

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
              <Text>
                <strong> Gênero: </strong> {data.gender}{' '}
              </Text>
            </ListItem>
            <ListItem my={'10px'}>
              <Text>
                <strong> Categoria:</strong> {handleCategory(data.category)}
              </Text>
            </ListItem>
            <ListItem my={'10px'}>
              <Text>
                <strong> Cor: </strong>
                {data.color}
              </Text>
            </ListItem>
            <ListItem my={'10px'}>
              <Text>
                <strong> Avaliação: </strong> {data.rating}
              </Text>
            </ListItem>
          </UnorderedList>
          <Box my={'30px'}>
            {verifyIsSouldOut(data.sizes) ? (
              <Text color='grey' textAlign={'center'} fontSize={'20px'}>
                PRODUTO ESGOTADO
              </Text>
            ) : (
              <SelectSize sizes={data.sizes} setMySize={setMySize} />
            )}
          </Box>
          {!verifyIsSouldOut(data.sizes) && (
            <NewButton
              click={handleAddToCart}
              name={'Adicionar à sacola'}
              bgColor={'black'}
              color={'white'}
              hoverBg={'#1e1e1e'}
              borderColor={'transparent'}
            />
          )}
        </Box>
      </Grid>
      <Cart mySize={mySize} isOpen={isOpen} onClose={onClose} />
      <ProductDetails data={data} />
    </>
  )
}
