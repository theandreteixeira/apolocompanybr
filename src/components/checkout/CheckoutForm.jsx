import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Text
} from '@chakra-ui/react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import React, { useState } from 'react'
import { BrazilianStates } from '../../utils/BrazilianStates'
import { phoneNumberMask, cpfMask, CEPMask } from '../../utils/InputMask'

export const CheckoutForm = ({ onChange, isLoading, user }) => {
  const [cpf, setCpf] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [cep, setCEP] = useState('')

  const cpfPipe = createNumberMask('ddd.ddd.ddd-dd')
  const phoneNumberPipe = createNumberMask('(dd) ddddd-dddd')
  const CEPPipe = createNumberMask('ddddd-ddd')

  const handleChange = event => {
    const value = event.target.value.replace(/[^\d]/g, '')
    const maskedValue = cpfPipe(value) || ''
    onChange({ target: { name: 'cpf', value } })
    setCpf(maskedValue.value)
  }

  const handleChangePhoneNumber = event => {
    const value = event.target.value.replace(/[^\d]/g, '')
    const maskedValue = phoneNumberPipe(value) || ''
    onChange({ target: { name: 'phoneNumber', value } })
    setPhoneNumber(maskedValue.value)
  }

  const handleChangeCEP = event => {
    const value = event.target.value.replace(/[^\d]/g, '')
    const maskedValue = CEPPipe(value) || ''
    onChange({ target: { name: 'pinCode', value } })
    setCEP(maskedValue.value)
  }

  return (
    <>
      <Box width={'100%'}>
        <Text fontSize={'20px'} fontWeight={600} mb={'10px'}>
          Escolha um endereço para entrega:
        </Text>

        <Flex flexDirection={'column'} gap={'20px'}>
          <FormControl isDisabled={isLoading}>
            <FormControl>
              <FormLabel>Endereço</FormLabel>
              <Input
                onChange={onChange}
                type={'text'}
                name={'addressLine1'}
                placeholder={'Rua, avenida, alameda, etc'}
                mb={'10px'}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Número</FormLabel>
              <Input
                onChange={onChange}
                type={'text'}
                name={'addressLine2'}
                placeholder={'Número'}
                mb={'10px'}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Bairro</FormLabel>
              <Input
                onChange={onChange}
                type={'text'}
                name={'district'}
                placeholder={'Por ex: Bairro das Flores'}
                mb={'10px'}
              />
            </FormControl>
            <Flex gap={'10px'}>
              <FormControl>
                <FormLabel>Cidade</FormLabel>
                <Input
                  onChange={onChange}
                  type={'text'}
                  name={'city'}
                  placeholder={'Por ex: Belo Horizonte'}
                  mb={'10px'}
                />
              </FormControl>
              <FormControl>
                <FormLabel>CEP</FormLabel>
                <MaskedInput
                  onChange={handleChangeCEP}
                  name={'CEP'}
                  mask={CEPMask}
                  placeholder={'CEP'}
                  value={cep}
                  style={{
                    padding: '10px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: '#CBD5E0',
                    borderRadius: '5px',
                    marginBottom: '10px'
                  }}
                />
              </FormControl>
            </Flex>
            <Flex gap={'20px'}>
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <Select
                  placeholder='Toque para selecionar'
                  name={'state'}
                  onChange={onChange}
                  mb={'10px'}
                >
                  {BrazilianStates.map(state => {
                    return (
                      <option value={JSON.stringify(state)}>
                        {state.name}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>
            </Flex>
            <Text fontSize={'20px'} fontWeight={600} mb={'10px'} mt={'10px'}>
              Preencha com os seus dados:
            </Text>
            <FormControl>
              <FormLabel>Nome completo</FormLabel>
              <Input
                onChange={handleChange}
                name={'name'}
                type={'text'}
                defaultValue={user.name}
                placeholder={'Por ex: João Oliveira dos Santos'}
              />
              <FormHelperText>
                ATENÇÃO: Verifique o seu nome, é indispensável que ele esteja
                completo para ser feita a entrega do pedido.
              </FormHelperText>
            </FormControl>
            <Box my={4} w={'100%'}>
              <FormControl>
                <FormLabel>CPF</FormLabel>
                <MaskedInput
                  onChange={handleChange}
                  name={'cpf'}
                  mask={cpfMask}
                  placeholder={'CPF'}
                  value={cpf}
                  width={'100%'}
                  style={{
                    padding: '10px',
                    width: '100%',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: '#CBD5E0',
                    borderRadius: '10px'
                  }}
                />
              </FormControl>
            </Box>
            <Box my={4} w={'100%'}>
              <FormControl>
                <FormLabel>Telefone</FormLabel>
                <MaskedInput
                  onChange={handleChangePhoneNumber}
                  name={'phoneNumber'}
                  mask={phoneNumberMask}
                  placeholder={'DDD + Número'}
                  value={phoneNumber}
                  style={{
                    padding: '10px',
                    width: '100%',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: '#CBD5E0',
                    borderRadius: '10px'
                  }}
                />
              </FormControl>
            </Box>
          </FormControl>
        </Flex>
      </Box>
    </>
  )
}

export const SelectAddress = ({
  onChange,
  addressLine1,
  pinCode,
  addressLine2,
  city,
  state,
  country
}) => {
  return (
    <>
      <Box border={'1px solid black'}>
        <Flex flexDirection={'column'}>
          <Text
            onChange={onChange}
            type={'text'}
            name={'addressLine1'}
            placeholder={'Endereço'}
          >
            {addressLine1}
          </Text>
          <Text
            onChange={onChange}
            type={'text'}
            name={'addressLine2'}
            placeholder={'Número'}
          >
            {addressLine2}
          </Text>
          <Flex gap={'20px'}>
            <Text
              onChange={onChange}
              type={'text'}
              name={'city'}
              placeholder={'Cidade*'}
            >
              {city}
            </Text>
            <Text
              onChange={onChange}
              type={'text'}
              name={'pinCode'}
              placeholder={'CEP'}
            >
              {pinCode}
            </Text>
          </Flex>
          <Flex gap={'20px'}>
            <Text
              onChange={onChange}
              type={'text'}
              name={'state'}
              placeholder={'Estado'}
            >
              {state}
            </Text>
            <Text
              onChange={onChange}
              type={'text'}
              name={'country'}
              placeholder={'País'}
            >
              {country}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
