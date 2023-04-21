import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Text
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { MdOutlineContentCopy } from 'react-icons/md'
import { BsCheckCircle } from 'react-icons/bs'
import { useRef, useState } from 'react'
import copy from 'copy-to-clipboard'
import { numberWithCommas } from '../../utils/extraFunctions'
import { check } from '../../constants/images'

export const OrderMade = () => {
  const route = useLocation()
  const [isCopied, setIsCopied] = useState(false)
  const locationRef = useRef(route)
  const data = locationRef.current.state
  return data ? (
    <Box>
      <Center flexDirection={'column'}>
        <Image height={'90px'} width={'90px'} src={check} mb={'15px'} />
        <Text textAlign={'center'} fontWeight={'extrabold'} fontSize={'25'}>
          {'Pedido realizado com sucesso!'.toUpperCase()}
        </Text>
        <Text textAlign={'center'}>ID: {data.id}</Text>
        {data.qrCode && (
          <Box my={'20px'} width={'100%'}>
            <Box p={'10px'} width={'100%'}>
              <Text fontSize={'18px'} color={'grey'}>
                {
                  'fefhwefhweifiwefwefiwefwiwhefiwebifbweifbewifbweifbwebfiwebfiwefbiwefbweifbiewfbweifbweifbeiwbfweifbwebfiwefbb'
                }
              </Text>
            </Box>
            <Button
              aria-label='Search database'
              onClick={() => {
                copy(data.qrCode)
                setIsCopied(true)
              }}
            >
              <Icon
                as={isCopied ? BsCheckCircle : MdOutlineContentCopy}
                mr={'5px'}
              />
              {isCopied ? 'Copiado!' : 'Copiar'}
            </Button>
            <Center flexDirection={'column'}>
              <Image width={'150px'} src={data.qrCodeUrl} />
              <Badge color={'blue.500'}>
                Se você já pagou, por favor desconsidere o qrcode.
              </Badge>
              <Flex>
                <Text color={'grey'} fontSize={'30px'}>
                  Total:
                </Text>
                <Text fontWeight={'extrabold'} fontSize={'30px'}>
                  R${numberWithCommas(data.total)}
                </Text>
              </Flex>
            </Center>
          </Box>
        )}
        <Box display={'flex'} textAlign='start' my={'10px'}>
          <Text fontWeight={'extrabold'} fontSize={'20px'}>
            {'Detalhes do pedido'.toUpperCase()}
          </Text>
        </Box>
        <Flex direction='row'>
          <Text fontWeight={'bold'}> Subtotal: </Text>
          R${numberWithCommas(data.orderSummary.subTotal)}
        </Flex>
        <Flex direction='row'>
          <Text fontWeight={'bold'}> Quantidade: </Text>
          {data.orderSummary.quantity}
        </Flex>
        <Flex direction='row'>
          <Text fontWeight={'bold'}> Desconto: </Text>
          {data.orderSummary.discount}
        </Flex>
        <Flex direction='row'>
          <Text fontWeight={'bold'}> Frete: </Text>
          {data.orderSummary.shipping}
        </Flex>
        <Flex direction='row'>
          <Text fontWeight={'bold'}> Total: </Text>
          R${numberWithCommas(data.orderSummary.total)}
        </Flex>
      </Center>
    </Box>
  ) : (
    <Box> </Box>
  )
}
