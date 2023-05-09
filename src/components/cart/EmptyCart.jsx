import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { CheckoutBtn } from './CheckoutBtn'
import { useNavigate } from 'react-router-dom'

export const EmptyCart = () => {
  const navigate = useNavigate()
  return (
    <>
      <Flex align='center' justifyContent='center'>
        <Box>
          <Box align='center' position='relative' p={'20px'}>
            <Text fontSize={'25'} fontWeight={'extrabold'}>
              SUA SACOLA ESTÁ VAZIA
            </Text>
            <Box bg={'#C8FF0B'} w={'55px'} h={'4px'} mb={'10px'} />
            <Text fontSize={'18px'} mb={'30px'}>
              Nenhum item adicionado a sacola ainda.
            </Text>
            <CheckoutBtn
              onClick={() => navigate('/')}
              name='Voltar'
              bgColor={'black'}
              color='white'
              hoverBg={'white'}
              hoverBorder={'black'}
              borderColor={'black'}
              isLoading={false}
              disabled={false}
              hoverColor={'black'}
            />
          </Box>
        </Box>
      </Flex>
    </>
  )
}
