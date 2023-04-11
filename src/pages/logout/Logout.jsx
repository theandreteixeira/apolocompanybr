import { Text } from '@chakra-ui/react'
import { Loading } from '../../components/loading/Loading'
import { Error } from '../../components/loading/Error'
import { useEffect, useState } from 'react'
import { logout } from '../../redux/features/auth/actions'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const handleOrdersGetRequest = async () => {
    try {
      console.log('entrou no logout page')
      setIsLoading(true)
      await logout()
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
