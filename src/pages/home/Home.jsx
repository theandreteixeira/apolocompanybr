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
  flexCollection
} from '../../constants/images'
import { Carousel, MyStack } from '../../components/home/Carousel.jsx'
import { BsArrowRightShort } from 'react-icons/bs'
import { MySlide } from '../../components/home/Slide.jsx'

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, clothData } = useSelector(state => state.homeReducer)

  const handleSection = gender => {
    console.log('é no genero? ' + gender)
    dispatch(setNavbarPath(gender))
    setItemSession('path', gender)
    navigate(`/${gender}`)
  }

  const collections = [
    {
      photo: menCollection,
      link: '/men',
      path: 'men'
    },
    {
      photo: womenCollection,
      link: '/women',
      path: 'women'
    }
  ]

  useEffect(() => {
    dispatch(getClothData())
  }, [])

  return loading ? (
    <Loading />
  ) : error ? (
    <Error />
  ) : (
    <>
      {
        <>
          <Box
            m={'5px auto 15px'}
            w={['94%', '94%', '94%', '94%', '80%']}
            textAlign={'center'}
            onClick={() => {
              setItemSession('path', JSON.stringify({}))
              navigate('/allProducts')
            }}
          >
            <Text fontWeight={'bold'} fontSize={'24px'} textAlign={'start'}>
              APOLO FLEX
            </Text>
            <Image src={flexCollection} />
            <Text fontSize={'18px'} my={'5px'} textAlign={'center'}>
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
              mb={'20px'}
            >
              Ver coleção <Icon as={BsArrowRightShort} />
            </Button>
          </Box>
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
          {/* <Carousel /> */}
        </>
      }
    </>
  )
}
