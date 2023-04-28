import { Button, Spinner } from '@chakra-ui/react'

export const PlaceOrderBtn = ({ onClick, isLoading }) => {
  return (
    <>
      <Button
        onClick={onClick}
        as={'button'}
        type={'submit'}
        h={'60px'}
        bg={'black'}
        color={'white'}
        borderRadius={0}
        w={'100%'}
        fontSize={'17px'}
        disabled={isLoading}
        mt={'20px'}
        _hover={{ borderColor: 'black' }}
      >
        {isLoading ? <Spinner color='white' /> : 'REALIZAR PEDIDO'}
      </Button>
    </>
  )
}
