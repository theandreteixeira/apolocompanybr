import { Text, useToast } from '@chakra-ui/react'
import { Loading } from '../../components/loading/Loading'
import { Error } from '../../components/loading/Error'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutFromAccount } from '../../redux/features/auth/actions'
import { print } from '../../utils/print'

export const Logout = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const dispatch = useDispatch()

  const handleOrdersGetRequest = async () => {
    try {
      print('entrou no logout page')
      setIsLoading(true)
      dispatch(logoutFromAccount(toast, navigate))
    } catch (error) {
      print(error)
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
