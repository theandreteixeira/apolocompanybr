import { Box, Button, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const NoContent = () => {
  return (
    <>
      <Box padding={'50px'}>
        <Text fontSize={'20px'}>
          A Apolo agora é Apolo Mafia, estamos preparando o nosso primeiro lançamento, acompanhe-nos no nosso Instagram e fique por dentro das novidades: @apolomafiaofc
        </Text>
        <br />
        <Link to={'https://instagram.com/apolomafiaofc'}>
          <Text color={'blue'} fontWeight={'bold'}>
            {'Ir para o Instagram'}
          </Text>
        </Link>
      </Box>
    </>
  )
}
