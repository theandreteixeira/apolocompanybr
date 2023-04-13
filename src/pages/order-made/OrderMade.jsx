import { Badge, Box, Icon, IconButton, Image, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { MdOutlineContentCopy } from 'react-icons/md'

export const OrderMade = () => {
  const route = useLocation()
  console.log(route)
  const data = route.state.data
  return (
    <Box>
      <Text>Pedido realizado com sucesso!</Text>
      {data.charges[0].last_transaction.qr_code && (
        <Box my={'20px'}>
          <Text fontWeight={'bold'} fontSize={'25px'}>
            {data.charges[0].last_transaction.qr_code}
          </Text>
          <IconButton
            aria-label='Search database'
            icon={
              <Icon
                as={MdOutlineContentCopy}
                onClick={() => {
                  const selection = window.getSelection()
                  const range = document.createRange()
                  range.selectNodeContents(
                    data.charges[0].last_transaction.qr_code
                  )
                  selection.removeAllRanges()
                  selection.addRange(range)
                  document.execCommand('copy')
                  selection.removeAllRanges()
                }}
              />
            }
          />
          <Image
            width={'120px'}
            src={route.state.data.charges[0].last_transaction.qr_code_url}
          />
          <Badge color={'blue.500'}>
            Se você já pagou, por favor desconsidere o qrcode.
          </Badge>
        </Box>
      )}
    </Box>
  )
}
