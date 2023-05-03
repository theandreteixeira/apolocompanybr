import { Box, Center, Flex, Image, Spacer, Text } from '@chakra-ui/react'
import { numberWithCommas, shortString } from '../../utils/extraFunctions'
import { DescText, PriceText } from './DescText'
import { handleCategory } from '../../utils/handleCategory'
import { Link } from 'react-router-dom'

export const ProductDisplayBox = ({
  id,
  name,
  price,
  photos,
  onClick,
  category,
  sizes,
  oldPrice
}) => {
  return (
    <>
      <Link to={{ pathname: '/description', search: '?id=' + id }}>
        <Flex
          // onClick={onClick}
          flexDirection={'column'}
          cursor='pointer'
          mb={'10px'}
        >
          <Box overflow={'hidden'} bg={'#F3F3F3'} height={'200px'}>
            <Image
              className='imgAnimation'
              src={photos[0]}
              objectFit={'cover'}
              height={'200px'}
            />
          </Box>
          <Box>
            <Flex justifyItems={'center'} mt={'10px'}>
              <Text
                fontSize={['13px', '15px', '17px', '17px', '18px']}
                fontWeight={500}
              >
                {name}
              </Text>
            </Flex>

            <DescText>{handleCategory(category)}</DescText>
            <Box display={'flex'}>
              <Text
                textDecoration={'line-through'}
                fontSize={['11px', '15px', '12px', '15px', '15px']}
              >
                R${numberWithCommas(oldPrice)}
              </Text>
              <Box ml={'5px'} bg={'green.400'} p={'2px'} borderRadius={'md'}>
                <Text
                  color={'white'}
                  fontSize={['8px', '12px', '9px', '12px', '12px']}
                >
                  {parseInt(((oldPrice - price) / oldPrice) * 100)} %
                </Text>
              </Box>
            </Box>
            <PriceText>R${numberWithCommas(price)}</PriceText>
          </Box>
        </Flex>
      </Link>
    </>
  )
}
