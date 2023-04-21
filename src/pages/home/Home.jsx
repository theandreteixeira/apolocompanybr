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
  womenCollection
} from '../../constants/images'

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
          {collections.map(item => {
            return (
              <Box
                m={'30px auto 30px'}
                w={['94%', '94%', '94%', '94%', '80%']}
                textAlign={'center'}
                onClick={() => {
                  setItemSession('path', JSON.stringify({ gender: item.path }))
                  navigate(item.link)
                }}
              >
                <Image src={item.photo} />
              </Box>
            )
          })}
          <Box m={'25px auto 25px'} w={['94%', '94%', '94%', '94%', '80%']}>
            <Link to={'/auth'}>
              <Image src={beMember} />
            </Link>
          </Box>
        </>
      }
    </>
  )
}
