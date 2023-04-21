import { Collapse, Flex, Input } from '@chakra-ui/react'
import { useState } from 'react'

export const CreditCardForm = ({ isOpen, onChange }) => {
  const [text, setText] = useState('')

  const handleHolderName = event => {
    const value = event.target.value.toUpperCase()
    setText(value)
    onChange({ target: { name: 'holderName', value } })
  }

  return (
    <>
      <Collapse in={isOpen} animateOpacity>
        <Flex flexDirection={'column'} gap={'20px'} mt={'15px'}>
          <Input
            type={'number'}
            name={'cardNumber'}
            placeholder={'Número'}
            onChange={onChange}
          />
          <Input
            type={'text'}
            name={'holderName'}
            placeholder={'Nome (igual no cartão)'}
            onChange={handleHolderName}
            value={text}
          />
          <Input
            name={'expireMonth'}
            maxLength={2}
            placeholder={'Mês'}
            onChange={onChange}
          />
          <Input
            name={'expireYear'}
            maxLength={2}
            placeholder={'Ano'}
            onChange={onChange}
          />
          <Input
            name={'cvv'}
            placeholder={'CVV'}
            onChange={onChange}
            maxLength={4}
          />
        </Flex>
      </Collapse>
    </>
  )
}
