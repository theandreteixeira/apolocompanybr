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

export const PaymentMethoda = ({ isOpen }) => {
  return (
    <>
      <Collapse in={isOpen} animateOpacity>
        <Flex flexDirection={'column'} gap={'20px'}>
          <Input type={'number'} name={'cardNumber'} placeholder={'Número*'} />
          <Input
            type={'text'}
            name={'holderName'}
            placeholder={'Nome (igual no cartão)*'}
          />
          <Input type={'number'} name={'expireMonth'} placeholder={'Mês*'} />
          <Input type={'number'} name={'expireYear'} placeholder={'Ano*'} />
          <Input type={'number'} name={'cvv'} placeholder={'CVV*'} />
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
        _focus={{
          boxShadow: 'outline'
        }}
        px={5}
        py={3}
      >
        <Image height={'25px'} src={props.item.image}></Image>
        {props.children}
      </Box>
      {props.item.name === 'credit_card' && (
        <PaymentMethoda isOpen={props.isOpen} />
      )}
    </Box>
  )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export const PaymentMethod = ({ handlePaymentMethod }) => {
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
      image:
        'https://user-images.githubusercontent.com/741969/99538099-3b7a5d00-298b-11eb-9f4f-c3d0cd4a5280.png',
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
    <HStack {...group}>
      {options.map(value => {
        const radio = getRadioProps({ value: value.name })
        return (
          <RadioCard item={value} {...radio} isOpen={isOpen}>
            {value.value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
