import { isCheckoutFormEmpty, validatePinCode } from '../../utils/formValidator'
import { CheckoutOrderSummary } from '../../components/checkout/CheckoutOrderSummary'
import {
  CheckoutForm,
  SelectAddress
} from '../../components/checkout/CheckoutForm'
import { Box, useToast, Text } from '@chakra-ui/react'
import { setToast } from '../../utils/extraFunctions'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { initPayment } from '../payment/razorpay'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Checkout = () => {
  const { orderSummary, cartProducts } = useSelector(
    state => state.cartReducer,
    shallowEqual
  )
  const token = useSelector(state => state.authReducer.token)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  const handleAddressGetRequest = async () => {
    try {
      setIsLoading(true)
      // let { data } = await axios.get('/obterPedidos'});
      await new Promise((res, rej) => {
        res('')
      }, 5000)
      const mock = [
        {
          addressLine1: 'Rua José Bandeira da Mota',
          addressLine2: '705',
          pinCode: '39272014',
          city: 'Pirapora',
          country: 'Brasil',
          state: 'Minas Gerais'
        }
      ]
      setData(mock)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsError(true)
    }
  }

  const [form, setForm] = useState({
    addressLine1: '',
    addressLine2: '',
    locality: '',
    pinCode: '',
    state: '',
    country: ''
  })
  const toast = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value })
  }

  const handleFormValidation = form => {
    const isEmpty = isCheckoutFormEmpty(form)
    if (!isEmpty.status) {
      setToast(toast, isEmpty.message, 'error')
      return isEmpty.status
    }
    const isPinCode = validatePinCode(form.pinCode)
    if (!isPinCode.status) {
      setToast(toast, isPinCode.message, 'error')
      return isPinCode.status
    }
    return true
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    if (!handleFormValidation(form)) return

    //To get order id
    const { data } = await axios.post('/payment/order', {
      amount: orderSummary.total
    })

    //Passing order id to pagar.me function
    initPayment(
      form,
      data,
      orderSummary,
      cartProducts,
      token,
      toast,
      dispatch,
      navigate
    )
  }

  useEffect(() => {
    handleAddressGetRequest()
  }, [])

  return (
    <>
      <Box
        p={'20px'}
        my={'30px'}
        mx={'auto'}
        maxW={'1200px'}
        display={'grid'}
        gap={['40px', '40px', '40px', '10%', '10%']}
        gridTemplateColumns={['100%', '100%', '100%', '55% 35%', '60% 30%']}
      >
        {isLoading ? (
          <Text>Carregando enderecos</Text>
        ) : data.length > 0 ? (
          data.map(e => {
            return (
              <>
                <Text fontWeight={'bold'}>
                  Escolha um endereço para entrega
                </Text>
                <SelectAddress {...e} />
              </>
            )
          })
        ) : (
          <CheckoutForm onChange={handleInputChange} />
        )}

        <CheckoutOrderSummary
          onClick={handleFormSubmit}
          orderSummary={orderSummary}
        />
      </Box>
    </>
  )
}
