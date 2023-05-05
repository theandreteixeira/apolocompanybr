import { Box, Image, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { CreditCardForm } from './CreditCardForm'

const BoxCard = (value, selected, isOpen, onChange) => {
  return (
    <label>
      <Box
        px={5}
        py={3}
        borderRadius='0'
        borderWidth='1px'
        bg={selected && 'black'}
        color={selected && 'white'}
        onClick={value.onClick}
        display={'flex'}
        justifyContent={'center'}
        alignContent={'center'}
        flexDirection={'column'}
      >
        <Image
          width={'25px'}
          height={'25px'}
          src={value.image}
          mb={'10px'}
        ></Image>
        {value.value}
      </Box>
    </label>
  )
}

export const PaymentMethod = ({ handlePaymentMethod, onChange }) => {
  const handlePix = () => {
    onClose()
    setSelectedBox('pix')
    handlePaymentMethod('pix')
  }

  const handleCreditCard = () => {
    onOpen()
    setSelectedBox('credit_card')
    handlePaymentMethod('credit_card')
  }

  const options = [
    {
      name: 'pix',
      value: 'PIX',
      image:
        'https://user-images.githubusercontent.com/741969/99538099-3b7a5d00-298b-11eb-9f4f-c3d0cd4a5280.png',
      onClick: handlePix
    }
    // {
    //   name: 'credit_card',
    //   value: 'Cartão de crédito',
    //   image: 'https://cdn-icons-png.flaticon.com/512/233/233780.png',
    //   onClick: handleCreditCard
    // }
  ]
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [selectedBox, setSelectedBox] = useState('pix')

  return (
    <Box width={'100%'}>
      <Box display='flex' gap={'5px'} justifyContent={'stretch'}>
        {options.map(value => {
          return BoxCard(value, selectedBox === value.name, isOpen, onChange)
        })}
      </Box>
      {selectedBox === 'credit_card' && (
        <CreditCardForm isOpen={isOpen} onChange={onChange} />
      )}
    </Box>
  )
}
