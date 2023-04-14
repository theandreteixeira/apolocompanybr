import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Image,
  Text
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { MdOutlineContentCopy } from 'react-icons/md'
import { BsCheckCircle } from 'react-icons/bs'
import { useState } from 'react'
import copy from 'copy-to-clipboard'
import Confetti from 'react-confetti'
import { numberWithCommas } from '../../utils/extraFunctions'
import Rive from '@rive-app/react-canvas'

export const OrderMade = () => {
  const route = useLocation()
  const [isCopied, setIsCopied] = useState(false)
  const data = route.state
  console.log(data)
  return (
    <Box>
      <Center flexDirection={'column'}>
        {/* <Rive src='https://apolocompany.s3.amazonaws.com/check.riv' /> */}
        <Image
          height={'110px'}
          src='https://cdn-icons-png.flaticon.com/512/5610/5610944.png'
        />
        <Text textAlign={'center'} fontWeight={'extrabold'} fontSize={'30px'}>
          {'Pedido realizado com sucesso!'.toUpperCase()}
        </Text>
        <Text textAlign={'center'}>ID: {data.id}</Text>
        {data.qrCode && (
          <Box my={'20px'}>
            <Box p={'10px'}>
              <Text fontSize={'25px'} color={'grey'}>
                {data.qrCode}
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
              <Image width={'45%'} src={route.state.qrCodeUrl} />
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
      </Center>
    </Box>
  )
}
