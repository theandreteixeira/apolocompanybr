import {
  isCheckoutFormEmpty,
  validatePinCode,
  validateCPF,
  validatephoneNumber
} from '../../utils/formValidator'
import { CheckoutOrderSummary } from '../../components/checkout/CheckoutOrderSummary'
import {
  CheckoutForm,
  SelectAddress
} from '../../components/checkout/CheckoutForm'
import { Box, useToast, Text } from '@chakra-ui/react'
import { setToast } from '../../utils/extraFunctions'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CheckoutPaymentMethod } from '../../components/checkout/CheckoutPaymentMethod'
import {
  clearCart,
  removeCouponRequest
} from '../../redux/features/cart/actions'
import { PaymentIndevido } from '../../components/checkout/PaymentIndevido'
import { print } from '../../utils/print'

export const Checkout = () => {
  let { orderSummary, cartProducts } = useSelector(
    state => state.cartReducer,
    shallowEqual
  )
  const [frete, setFrete] = useState(0)
  print('=============cart products')
  print(cartProducts)
  const toast = useToast()
  const user = useSelector(state => state.authReducer.user)
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    pinCode: '',
    email: '',
    district: '',
    city: '',
    state: {
      name: '',
      value: ''
    },
    country: 'Brasil',
    cpf: '',
    phoneNumber: '',
    paymentMethod: 'pix',
    cardNumber: '',
    holderName: '',
    expireMonth: 0,
    expireYear: 0,
    cvv: ''
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = ({ target: { name, value } }) => {
    if (name === 'state') {
      value = JSON.parse(value)
    }
    setForm({ ...form, [name]: value })
  }

  const handleFormValidation = form => {
    const isEmpty = isCheckoutFormEmpty(form)
    if (!isEmpty.status) {
      setToast(toast, isEmpty.message, 'error')
      return isEmpty.status
    }
    const isPinCode = validatePinCode(form.pinCode)
    const isCpf = validateCPF(form.cpf)
    if (!isCpf.status) {
      setToast(toast, isCpf.message, 'error')
      return isCpf.status
    }
    if (!isPinCode.status) {
      setToast(toast, isPinCode.message, 'error')
      return isPinCode.status
    }
    const isPhoneNumber = validatephoneNumber(form.phoneNumber)
    if (!isPhoneNumber.status) {
      setToast(toast, isPhoneNumber.message, 'error')
      return isPhoneNumber.status
    }
    return true
  }

  async function createOrder({ data }) {
    try {
      const shippingDetails = {
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        district: form.district,
        state: form.state.name,
        country: form.country,
        uf: form.state.value,
        email: form.email.trim(),
        firstName: form.name.trim().split(' ')[0],
        lastName:
          form.name
            .trim()
            .split(' ')
            .slice(1, form.name.trim().length)
            .join(' ') ?? '',
        mobile: form.phoneNumber,
        pinCode: form.pinCode
      }
      const response = await axios.post('/criarPedido', {
        userId: 'pedido_sem_id',
        products: cartProducts,
        status: data.status,
        qrCode: data.charges[0].last_transaction.qr_code,
        qrCodeUrl: data.charges[0].last_transaction.qr_code_url,
        orderSummary: {
          ...orderSummary,
          shipping: frete,
          orderId: data.id,
          paymentMethod: form.paymentMethod,
          frete: frete
        },
        shippingDetails
      })
      setIsLoading(false)
      dispatch(clearCart())
      dispatch(removeCouponRequest())
      navigate('/orderMade', {
        state: {
          id: response.data.id,
          qrCode: data.charges[0].last_transaction.qr_code,
          qrCodeUrl: data.charges[0].last_transaction.qr_code_url,
          shippingDetails,
          orderSummary,
          frete,
          total: orderSummary.total
        }
      })
    } catch (error) {
      print(error)
      setIsLoading(false)
      setToast(toast, 'Não foi possível criar o pedido', 'error', 3500)
      PaymentIndevido({ open: true })
    }
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    if (!handleFormValidation(form)) return
    const address = {
      addressLine1: form.addressLine1,
      addressLine2: form.addressLine2,
      city: form.city,
      state: form.state.value,
      zipCode: form.pinCode,
      district: form.district
    }
    try {
      print(form)
      setIsLoading(true)
      const response = await axios.post('/realizarPagamento', {
        env: 'dev',
        customer: {
          name: form.name.trim(),
          cpf: form.cpf,
          email: form.email.trim(),
          phoneNumber: form.phoneNumber
        },
        orderSummary: orderSummary,
        address,
        products: cartProducts.map(prod => ({
          price: prod.price,
          description: prod.description,
          quantity: prod.quantity,
          id: prod.id
        })),
        shipping: frete,
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
        print(response.data)
        const errorCreditCard =
          'Erro ao realizar cobrança no seu cartão de crédito, verifique se os dados estão corretos e se você possui saldo.'
        const errorPix =
          'Erro no pagamento, o PIX está temporariamente fora do ar, tente mais tarde.'
        const message =
          form.paymentMethod === 'pix' ? errorPix : errorCreditCard
        setToast(toast, message, 'error', 4500)
      } else {
        print(response.data)
        createOrder({
          data: response.data
        })
      }
    } catch (error) {
      setIsLoading(false)
      const message =
        error.response.data ?? 'Não foi possível realizar o pagamento'
      setToast(toast, message, 'error', 4500)
      print('erro ao pagar: ')
      print(error)
    }
  }

  function handlePaymentMethod(method) {
    print(method)
    setForm({ ...form, paymentMethod: method })
  }

  return (
    <>
      <Box
        p={'20px'}
        my={'auto'}
        mx={'auto'}
        maxW={'1200px'}
        // display={'grid'}
        gap={['40px', '40px', '40px', '10%', '10%']}
        // gridTemplateColumns={['100%', '100%', '100%', '55% 35%', '60% 30%']}
      >
        <CheckoutForm
          onChange={handleInputChange}
          isLoading={isLoading}
          setFrete={setFrete}
        />
        <CheckoutPaymentMethod
          handlePaymentMethod={handlePaymentMethod}
          onChange={handleInputChange}
        />

        <CheckoutOrderSummary
          onClick={handleFormSubmit}
          orderSummary={orderSummary}
          isLoading={isLoading}
          frete={frete}
        />
      </Box>
    </>
  )
}
