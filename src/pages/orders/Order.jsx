import {
  Accordion,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Text
} from '@chakra-ui/react'
import { OrderAddress } from '../../components/orders/OrderAddress'
import { Loading } from '../../components/loading/Loading'
import { Error } from '../../components/loading/Error'
import { Summary } from '../../components/orders/Summary'
import { OrderBox } from '../../components/orders/OrderBox'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { OrderSection } from '../../components/orders/OrderSection'
import { dateFormator } from '../../utils/dateFormator'

export const Order = () => {
  const token = useSelector(state => state.authReducer.token)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState([])

  const handleOrdersGetRequest = async token => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('/obterPedidos')
      console.log(data.pedidos)
      setData(data.pedidos)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    handleOrdersGetRequest(token)
  }, [token])

  if (data.length === 0) {
    return (
      <Box>
        <Center h={'40vh'}>
          <Text fontSize={'20px'}>Os seus pedidos serão exibidos aqui.</Text>
        </Center>
      </Box>
    )
  }

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <>
      <Box px={'20px'} mb={['250px', '150px', '150px', '150px', '150px']}>
        <Flex justify={'space-between'} maxW={1200} m={'20px auto'}>
          <Center>
            <Text fontWeight={600} fontSize={['20px', '25px']}>
              Pedidos &nbsp;
            </Text>
            <Text fontSize={['16px', '20px']}> ({data.length})</Text>
          </Center>
        </Flex>

        <Accordion defaultIndex={[0]} allowMultiple>
          <Box maxW={1200} m={'40px auto'}>
            {data.map(item => {
              return (
                <OrderSection title={item.title}>
                  <Box key={item.id}>
                    <Grid
                      templateColumns={[
                        '100%',
                        '100%',
                        '48% 48%',
                        '32% 31% 33%',
                        '31% 30% 31%'
                      ]}
                      gap={['20px', '20px', '4%', '2%', '4%']}
                    >
                      <Box py={'15px'} px={'25px'}>
                        <Text fontSize={'20px'} fontWeight={600}>
                          Itens pedidos
                        </Text>
                        <Divider mb={'20px'} />
                        {item.cartProducts.map(product => (
                          <OrderBox key={product.id} {...product} />
                        ))}
                      </Box>

                      <OrderAddress {...item.shippingDetails} />

                      <Summary
                        createdAt={item.createdAt}
                        {...item.paymentDetails}
                        {...item.orderSummary}
                        status={item.status}
                      />
                    </Grid>
                  </Box>
                </OrderSection>
              )
            })}
          </Box>
        </Accordion>
      </Box>
    </>
  )
}
