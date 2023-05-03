import { Text } from '@chakra-ui/react'

export const HomeText = ({ children }) => {
  return (
    <Text
      fontWeight={600}
      fontFamily={"'Roboto', sans-serif"}
      fontSize={['35px', '40px', '55px', '60px', '60px']}
      textAlign={'start'}
    >
      {children.toUpperCase()}
    </Text>
  )
}

export const HomeDescText = ({ children }) => {
  return (
    <Text
      mb={['10px']}
      px={['10px', '15px', '30px', '50px', '100px']}
      fontSize={['14px', '15px', '16px', '16px', '16px']}
      textAlign={'start'}
    >
      {children}
    </Text>
  )
}
