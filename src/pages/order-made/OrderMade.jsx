import { Box, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

export const OrderMade = () => {
  const route = useLocation()
  console.log(route)
  return (
    <Box>
      <Text>Pedido realizado com sucesso!</Text>
      <Text>Pedido realizado com sucesso!</Text>
      <Text>Pedido realizado com sucesso!</Text>
      <Text>Pedido realizado com sucesso!</Text>
      <Text>Pedido realizado com sucesso!</Text>
    </Box>
  )
}
