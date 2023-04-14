import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  useDisclosure,
  useRadio,
  useRadioGroup
} from '@chakra-ui/react'
import { useState } from 'react'

export const PaymentMethoda = ({ isOpen, onChange }) => {
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
            placeholder={'Número*'}
            onChange={onChange}
          />
          <Input
            type={'text'}
            name={'holderName'}
            placeholder={'Nome (igual no cartão)*'}
            onChange={handleHolderName}
            value={text}
          />
          <Input
            name={'expireMonth'}
            maxLength={2}
            placeholder={'Mês*'}
            onChange={onChange}
          />
          <Input
            name={'expireYear'}
            maxLength={2}
            placeholder={'Ano*'}
            onChange={onChange}
          />
          <Input
            name={'cvv'}
            placeholder={'CVV*'}
            onChange={onChange}
            maxLength={4}
          />
        </Flex>
      </Collapse>
    </>
  )
}

function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  function onClick() {
    props.item.onClick()
  }

  return (
    <Box as='label'>
      <input onClick={onClick} {...input} />
      {/* <input {...input} /> */}
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600'
        }}
        px={5}
        py={6}
        display={'flex'}
        justifyContent={'center'}
        alignContent={'center'}
        flexDirection={'column'}
      >
        <Image height={'25px'} src={props.item.image}></Image>
        {props.children}
      </Box>
      {props.item.name === 'credit_card' && (
        <PaymentMethoda isOpen={props.isOpen} onChange={props.onChange} />
      )}
    </Box>
  )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export const PaymentMethod = ({ handlePaymentMethod, onChange }) => {
  const handlePix = () => {
    onClose()
    handlePaymentMethod('pix')
  }

  const handleCreditCard = () => {
    onOpen()
    handlePaymentMethod('credit_card')
  }

  const options = [
    {
      name: 'pix',
      value: 'PIX',
      image:
        'https://user-images.githubusercontent.com/741969/99538099-3b7a5d00-298b-11eb-9f4f-c3d0cd4a5280.png',
      onClick: handlePix
    },
    {
      name: 'credit_card',
      value: 'Cartão de crédito',
      image: 'https://cdn-icons-png.flaticon.com/512/233/233780.png',
      onClick: handleCreditCard
    }
  ]
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'paymentMethod',
    defaultValue: 'PIX',
    onChange: console.log
  })

  const group = getRootProps()

  return (
    <HStack {...group} align={'flex-start'}>
      {options.map(value => {
        const radio = getRadioProps({ value: value.name })
        return (
          <RadioCard
            item={value}
            {...radio}
            isOpen={isOpen}
            onChange={onChange}
          >
            {value.value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
