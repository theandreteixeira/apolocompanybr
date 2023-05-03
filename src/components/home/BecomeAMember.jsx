import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { apoloDark, apoloLight } from '../../constants/images'
import '../../fonts.css'
import { useNavigate } from 'react-router-dom'

export const BecomeAMember = () => {
  const navigate = useNavigate()
  return (
    <>
      <Text mx={'10px'} fontSize={'24px'}>
        Apolo Membros
      </Text>
      <Box
        bg='black'
        w={['94%', '94%', '94%', '94%', '80%']}
        my={'10px'}
        mx={'10px'}
        py={'20px'}
        px={'20px'}
        h='420px'
        display='flex'
        flexDirection={'column'}
        justifyContent='space-around'
      >
        <Image src={apoloDark} w={'20%'} />
        <Text
          fontFamily={'Futura'}
          color='white'
          w={'80%'}
          fontSize={'45px'}
          lineHeight={'none'}
        >
          SEJA UM MEMBRO
        </Text>
        <Text color='white'>Cadastre-se de graça. Junte-se a nós.</Text>
        <Flex>
          <Button
            onClick={() => navigate('/auth')}
            h={'40px'}
            bg={'white'}
            color={'black'}
            border={`1px solid white`}
            w={'35%'}
            fontSize={'16px'}
            borderRadius='25'
            fontWeight={'normal'}
            mb={'20px'}
            mr={'10px'}
          >
            Cadastrar
          </Button>
          <Button
            onClick={() => navigate('/auth')}
            h={'40px'}
            bg={'white'}
            color={'black'}
            border={`1px solid white`}
            w={'35%'}
            fontSize={'16px'}
            borderRadius='25'
            fontWeight={'normal'}
            mb={'20px'}
          >
            Entrar
          </Button>
        </Flex>
      </Box>
    </>
  )
}
