import { Box, Text } from '@chakra-ui/react'

export const Error = () => {
  return (
    <Box my={'140px'}>
      <Text fontSize={'20px'} fontWeight={500} textAlign={'center'}>
        {'Ops! Algo deu errado :('}
      </Text>
    </Box>
  )
}
