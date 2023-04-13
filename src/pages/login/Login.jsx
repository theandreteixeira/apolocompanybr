import { Text } from '@chakra-ui/react'
import { OrderAddress } from '../../components/orders/OrderAddress'
import { Loading } from '../../components/loading/Loading'
import { Error } from '../../components/loading/Error'
import { Summary } from '../../components/orders/Summary'
import { OrderBox } from '../../components/orders/OrderBox'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { OrderSection } from '../../components/orders/OrderSection'
import { dateFormator } from '../../utils/dateFormator'
import { setUserData } from '../../redux/features/auth/actions'
import { useLocation } from 'react-router-dom'

export const Login = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const handleOrdersGetRequest = async () => {
    try {
      setIsLoading(true)
      console.log('PARAMS' + searchParams)
      await setUserData()
      navigate('/')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    handleOrdersGetRequest()
  }, null)

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <>
      <Text>Carregando...</Text>
    </>
  )
}
