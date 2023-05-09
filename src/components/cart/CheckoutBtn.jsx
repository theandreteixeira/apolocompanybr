import { Button, Spinner } from '@chakra-ui/react'

export const CheckoutBtn = ({
  onClick,
  name,
  bgColor,
  color,
  hoverBg,
  hoverBorder,
  borderColor,
  isLoading,
  hoverColor,
  disabled
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
        fontSize={'16px'}
        borderRadius='0'
        isDisabled={disabled}
        transition='bg 0.6s ease-in-out'
        _hover={{
          bg: hoverBg,
          borderColor: hoverBorder,
          color: hoverColor,
          opacity: 0.8
        }}
      >
        {isLoading ? <Spinner /> : name}
      </Button>
    </>
  )
}
