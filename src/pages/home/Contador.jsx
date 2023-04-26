import { Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

export const Contador = () => {
  // const [timeLeft, setTimeLeft] = useState(null) // tempo restante em segundos

  // useEffect(() => {
  //   // Data e hora para a qual deseja criar o contador regressivo
  //   const targetDate = new Date('2023-06-14T00:00:00.000Z').getTime()

  //   // Atualiza o tempo restante a cada segundo
  //   const interval = setInterval(() => {
  //     const now = new Date().getTime()
  //     const diff = targetDate - now

  //     // Verifica se o contador regressivo chegou a zero
  //     if (diff <= 0) {
  //       clearInterval(interval)
  //       setTimeLeft(0)
  //     } else {
  //       setTimeLeft(Math.floor(diff / 1000))
  //     }
  //   }, 1000)

  //   return () => clearInterval(interval)
  // }, [])

  return (
    <div>
      {/* {timeLeft === null ? (
        <h1>Carregando...</h1>
      ) : timeLeft === 0 ? (
        <h1>Contagem regressiva finalizada!</h1>
      ) : (
        <h1>
          {Math.floor(timeLeft / 86400)} dias,{' '}
          {Math.floor(timeLeft / 3600) % 24} horas,{' '}
          {Math.floor(timeLeft / 60) % 60} minutos e {timeLeft % 60} segundos
          restantes
        </h1>
      )} */}
      oi
    </div>
  )
}
