import { Button, Spinner } from '@chakra-ui/react'

export const CheckoutBtn = ({
  onClick,
  name,
  bgColor,
  color,
  hoverBg,
  hoverBorder,
  borderColor,
  isLoading
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        h={'60px'}
        bg={bgColor}
        color={color}
        border={`1px solid ${borderColor}`}
        w={'100%'}
        fontSize={'17px'}
        borderRadius='0'
        mb={'20px'}
        _hover={{ bg: hoverBg, borderColor: hoverBorder }}
      >
        {isLoading ? <Spinner /> : name}
      </Button>
    </>
  )
}
