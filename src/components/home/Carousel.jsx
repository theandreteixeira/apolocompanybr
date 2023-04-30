import { Box, Button, Icon, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const Carousel = () => {
  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    autoplay: false,
    speed: 200,
    autoplaySpeed: 500,
    cssEase: 'linear'
  }
  return (
    <Box mb={'15px'} w={['94%', '94%', '94%', '94%', '80%']}>
      <Slider {...settings}>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(i => {
          return (
            <Box padding={'10px'}>
              <Image src='https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/w_300,c_limit/15cdc7b5-6de0-4d5c-81e9-6d01fc944b18/nike-just-do-it.jpg' />
              <Text fontSize='xl'>Air Force 1</Text>
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
        <Text
          mb={'20px'}
          textShadow='1px 1px 15px black'
          fontSize={'20px'}
          w={'60%'}
          color={'white'}
        >
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
