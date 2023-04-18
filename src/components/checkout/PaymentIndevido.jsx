import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import React from 'react'

export const PaymentIndevido = ({ open }) => {
  const initialFocusRef = React.useRef()
  const { isOpen, onToggle, onClose } = useDisclosure({ isOpen: open })
  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement='bottom'
      closeOnBlur={false}
      isOpen={isOpen}
    >
      <PopoverContent color='white' bg='black'>
        <PopoverHeader pt={4} fontWeight='bold' border='0'>
          Atenção!
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Identificamos um erro ao criar o seu pedido, mas aparentemente uma
          cobrança poderá ser feita no seu cartão de crédito. Estamos ciente do
          erro no pedido e caso seja feito uma cobrança no seu cartão, por favor
          entre em contato conosco.
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
