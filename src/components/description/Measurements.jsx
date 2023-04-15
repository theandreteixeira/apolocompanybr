import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'

export const Measurements = ({ measurements }) => {
  return (
    <>
      <TableContainer>
        <Table variant='striped' colorScheme='blue'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
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
        </Table>
      </TableContainer>
    </>
  )
}
