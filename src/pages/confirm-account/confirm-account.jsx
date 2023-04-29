import {
  Grid,
  Text,
  useToast,
  HStack,
  PinInput,
  PinInputField,
  Box,
  Button,
  Image
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRequest } from '../../redux/features/products/actions'
import { useNavigate } from 'react-router-dom'
import { getItemSession } from '../../utils/sessionStorage'
import { Loading } from '../../components/loading/Loading'
import { Error } from '../../components/loading/Error'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
        <Box p={'25px'}>
          <Text fontWeight={'extrabold'} fontSize={'24px'}>
            CONFIRME A SUA CONTA
          </Text>
          <Text>Digite o código que enviamos no seu e-mail:</Text>
          <HStack>
            <PinInput>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <Button
            onClick={() => {}}
            h={'60px'}
            bg={'black'}
            color={'white'}
            border={`1px solid black`}
            w={'100%'}
            fontSize={'17px'}
            borderRadius='0'
            mb={'20px'}
            isDisabled={false}
            _hover={{ bg: 'black', borderColor: 'black' }}
          >
            {isLoading ? <Spinner /> : 'Verificar'}
          </Button>
        </Box>
      )}
    </>
  )
}
