import { Box, Center, Image, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { proinsta } from '../../constants/images'

const useCountdown = targetDate => {
  const countDownDate = new Date(targetDate).getTime()

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return getReturnValues(countDown)
}

const getReturnValues = countDown => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

  return [days, hours, minutes, seconds]
}

export const Contador = () => {
  const targetDate = new Date('2023-04-28T21:00:00.000Z').getTime()

  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    )
  }
}

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className='show-counter'>
      <Text fontWeight={'bold'} textAlign={'center'}>
        APOLO FLEX.
        <br />
        EDIÇÃO 001
        <br />
        SAVE THE DATE.
      </Text>
      <a target='_blank' rel='noopener noreferrer' className='countdown-link'>
        <DateTimeDisplay value={days} type={'Dia'} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'Horas'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'Minutos'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Segundos'} isDanger={false} />
      </a>
    </div>
  )
}

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  )
}

const ExpiredNotice = () => {
  return (
    <div className='expired-notice'>
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  )
}

export const applyZero = num => {
  if (num < 10) return '0' + num
  return num
}
