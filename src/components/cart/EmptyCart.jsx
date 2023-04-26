import { Box, Flex, Text } from '@chakra-ui/react'

export const EmptyCart = () => {
  return (
    <>
      <Flex align='center' justifyContent='center'>
        <Box align='center' position='relative' p={'20px'}>
          <Text fontSize={'25'} fontWeight={'extrabold'}>
            SUA SACOLA ESTÁ VAZIA
          </Text>
          <Text fontSize={'20px'}>Nenhum item adicionado a sacola ainda.</Text>
        </Box>
      </Flex>
    </>
  )
}
