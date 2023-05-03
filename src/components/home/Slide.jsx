import React from 'react'
import { Flex, Box, Image, Text, VStack, Stack } from '@chakra-ui/react'

export const MySlide = () => {
  const camisas = [
    {
      id: '',
      name: 'Camisa Barcelona 23/24',
      photo: 'https://imgnike-a.akamaihd.net/1920x1920/02192515.jpg'
    },
    {
      id: '',
      name: 'Camisa Liverpool 23/24',
      photo: 'https://imgnike-a.akamaihd.net/1920x1920/021924P1.jpg'
    },
    {
      id: '',
      name: 'Camisa Totteham 23/24',
      photo: 'https://imgnike-a.akamaihd.net/1920x1920/02192251.jpg'
    }
  ]
  return (
    <Flex
      overflowX='scroll'
      flexWrap='nowrap'
      w='100%'
      maxW='100vw'
      css={{
        '::-webkit-scrollbar': {
          display: 'none'
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none'
      }}
      my={'10px'}
    >
      {camisas.map(camisa => {
        return (
          <Stack
            direction='column'
            spacing='4'
            align='center'
            mx={'5px'}
            w={['94%', '94%', '94%', '94%', '80%']}
          >
            <Box w='300px'>
              <Image objectFit='cover' w='100%' h='auto' src={camisa.photo} />
            </Box>
            <Text fontSize='md' lineHeight={0}>
              {camisa.name}
            </Text>
            <Text fontSize='sm' color={'grey'}>
              {'Futebol'}
            </Text>
          </Stack>
        )
      })}
    </Flex>
  )
}
