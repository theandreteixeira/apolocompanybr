import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ClothSection } from '../../components/home/ClothSection.jsx'
import {
  GenderSection,
  ShoeSection
} from '../../components/home/ShoeSection.jsx'
import { Banner } from '../../components/home/Banner.jsx'
import { Error } from '../../components/loading/Error.jsx'
import { Loading } from '../../components/loading/Loading.jsx'
import { getClothData } from '../../redux/features/home/actions.js'
import { setNavbarPath } from '../../redux/features/path/actions.js'
import { setItemSession } from '../../utils/sessionStorage.js'
import { Image, Box, Text, Center, Button, Icon } from '@chakra-ui/react'
import {
  beMember,
  menCollection,
  womenCollection,
  soccerCollection,
  flexCollection
} from '../../constants/images'
import { Carousel, MyStack } from '../../components/home/Carousel.jsx'
import { BsArrowRightShort } from 'react-icons/bs'
import { MySlide } from '../../components/home/Slide.jsx'
import { BigGridBox } from '../../components/home/GridBox.jsx'
import { BecomeAMember } from '../../components/home/BecomeAMember.jsx'
import '../../fonts.css'
import PageView from '../../components/home/PageView.jsx'
import { print } from '../../utils/print'
import { NoContent } from '../../components/home/NoContent.jsx'

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, clothData } = useSelector(state => state.homeReducer)

  const handleSection = gender => {
    print('é no genero? ' + gender)
    dispatch(setNavbarPath(gender))
    setItemSession('path', gender)
    navigate(`/${gender}`)
  }

  useEffect(() => {
    // dispatch(getClothData())
  }, [])

  return 
  //   loading ? (
  //   <Loading />
  // ) : error ? (
  //   <Error />
  // ) :
      (
    <>
      {
        <>
          <NoContent />
          {/* <Box
            m={'5px auto 15px'}
            w={['94%', '94%', '94%', '94%', '80%']}
            textAlign={'center'}
          >
            <Image src={flexCollection} />
            <Text
              fontSize={'38px'}
              textAlign={'start'}
              mt={'10px'}
              fontFamily={'Futura'}
            >
              APOLO FLEX
            </Text>
            <Text fontSize={'16px'} textAlign={'start'} mb={'10px'}>
              A primeira edição da Apolo conta com o estilo urbano e moderno.
              Confira.
            </Text>
            <Button
              h={'40px'}
              bg={'black'}
              color={'white'}
              border={`1px solid black`}
              w={'35%'}
              fontSize={'15px'}
              borderRadius='25'
              fontWeight={'normal'}
              mt={'5px'}
              mb={'20px'}
              onClick={() => {
                setItemSession('path', JSON.stringify({}))
                navigate('/allProducts')
              }}
            >
              Ver coleção <Icon as={BsArrowRightShort} />
            </Button>
          </Box>
          <Text mx={'10px'} fontSize={'24px'}>
            Para o seu gosto
          </Text>
          <MyStack
            image={menCollection}
            title={'Coleção FLEX para os homens'}
            onClick={() => {
              setItemSession('path', JSON.stringify({ gender: 'men' }))
              navigate('/men')
            }}
          />
          <MyStack
            image={womenCollection}
            title={'Coleção FLEX para as mulheres'}
            onClick={() => {
              setItemSession('path', JSON.stringify({ gender: 'women' }))
              navigate('/women')
            }}
          />
          <Box height={'30px'} />
          <Text mx={'10px'} fontSize={'24px'}>
            Em alta
          </Text>
          <Carousel
            products={[
              {
                id: '10',
                name: 'Camisa Preta Apolo Cry Now Laught Later',
                photo:
                  'https://apolobr.s3.amazonaws.com/roupas/camisa_cry_now_preta.png'
              },
              {
                id: '1',
                name: 'Camisa Apolo verde fluorescente',
                photo:
                  'https://apolobr.s3.amazonaws.com/roupas/camisa_verde_apolo.png'
              },
              {
                id: '14',
                name: 'Camisa Preta Apolo Basket',
                photo:
                  'https://apolobr.s3.amazonaws.com/roupas/camisa_cry_now_preta.png'
              },
              {
                id: '6',
                name: 'Camisa Apolo FLEX Azul',
                photo:
                  'https://apolobr.s3.amazonaws.com/roupas/camisa_rosa_fundo_azul.png'
              }
            ]}
          />
          <Box height={'50px'} />
          <Text mx={'10px'} fontSize={'24px'}>
            Veja também
          </Text>
          <PageView />
          <Box height={'20px'} />
          <Text mx={'10px'} fontSize={'24px'}>
            Futebol
          </Text>
          <MyStack
            image={soccerCollection}
            title={'A camisa do seu time do coração'}
            onClick={() => {
              setItemSession('path', JSON.stringify({ category: 'football' }))
              navigate('/allProducts')
            }}
          />
          <Box height={'20px'} />
          <Text mx={'10px'} fontSize={'24px'}>
            Novidade
          </Text>
          <Box
            m={'5px auto 15px'}
            w={['94%', '94%', '94%', '94%', '80%']}
            textAlign={'center'}
            onClick={() => {
              setItemSession('path', JSON.stringify({}))
              navigate('/description?id=21')
            }}
          >
            <Image
              src={
                'https://imgnike-a.akamaihd.net/branding/cdp-corinthians-13.4/assets/img/carrossel-camisas/camisa-1-a.png'
              }
            />
            <Text
              fontSize={'38px'}
              textAlign={'start'}
              my={'10px'}
              fontFamily={'Futura'}
              lineHeight={'none'}
            >
              NOVO MANTO DO TIMÃO
            </Text>
            <Text fontSize={'16px'} textAlign={'start'} mb={'10px'}>
              A mais nova camisa do Corinthians você encontra aqui.
            </Text>
            <Button
              h={'40px'}
              bg={'black'}
              color={'white'}
              border={`1px solid black`}
              w={'35%'}
              fontSize={'15px'}
              borderRadius='25'
              fontWeight={'normal'}
              mt={'5px'}
              mb={'20px'}
            >
              Ver camisa <Icon as={BsArrowRightShort} />
            </Button>
          </Box> */}
          {/* <Box height={'50px'} />
          <BecomeAMember />
          <ClothSection
            heading={'Apolo Flex'}
            description={'Peças da FLEX estao disponiveis'}
            img={[
              womenCollection,
              womenCollection,
              womenCollection,
              womenCollection
            ]}
            gender={'Masculino'}
            handleSection={undefined}
          /> */}
        </>
      }
    </>
  )
}
