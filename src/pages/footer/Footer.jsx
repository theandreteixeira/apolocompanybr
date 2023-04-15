import { Box, Center, Flex, Grid, Icon, Link, Text } from '@chakra-ui/react'
import { FaInstagramSquare } from 'react-icons/fa'
import { IconLink } from '../../components/footer/IconLink'

export const Footer = () => {
  return (
    <Box
      h={'450px'}
      bg={'black'}
      color={'white'}
      mt={'80px'}
      paddingTop={'60px'}
    >
      <Grid
        h={'220px'}
        p={'10px'}
        templateColumns={['100%', '48% 2% 50%', '48% 2% 50%', '25% 25% 50%']}
      >
        <Center>
          <Flex
            fontSize={['13px', '16px', '17px', '17px', '17px']}
            gap={'10px'}
            fontWeight={600}
            flexDirection={'column'}
          >
            <Link>CAMISAS</Link>
            <Link>ACADEMIA</Link>
            <Link>JAQUETAS E MOLETONS</Link>
            <Link>ACESSÓRIOS</Link>
          </Flex>
        </Center>

        <Center>
          <Flex
            display={['none', 'none', 'none', 'flex', 'flex']}
            fontSize={'14px'}
            gap={'10px'}
            flexDirection={'column'}
            color={'gray'}
          >
            <Link color={'white'} fontWeight={600}>
              AJUDA
            </Link>
            <Link>Status do pedido</Link>
            <Link>Entrega</Link>
            <Link>Devoluções</Link>
            <Link>Formas de pagamento</Link>
          </Flex>
        </Center>

        <Flex
          mt={'20px'}
          gap={'15px'}
          flexDirection={'row-reverse'}
          justifyContent={['center', 'right', 'right', 'right', 'right']}
          color={'gray'}
          mr={['0px', '30px', '80px', '80px', '80px']}
        >
          <IconLink
            icon={FaInstagramSquare}
            link={'https://instagram.com/apolocompbr'}
          />
        </Flex>
      </Grid>
    </Box>
  )
}
