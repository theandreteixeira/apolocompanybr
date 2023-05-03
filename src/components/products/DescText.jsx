import { Text } from '@chakra-ui/react'

export const DescText = ({ children }) => {
  return (
    <Text fontSize={['13px', '13px', '14px', '17px', '18px']} color={'gray'}>
      {children}
    </Text>
  )
}

export const PriceText = ({ children }) => {
  return (
    <>
      <Text
        fontSize={['14px', '18px', '15px', '18px', '18px']}
        fontWeight={600}
        my={'6px'}
      >
        {children}
      </Text>
    </>
  )
}
