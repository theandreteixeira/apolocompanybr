import { Box, Button, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const NoContent = () => {
  return (
    <>
      <Box padding={'50px'}>
        <Text fontSize={'18px'}>
          Nenhuma seção disponível. O conteúdo foi removido para a próxima linha
          de roupas, aguarde a data definitiva no Instagram: @apolobr_oficial
        </Text>
        <br />
        <Link to={'https://instagram.com/apolobr_oficial'}>
          <Text color={'blue'} fontWeight={'bold'}>
            {'Ir para o Instagram'}
          </Text>
        </Link>
      </Box>
    </>
  )
}
