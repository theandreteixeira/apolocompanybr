import { Collapse, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useState } from 'react'
import MaskedInput from 'react-text-mask'
import { cardNumberMask } from '../../utils/InputMask'
import { createNumberMask } from 'text-mask-addons'

export const CreditCardForm = ({ isOpen, onChange }) => {
  const [text, setText] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  const handleHolderName = event => {
    const value = event.target.value.toUpperCase()
    setText(value)
    onChange({ target: { name: 'holderName', value } })
  }

  const cardNumberPipe = createNumberMask('dddd dddd dddd dddd')

  const handleChangeCardNumber = event => {
    const value = event.target.value.replace(/[^\d]/g, '')
    const maskedValue = cardNumberPipe(value) || ''
    onChange({ target: { name: 'cardNumber', value } })
    setCardNumber(maskedValue.value)
  }

  return (
    <>
      <Collapse in={isOpen} animateOpacity>
        <Flex flexDirection={'column'} gap={'20px'} mt={'15px'}>
          <FormControl>
            <FormLabel>Número do cartão</FormLabel>
            <MaskedInput
              onChange={handleChangeCardNumber}
              name={'cardNumber'}
              mask={cardNumberMask}
              placeholder={'Número'}
              value={cardNumber}
              width={'100%'}
              style={{
                padding: '10px',
                width: '100%',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#CBD5E0',
                borderRadius: '10px'
              }}
            />
          </FormControl>
          <Input
            type={'text'}
            name={'holderName'}
            placeholder={'Nome (igual no cartão)'}
            onChange={handleHolderName}
            value={text}
          />
          <Input
            name={'expireMonth'}
            type={'number'}
            placeholder={'Mês'}
            onChange={onChange}
          />
          <Input
            name={'expireYear'}
            type={'number'}
            placeholder={'Ano'}
            onChange={onChange}
          />
          <Input
            name={'cvv'}
            placeholder={'CVV'}
            onChange={onChange}
            type={'number'}
            maxLength={4}
          />
        </Flex>
      </Collapse>
    </>
  )
}
