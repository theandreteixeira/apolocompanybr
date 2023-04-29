import React from 'react'
import { Flex, Box, Image, Text, VStack, Stack } from '@chakra-ui/react'

export const MySlide = () => {
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
      {[2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3].map(i => {
        return (
          <Stack direction='column' spacing='4' align='center' mx={'5px'}>
            <Box w='300px'>
              <Image
                objectFit='cover'
                w='100%'
                h='auto'
                src='https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/w_300,c_limit/15cdc7b5-6de0-4d5c-81e9-6d01fc944b18/nike-just-do-it.jpg'
              />
            </Box>
            <Text fontSize='xl'>Air Force 1</Text>
          </Stack>
        )
      })}
    </Flex>
  )
}
