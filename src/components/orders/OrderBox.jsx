import { Box, Center, Grid, Image, Text } from '@chakra-ui/react'
import { numberWithCommas } from '../../utils/extraFunctions'

export const OrderBox = ({ photos, name, price, quantity }) => {
  return (
    <Grid templateColumns={'100px 60%'} p={'5px'}>
      <Box w={'100px'} overflow={'hidden'}>
        <Image src={photos[0]} />
      </Box>
      <Center>
        <Box px={'20px'} w={'100%'}>
          <Text fontWeight={600}>{name}</Text>
          <Text>Preço: R${numberWithCommas(price)}</Text>
          <Text>Quantidade: {quantity}</Text>
        </Box>
      </Center>
    </Grid>
  )
}
