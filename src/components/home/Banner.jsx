import { GridItem, Image, Box, Grid } from '@chakra-ui/react'
import { HomeDescText, HomeText } from './HomeText'

export const Banner = ({ source }) => {
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
        <GridItem
          colSpan={2}
          cursor={'pointer'}
          h={['150px', '150px', '350px', '450px', '550px']}
          borderRadius={'15px'}
          overflow={'hidden'}
        >
          <Image mt={'-47%'} src={source} />
        </GridItem>
      </Grid>
    </Box>
  )
}
