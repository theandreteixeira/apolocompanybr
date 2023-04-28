import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Flex,
  Text,
  Button
} from '@chakra-ui/react'
import { ItemBoxToDescription } from '../cart/ItemBox'
import { useSelector } from 'react-redux'
import { numberWithCommas } from '../../utils/extraFunctions'
import { useNavigate } from 'react-router-dom'

export const Cart = ({ mySize, isOpen, onClose }) => {
  const navigate = useNavigate()
  const currentSummary = useSelector(state => state.cartReducer.orderSummary)
  const cartProducts = useSelector(state => state.cartReducer.cartProducts)
  const btnRef = React.useRef()

  return (
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
  )
}
