import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tfoot,
  Text
} from '@chakra-ui/react'

export const Measurements = ({ measurements }) => {
  return (
    <>
      <TableContainer>
        <Table
          variant='striped'
          colorScheme='blue'
          align='center'
          textAlign={'center'}
        >
          <Thead>
            <Tr>
              <Th>Medida</Th>
              <Th>Largura</Th>
              <Th>Comprimento</Th>
            </Tr>
          </Thead>
          <Tbody>
            {measurements.map(measurement => {
              return (
                <Tr>
                  <Td>{measurement.size}</Td>
                  <Td isNumeric>{measurement.width}</Td>
                  <Td isNumeric>{measurement.length}</Td>
                </Tr>
              )
            })}
          </Tbody>
          <Tfoot>
            <Text fontWeight={'bold'}>As medidas são calculadas em CM</Text>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  )
}
