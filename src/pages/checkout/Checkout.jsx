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
import { CheckoutPaymentMethod } from '../../components/checkout/CheckoutPaymentMethod'
import { clearCart } from '../../redux/features/cart/actions'

export const Checkout = () => {
  const { orderSummary, cartProducts } = useSelector(
    state => state.cartReducer,
    shallowEqual
  )
  const token = useSelector(state => state.authReducer.token)
  const user = useSelector(state => state.authReducer.user)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  const handleAddressGetRequest = async () => {}

  const [form, setForm] = useState({
    addressLine1: '',
    addressLine2: '',
    pinCode: '',
    city: '',
    state: '',
    country: '',
    cpf: '',
    phoneNumber: '',
    paymentMethod: 'pix',
    cardNumber: '',
    holderName: '',
    expireMonth: 0,
    expireYear: 0,
    cvv: ''
  })
  const toast = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = ({ target: { name, value } }) => {
    console.log(name, value)
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

  async function createOrder({ data }) {
    try {
      const shippingDetails = {
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        country: form.country,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: form.phoneNumber,
        pinCode: form.pinCode
      }
      const response = await axios.post('/criarPedido', {
        userId: user.id,
        products: cartProducts,
        status: data.status,
        qrCode: data.charges[0].last_transaction.qr_code,
        qrCodeUrl: data.charges[0].last_transaction.qr_code_url,
        orderSummary: { ...orderSummary, orderId: data.id },
        shippingDetails
      })
      setIsLoading(false)
      dispatch(clearCart())
      navigate('/orderMade', {
        state: {
          id: response.data.id,
          qrCode: data.charges[0].last_transaction.qr_code,
          qrCodeUrl: data.charges[0].last_transaction.qr_code_url,
          shippingDetails,
          orderSummary,
          total: orderSummary.total
        }
      })
    } catch (error) {
      setIsLoading(false)
      setToast(toast, 'Não foi possível realizar o pagamento', 'error', 3500)
      console.log(error)
    }
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    if (!handleFormValidation(form)) return

    try {
      setIsLoading(true)
      const response = await axios.post('/realizarPagamento', {
        customer: {
          name: user.name,
          cpf: form.cpf,
          email: user.email,
          phoneNumber: form.phoneNumber
        },
        address: {
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2,
          city: form.city,
          state: form.state,
          zipCode: form.pinCode
        },
        products: cartProducts.map(prod => ({
          price: prod.price,
          description: prod.description,
          quantity: prod.quantity,
          id: prod.id
        })),
        shipping: 0,
        paymentMethod: form.paymentMethod,
        payment: {
          creditCard: {
            card: {
              number: form.cardNumber,
              holder_name: form.holderName,
              exp_month: form.expireMonth,
              exp_year: form.expireYear,
              cvv: form.cvv
            },
            installments: 1,
            statement_descriptor: form.holderName.toUpperCase()
          }
        }
      })
      if (response.data.status == 'failed') {
        setIsLoading(false)
        console.log(response.data)
        setToast(toast, 'Não foi possível realizar o pagamento', 'error', 3500)
      } else {
        console.log(response.data)
        createOrder({
          data: response.data
        })
      }
    } catch (error) {
      setIsLoading(false)
      setToast(toast, 'Não foi possível realizar o pagamento', 'error', 3500)
      console.log('erro ao pagar: ' + error.data)
    }
  }

  useEffect(() => {
    handleAddressGetRequest()
  }, [])

  function handlePaymentMethod(method) {
    console.log(method)
    setForm({ ...form, paymentMethod: method })
  }

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
        {
          // isLoading ? (
          //   <Text>Carregando enderecos</Text>
          // ) : data.length > 0 ? (
          //   data.map(e => {
          //     return (
          //       <>
          //         <Text fontWeight={'bold'}>
          //           Escolha um endereço para entrega
          //         </Text>
          //         <SelectAddress {...e} />
          //       </>
          //     )
          //   })
          // ) :
          <CheckoutForm onChange={handleInputChange} isLoading={isLoading} />
        }
        <CheckoutPaymentMethod
          handlePaymentMethod={handlePaymentMethod}
          onChange={handleInputChange}
        />

        <CheckoutOrderSummary
          onClick={handleFormSubmit}
          orderSummary={orderSummary}
          isLoading={isLoading}
        />
      </Box>
    </>
  )
}
