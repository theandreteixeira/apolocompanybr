import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ClothSection } from '../../components/home/ClothSection.jsx'
import { ShoeSection } from '../../components/home/ShoeSection.jsx'
import { Banner } from '../../components/home/Banner.jsx'
import { Error } from '../../components/loading/Error.jsx'
import { Loading } from '../../components/loading/Loading.jsx'
import { getClothData, getShoeData } from '../../redux/features/home/actions.js'
import { setNavbarPath } from '../../redux/features/path/actions.js'
import { setItemSession } from '../../utils/sessionStorage.js'
import { Image, Box, Text, Center, Button } from '@chakra-ui/react'

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

  useEffect(() => {
    dispatch(getClothData())
    dispatch(getShoeData())
  }, [])

  return loading ? (
    <Loading />
  ) : error ? (
    <Error />
  ) : (
    <>
      {/* {shoeData.map((data, index) => (
                <ShoeSection handleSection={handleSection} key={index} {...data} />
            ))} */}

      {clothData.map((data, index) => (
        <ClothSection handleSection={handleSection} key={index} {...data} />
      ))}
      {/* { Banner({source: 'https://imgnike-a.akamaihd.net/branding/home-sbf/touts/tout-liverpool-LBJ-22-03-desk-v2.jpg'}) } */}
      {
        <Box m={'60px auto 60px'} w={['94%', '94%', '94%', '94%', '80%']}>
          <Image src='https://imgnike-a.akamaihd.net/branding/home-sbf/touts/tout-future-fitness-30-01-desk-v2.jpg' />
        </Box>
      }
      {
        <>
          <Box align='center' my={'10px'}>
            <Image
              m={'25px auto 25px'}
              w={['94%', '94%', '94%', '94%', '80%']}
              borderRadius={'15px'}
              src='https://cdn.pixabay.com/photo/2017/12/17/12/45/football-3024154_1280.jpg'
            ></Image>
            <Text
              fontWeight={1000}
              fontFamily={"'Roboto', sans-serif"}
              fontSize={['20px', '25px', '40px', '45px', '45px']}
              mt={'10px'}
              textAlign={'center'}
            >
              {'lebron x Liverpool FC'.toUpperCase()}
            </Text>
            <Text
              fontSize={['14px', '15px', '16px', '16px', '16px']}
              textAlign={'center'}
            >
              Alcance sua própria grandeza com a nova coleção inspirada no
              legado que eles deixaram em suas comunidades.
            </Text>
            <Center>
              <Button
                color={'white'}
                onClick={() => navigate('/cart')}
                bg={'black'}
                border={`1px solid ${'#cecdce'}`}
                borderRadius='50'
                fontSize={'15px'}
                mb={'20px'}
                px={'35px'}
                py={'20px'}
                mt={'15px'}
                _hover={{ bg: 'black', borderColor: 'black' }}
              >
                Ver mais
              </Button>
            </Center>
          </Box>
        </>
      }
    </>
  )
}
