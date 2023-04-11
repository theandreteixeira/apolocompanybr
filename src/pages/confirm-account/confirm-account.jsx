import { Grid, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRequest } from '../../redux/features/products/actions'
import { useNavigate } from 'react-router-dom'
import { getItemSession } from '../../utils/sessionStorage'
import { Loading } from '../../components/loading/Loading'
import { Error } from '../../components/loading/Error'

export const ConfirmAccount = () => {
  const { isLoading, isError } = useSelector(state => state.prodReducer)
  const path = getItemSession('path')
  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getRequest(path))
  }, [path])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        <Grid
          gap={[2, 4]}
          p={['10px', '10px', '20px', '20px', '20px']}
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)'
          ]}
        >
          <Text>Verificação de conta aqui</Text>
        </Grid>
      )}
    </>
  )
}
