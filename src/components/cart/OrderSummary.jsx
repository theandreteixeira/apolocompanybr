import { Box, Input, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  applyCouponRequest,
  removeCouponRequest
} from '../../redux/features/cart/actions'
import { couponValidator } from '../../utils/couponValidator'
import { setToast } from '../../utils/extraFunctions'
import { CheckoutBtn } from './CheckoutBtn'
import { useNavigate } from 'react-router-dom'
import { OrderSummaryDataSection } from './OrderSummaryDataSection'
import axios from 'axios'

export const OrderSummary = () => {
  const orderSummary = useSelector(state => state.cartReducer.orderSummary)
  const token = useSelector(state => state.authReducer.token)

  const [coupon, setCoupon] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCouponCode = ({ target: { textContent } }) => {
    switch (textContent) {
      case 'Adicionar cupom':
        return applyCouponCode()
      case 'Remover cupom':
        return removeCouponCode()
    }
  }

  const applyCouponCode = async () => {
    if (orderSummary.total === 0) {
      return setToast(toast, 'O carrinho está vazio', 'error')
    }
    if (!coupon) {
      return setToast(toast, 'Digite o código do cupom', 'error')
    }
    setIsLoading(true)
    try {
      const response = await axios.get('/obterCupons', {
        params: {
          code: coupon
        }
      })
      const discount = response.data.cuopon
      dispatch(applyCouponRequest(discount.percentDiscount, toast))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setToast(toast, 'Código de cupom inválido', 'error')
      setIsLoading(false)
    }
  }

  const removeCouponCode = () => {
    dispatch(removeCouponRequest(toast))
    setCoupon('')
  }

  const handleMemberCheckout = () => {
    if (!token) {
      setToast(toast, 'Faça o login primeiro', 'error')
      return navigate('/auth')
    }
    if (orderSummary.total === 0) {
      return setToast(toast, 'Please add some products in the cart', 'error')
    }
    navigate('/checkout')
  }

  return (
    <>
      <Box>
        <OrderSummaryDataSection {...orderSummary} />

        <Input
          onChange={e => {
            setCoupon(e.target.value)
          }}
          placeholder={'CUPOM'}
          disabled={orderSummary.discount > 0}
          value={coupon}
          type={'text'}
          mb={'20px'}
        />

        <CheckoutBtn
          onClick={handleCouponCode}
          name={orderSummary.discount > 0 ? 'Remover cupom' : 'Adicionar cupom'}
          bgColor={'white'}
          color={'black'}
          hoverBorder={'black'}
          borderColor={'#cecdce'}
          isLoading={isLoading}
        />

        <CheckoutBtn
          onClick={handleMemberCheckout}
          name={'CONTINUAR'}
          bgColor={'black'}
          color={'white'}
          hoverBg={'#1e1e1e'}
          borderColor={'transparent'}
        />
      </Box>
    </>
  )
}
