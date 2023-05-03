import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './CustomSlider.css'
import { Link } from 'react-router-dom'

export const Carousel = ({ products }) => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }
  return (
    <Box
      m={'5px auto 15px'}
      w={['94%', '94%', '94%', '94%', '80%']}
      maxW='1200px'
      mx='auto'
      h='400px'
    >
      <Slider {...settings} className='custom-slider'>
        {products.map(product => {
          return (
            <Box px={'10px'} display={'flex'} justifyContent={'center'}>
              <Link
                to={{ pathname: '/description', search: '?id=' + product.id }}
              >
                <Box
                  position={'absolute'}
                  zIndex={2}
                  display='flex'
                  flexDirection='column'
                  justifyContent='flex-end'
                  h='380px'
                  p={'15px'}
                >
                  <Text
                    fontSize={'15px'}
                    // w={'85%'}
                    lineHeight={'none'}
                    textAlign={'center'}
                  >
                    {product.name}
                  </Text>
                </Box>
                <Image
                  src={product.photo}
                  bg={'#F5F5F5'}
                  w={'100%'}
                  objectFit={'cover'}
                  h='380px'
                />
              </Link>
            </Box>
          )
        })}
      </Slider>
    </Box>
  )
}

export const MyStack = ({ image, title, onClick }) => {
  return (
    <Box
      bg='#EEEEEE'
      h='380px'
      w={['94%', '94%', '94%', '94%', '80%']}
      mx={'10px'}
      my={'10px'}
      display={'flex'}
      justifyContent={'center'}
    >
      <Box
        position={'absolute'}
        zIndex={2}
        w={['94%', '94%', '94%', '94%', '80%']}
        display='flex'
        flexDirection='column'
        justifyContent='flex-end'
        padding={'20px'}
        h='380px'
      >
        <Text mb={'20px'} fontSize={'20px'} w={'60%'} color={'white'}>
          {title}
        </Text>
        <Button
          onClick={onClick}
          h={'40px'}
          bg={'white'}
          color={'black'}
          border={`1px solid white`}
          w={'35%'}
          fontSize={'14px'}
          borderRadius='25'
          fontWeight={'normal'}
          mb={'20px'}
        >
          Ver coleção <Icon as={BsArrowRightShort} />
        </Button>
      </Box>
      <Image h='380px' w={'100%'} objectFit={'cover'} src={image} />
    </Box>
  )
}
