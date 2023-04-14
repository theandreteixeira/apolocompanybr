import { Button, Image, Input, Text, useToast, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getLoginSuccess,
  showResetPage,
  getLoginByGoogleSuccess
} from '../../redux/features/auth/actions'
import { setToast } from '../../utils/extraFunctions'
import { isLoginFormEmpty } from '../../utils/formValidator'
import { AuthBtn } from './AuthBtn'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleInputChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value })
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    const isEmpty = isLoginFormEmpty(form)
    if (!isEmpty.status) {
      return setToast(toast, isEmpty.message, 'error')
    }
    dispatch(getLoginSuccess(form, toast, navigate, setIsLoading))
  }

  const displayReset = () => {
    dispatch(showResetPage())
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <VStack
          w={['95%', '95%', '85%', '85%', '85%', '85%']}
          mx={'auto'}
          gap={'8px'}
        >
          <Input
            onChange={handleInputChange}
            name='email'
            type={'email'}
            placeholder='Email address'
          />

          <Input
            onChange={handleInputChange}
            name='password'
            type={'password'}
            placeholder='Password'
          />

          <Text
            onClick={displayReset}
            _hover={{ textDecoration: 'underline' }}
            w={'100%'}
            color={'#b0a8af'}
            textAlign={'right'}
            my={'10px'}
            cursor={'pointer'}
          >
            Esqueceu a senha?
          </Text>

          <AuthBtn
            value={'LOGIN'}
            isDisabled={isLoading}
            isLoading={isLoading}
          />
          <Button
            w={'100%'}
            p={'25px'}
            onClick={() => dispatch(getLoginByGoogleSuccess())}
          >
            <Image
              height={'25px'}
              mr={'10px'}
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png'
            />
            Fazer login com o Google
          </Button>
        </VStack>
      </form>
    </>
  )
}
