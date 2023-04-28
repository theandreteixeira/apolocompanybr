import { Box, Center, Flex, Icon, Image, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { MdOutlineContentCopy } from 'react-icons/md'
import { BsCheckCircle } from 'react-icons/bs'
import { useRef, useState } from 'react'
import copy from 'copy-to-clipboard'
import { numberWithCommas } from '../../utils/extraFunctions'
import { check, thankyou } from '../../constants/images'

export const OrderMade = () => {
  const route = useLocation()
  const [isCopied, setIsCopied] = useState(false)
  const locationRef = useRef(route)
  const data = locationRef.current.state
  return data ? (
    <Box p={'15px'}>
      <Center flexDirection={'column'}>
        <Image height={'90px'} width={'90px'} src={check} mb={'15px'} />
        <Text textAlign={'center'} fontWeight={'extrabold'} fontSize={'25'}>
          {'Pedido realizado com sucesso!'.toUpperCase()}
        </Text>
        <Text textAlign={'center'}>
          <strong>ID:</strong> {data.id}
        </Text>
        {data.qrCode && (
          <Box my={'20px'} width={'100%'}>
            <Box
              p={'10px'}
              width={'100%'}
              border='2px dashed grey'
              borderRadius={'5px'}
              mb={'5px'}
            >
              <Text fontSize={'18px'} color={'grey'}>
                {
                  '00020126330014br.gov.bcb.pix01111335366962052040000530398654040.805802BR5919NOME6014CIDADE62580520LKH2021102118215467250300017br.gov.bcb.brcode01051.0.063044D24'
                }
              </Text>
            </Box>
            <Text
              aria-label='Search database'
              onClick={() => {
                copy(data.qrCode)
                setIsCopied(true)
              }}
              color={'red'}
              fontWeight={'bold'}
              fontSize={'14px'}
            >
              <Icon
                as={isCopied ? BsCheckCircle : MdOutlineContentCopy}
                mr={'5px'}
              />
              {isCopied ? 'Copiado!' : 'Copiar'}
            </Text>
            <Center flexDirection={'column'}>
              <Image width={'150px'} src={data.qrCodeUrl} my={'25px'} />
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
      <Box display={'flex'} textAlign='start' my={'10px'}>
        <Text fontWeight={'extrabold'} fontSize={'20px'}>
          {'Detalhes do pedido'.toUpperCase()}
        </Text>
      </Box>
      <Box mb={'25px'}>
        <Text>
          <strong>Subtotal:</strong> R$
          {numberWithCommas(data.orderSummary.subTotal)}
        </Text>
        <Text>
          <strong>Quantidade:</strong> {data.orderSummary.quantity}
        </Text>
        <Text>
          <strong> Desconto:</strong> R$
          {numberWithCommas(data.orderSummary.discount)}
        </Text>
        <Text>
          <strong> Frete:</strong> R$
          {numberWithCommas(data.orderSummary.shipping)}
        </Text>
        <Text>
          <strong> Total:</strong> R${numberWithCommas(data.orderSummary.total)}
        </Text>
      </Box>
      <Image src={thankyou} mt={'20px'} width={'100%'} />
    </Box>
  ) : (
    <Box>
      O seu pedido não pode ser exibido. Vá em seu perfil e veja todos os seus
      pedidos.
    </Box>
  )
}
