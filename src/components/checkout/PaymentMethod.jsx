import {
  Box,
  Button,
  Collapse,
  Flex,
  Image,
  Input,
  Text,
  useDisclosure
} from '@chakra-ui/react'

export const PaymentMethod = ({ handlePaymentMethod }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handlePix = () => {
    onClose()
    handlePaymentMethod('pix')
  }

  const handleCreditCard = () => {
    onOpen()
    handlePaymentMethod('credit_card')
  }

  return (
    <>
      <Button onClick={handlePix}>
        <Box padding={'25px'}>
          <Image
            height={'30px'}
            src='https://user-images.githubusercontent.com/741969/99538099-3b7a5d00-298b-11eb-9f4f-c3d0cd4a5280.png'
          ></Image>
          <Text>PIX</Text>
        </Box>
      </Button>
      <Box>
        <Button onClick={handleCreditCard}>Cartão de crédito</Button>
        <Collapse in={isOpen} animateOpacity>
          <Flex flexDirection={'column'} gap={'20px'}>
            <Input
              type={'number'}
              name={'cardNumber'}
              placeholder={'Número*'}
            />
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
      </Box>
    </>
  )
}
