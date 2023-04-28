import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Text,
  useToast
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCartRequest,
  removeFromCartRequest
} from '../../redux/features/cart/actions'
import { numberWithCommas, setToast } from '../../utils/extraFunctions'
import { BagItemBtn, QuantityBtn } from './BagItemBtn'
import { useNavigate } from 'react-router-dom'
import { addToFavouriteRequest } from '../../redux/features/favourite/actions'
import { GrTrash } from 'react-icons/gr'
import { handleCategory } from '../../utils/handleCategory'

export const ItemBox = ({
  name,
  category,
  photos,
  price,
  quantity,
  index,
  size,
  data
}) => {
  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  const token = useSelector(state => state.authReducer.token)

  const handleRemoveItem = () => {
    dispatch(removeFromCartRequest(index, toast))
  }

  const handleAddToFavourite = () => {
    if (!token) {
      setToast(toast, 'Faça o login primeiro', 'error')
      navigate('/auth')
    } else {
      dispatch(addToFavouriteRequest(data, token, toast))
    }
  }

  const handleQuantityChange = ({ target: { name } }) => {
    if (quantity === 1 && name === 'reduce') {
      return dispatch(removeFromCartRequest(index, toast))
    }
    return dispatch(addToCartRequest(data, toast, name))
  }

  return (
    <>
      <Box
        my={'15px'}
        minH={'150px'}
        display={'flex'}
        gap={['5px', '5px', '20px', '20px', '20px']}
      >
        <Box
          w={['80px', '80px', '150px', '150px', '150px']}
          h={['80px', '80px', '150px', '150px', '150px']}
        >
          <Image src={photos[0]} />
        </Box>

        <Box
          w={'100%'}
          display={'grid'}
          gap={'2%'}
          gridTemplateColumns={[
            '67% 30%',
            '67% 30%',
            '80% 18%',
            '80% 18%',
            '80% 18%'
          ]}
        >
          <Box minH={'150px'}>
            <Text fontWeight={500}>{name}</Text>
            <Text color={'gray'}>{handleCategory(category)}</Text>
            <Text color={'gray'}>Tamanho: {size}</Text>

            <Flex alignItems={'center'} gap={'10px'} my={'8px'}>
              <Text>Quantidade:</Text>

              <QuantityBtn
                text={'-'}
                name={'reduce'}
                onClick={handleQuantityChange}
              />
              <Text fontWeight={600}>{quantity}</Text>

              <QuantityBtn
                text={'+'}
                name={'add'}
                onClick={handleQuantityChange}
              />
            </Flex>

            <Box display={'flex'} gap={'10px'}>
              <BagItemBtn title={'Apagar'} onClick={handleRemoveItem} />
            </Box>
          </Box>

          <Box minH={'150px'}>
            <Text fontSize={'18px'} textAlign={'end'}>
              R${numberWithCommas(price)}
            </Text>
          </Box>
        </Box>
      </Box>

      <Divider />
    </>
  )
}

export const ItemBoxToDescription = ({
  name,
  photos,
  price,
  quantity,
  index,
  data,
  size
}) => {
  const dispatch = useDispatch()
  const toast = useToast()

  const handleRemoveItem = () => {
    dispatch(removeFromCartRequest(index, toast))
  }

  return (
    <>
      <Box
        my={'15px'}
        minH={'150px'}
        display={'flex'}
        gap={['5px', '5px', '20px', '20px', '20px']}
      >
        <Box
          w={['60px', '60px', '125px', '125px', '125px']}
          h={['80px', '80px', '150px', '150px', '150px']}
        >
          <Image src={photos[0]} />
        </Box>

        <Box
          w={'100%'}
          display={'grid'}
          gap={'2%'}
          gridTemplateColumns={[
            '67% 30%',
            '67% 30%',
            '80% 18%',
            '80% 18%',
            '80% 18%'
          ]}
        >
          <Box minH={'150px'}>
            <Text fontSize={'14px'}>{name}</Text>
            <Text fontSize={'14px'}>R${numberWithCommas(price)}</Text>

            <Text fontSize={'13px'}> Quantidade:{quantity}</Text>

            <Text fontSize={'13px'}>Tamanho:{' ' + size}</Text>
          </Box>
        </Box>
        <Icon cursor={'pointer'} as={GrTrash} onClick={handleRemoveItem} />
      </Box>

      <Divider />
    </>
  )
}
