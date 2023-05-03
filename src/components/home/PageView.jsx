import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import SwipeableViews from 'react-swipeable-views'
import { Box, Image, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const PageView = () => {
  const styles = {
    root: {
      padding: '0 30px'
    },
    slideContainer: {
      padding: '0 10px'
    },
    slide: {
      padding: 15,
      minHeight: 100,
      color: '#fff'
    },
    slide1: {
      backgroundColor: '#FEA900'
    },
    slide2: {
      backgroundColor: '#B3DC4A'
    },
    slide3: {
      backgroundColor: '#6AC0FF'
    }
  }

  const camisas = [
    {
      id: '22',
      name: 'Camisa Barcelona 22/23',
      photo: 'https://imgnike-a.akamaihd.net/1920x1920/02192515.jpg'
    },
    {
      id: '24',
      name: 'Camisa Real Madrid 22/23',
      photo:
        'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/aa1b019f4d9648ac87e6adde01234edd_9366/Camisa_1_Real_Madrid_22-23_Branco_HF0291_21_model.jpg'
    },
    {
      id: '23',
      name: 'Camisa Totteham 22/23',
      photo: 'https://imgnike-a.akamaihd.net/1920x1920/02192251.jpg'
    }
  ]

  return (
    <Stack
      direction='column'
      spacing='4'
      align='center'
      mx={'5px'}
      w={['94%', '94%', '94%', '94%', '80%']}
      my={'15px'}
    >
      <SwipeableViews style={styles.root} slideStyle={styles.slideContainer}>
        {camisas.map(camisa => {
          return (
            <Link to={{ pathname: '/description', search: '?id=' + camisa.id }}>
              <Stack>
                <Image
                  objectFit='cover'
                  w='100%'
                  h='auto'
                  src={camisa.photo}
                  mb={'10px'}
                />
                <Text fontSize='md' lineHeight={0}>
                  {camisa.name}
                </Text>
                <Text fontSize='sm' color={'grey'}>
                  {'Futebol'}
                </Text>
              </Stack>
            </Link>
          )
        })}
      </SwipeableViews>
    </Stack>
  )
}

export default PageView
