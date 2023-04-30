import { Box, Text } from '@chakra-ui/react'
import { ItemBox } from './ItemBox'
import { print } from '../../utils/print'

export const BagItems = ({ products }) => {
  print('PRODUCTS: abaixo:')
  print(products)

  return (
    <>
      <Box>
        <Text mb={'20px'} fontSize={'20px'} fontWeight={600}>
          SACOLA
        </Text>

        {products.map((item, index) => (
          <ItemBox key={index} {...item} index={index} data={item} />
        ))}
        {}
      </Box>
    </>
  )
}
