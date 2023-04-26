import { Box, Center, Image, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { proinsta } from '../../constants/images'

export const Contador = () => {
  const [timeLeft, setTimeLeft] = useState(null) // tempo restante em segundos

  useEffect(() => {
    // Data e hora para a qual deseja criar o contador regressivo
    const targetDate = new Date('2023-04-28T18:00:00.000Z').getTime()

    // Atualiza o tempo restante a cada segundo
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const diff = targetDate - now

      // Verifica se o contador regressivo chegou a zero
      if (diff <= 0) {
        clearInterval(interval)
        setTimeLeft(0)
      } else {
        setTimeLeft(Math.floor(diff / 1000))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Box bg={'black'} p={'20px'} display={'grid'} alignItems={'center'}>
      {timeLeft === null ? (
        <h1>Carregando...</h1>
      ) : timeLeft === 0 ? (
        <h1>Contagem regressiva finalizada!</h1>
      ) : (
        <>
          <Image src={proinsta} width={'180px'} />
          <Text fontSize={'50px'} fontWeight={'bold'} color={'white'}>
            {applyZero(Math.floor(timeLeft / 86400))}:{' '}
            {applyZero(Math.floor(timeLeft / 3600) % 24)}:{' '}
            {applyZero(Math.floor(timeLeft / 60) % 60)}:
            {applyZero(timeLeft % 60)}
          </Text>
        </>
      )}
    </Box>
  )
}

export const applyZero = num => {
  if (num < 10) return '0' + num
  return num
}
