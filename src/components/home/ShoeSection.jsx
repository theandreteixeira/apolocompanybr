import { Box, Grid } from '@chakra-ui/react'
import { BigGridBox, SmallGridBox } from './GridBox'
import { HomeDescText, HomeText } from './HomeText'

export const ShoeSection = ({ title, description, photos }) => {
  return (
    <Box
      m={'60px auto 60px'}
      w={['94%', '94%', '94%', '94%', '80%']}
      textAlign={'center'}
    >
      <HomeText>{title}</HomeText>
      <HomeDescText>{description}</HomeDescText>

      <Grid
        onClick={() => {}}
        gap={['10px', '10px', '10px', '10px', '20px']}
        templateColumns={'repeat(2, 1fr)'}
      >
        <SmallGridBox source={photos[1]} />
        <SmallGridBox source={photos[2]} />
      </Grid>
    </Box>
  )
}

export const GenderSection = ({ photos }) => {
  return (
    <Box
      m={'60px auto 60px'}
      w={['94%', '94%', '94%', '94%', '80%']}
      textAlign={'center'}
    >
      <Grid
        onClick={() => {}}
        gap={['10px', '10px', '10px', '10px', '20px']}
        templateColumns={'repeat(2, 1fr)'}
      >
        <SmallGridBox source={photos[1]} />
        <SmallGridBox source={photos[2]} />
      </Grid>
    </Box>
  )
}
