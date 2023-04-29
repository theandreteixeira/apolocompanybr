import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
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
    <Box mb={'15px'}>
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
