import { Input, Text, VStack } from '@chakra-ui/react'
import { AuthBtn } from './AuthBtn'

export const ResetForm = () => {
  return (
    <>
      <form>
        <VStack
          w={['95%', '95%', '85%', '85%', '85%', '85%']}
          mx={'auto'}
          gap={'15px'}
        >
          <Text color={'gray'} textAlign={'center'}>
            Essa opção ainda não está disponível, para que isso seja possível,
            você precisa entrar em contato conosco através do nosso email
            contato@apolobr.com.
          </Text>

          <Input type={'email'} placeholder='Email' isDisabled />

          <AuthBtn value={'RECUPERAR'} isDisabled={'true'} />
        </VStack>
      </form>
    </>
  )
}
