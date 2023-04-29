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
import { Image, Box, Text, Center, Button } from '@chakra-ui/react'
import {
  beMember,
  menCollection,
  womenCollection,
  flexCollection
} from '../../constants/images'
import { Carousel } from '../../components/home/Carousel.jsx'
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
            {/* <Carousel /> */}
            <Text fontSize={'26px'} textAlign={'start'}>
              APOLO FLEX
            </Text>
            <Text
              fontSize={'16px'}
              mb={'5px'}
              textAlign={'start'}
              color={'grey'}
            >
              A primeira edição da Apolo conta com o estilo urbano e moderno.
              Confira.
            </Text>
            <Image src={flexCollection} />
          </Box>
          <Box
            m={'30px auto 30px'}
            w={['94%', '94%', '94%', '94%', '80%']}
            textAlign={'center'}
            onClick={() => {
              setItemSession('path', JSON.stringify({ gender: 'men' }))
              navigate('/men')
            }}
          >
            <Text fontSize={'26px'} textAlign={'start'}>
              Coleção masculina
            </Text>
            <Text
              fontSize={'16px'}
              mb={'5px'}
              textAlign={'start'}
              color={'grey'}
            >
              Confira as roupas da edição Apolo FLEX para os homens.
            </Text>
            <Image src={menCollection} />
          </Box>
          <Box
            m={'30px auto 30px'}
            w={['94%', '94%', '94%', '94%', '80%']}
            textAlign={'center'}
            onClick={() => {
              setItemSession('path', JSON.stringify({ gender: 'women' }))
              navigate('/women')
            }}
          >
            <Text fontSize={'26px'} textAlign={'start'}>
              Coleção feminina
            </Text>
            <Text
              fontSize={'16px'}
              mb={'5px'}
              textAlign={'start'}
              color={'grey'}
            >
              Confira as roupas da edição Apolo FLEX para as mulheres.
            </Text>
            <Image src={womenCollection} />
          </Box>
        </>
      }
    </>
  )
}
