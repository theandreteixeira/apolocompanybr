import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

const responsiveSettings = [
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3
    }
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
]
const Fotos = ({ photos }) => {
  return (
    <div>
      <Slide
        slidesToScroll={2}
        slidesToShow={2}
        indicators={true}
        responsive={responsiveSettings}
      >
        {photos.map((image, index) => (
          <Box key={index} bg={'#F3F3F3'}>
            <Image src={image} cursor={'pointer'} />
          </Box>
        ))}
      </Slide>
    </div>
  )
}

export default Fotos
