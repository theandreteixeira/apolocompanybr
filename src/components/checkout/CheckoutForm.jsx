import { Box, Flex, Input, Text } from "@chakra-ui/react";


export const CheckoutForm = ({onChange}) => {
    return (
        <>
            <Box>
                <Text fontSize={'20px'} fontWeight={600} mb={'20px'}>Digite o seu nome e o seu endereço:</Text>

                <Flex flexDirection={'column'} gap={'20px'}>
                    <Input onChange={onChange} type={'text'} name={'firstName'} placeholder={'Primeiro nome*'} />
                    <Input onChange={onChange} type={'text'} name={'lastName'} placeholder={'Último nome*'} />
                    <Input onChange={onChange} type={'text'} name={'addressLine1'} placeholder={'Endereço*'} />
                    <Input onChange={onChange} type={'text'} name={'addressLine2'} placeholder={'Número'} />
                    <Flex gap={'20px'}>
                        <Input onChange={onChange} type={'text'} name={'locality'} placeholder={'Cidade*'} />
                        <Input onChange={onChange} type={'number'} name={'pinCode'} placeholder={'CEP*'} />
                    </Flex>
                    <Flex gap={'20px'}>
                        <Input onChange={onChange} type={'text'} name={'state'} placeholder={'State/Territory*'} />
                        <Input onChange={onChange} type={'text'} name={'country'} placeholder={'Country*'} />
                    </Flex>
                    <Text fontSize={'20px'} fontWeight={600} mt={'30px'}>Contato</Text>
                    <Input onChange={onChange} type={'email'} name={'email'} placeholder={'Email*'} />
                    <Input onChange={onChange} type={'number'} name={'mobile'} placeholder={'Telefone*'} />
                </Flex>
            </Box>
        </>
    );
};