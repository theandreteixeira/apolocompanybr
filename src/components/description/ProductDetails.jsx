import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  Box,
  Text
} from '@chakra-ui/react'
import { Measurements } from './Measurements'

export const ProductDetails = ({ data }) => {
  return (
    <Box
      p={'10px'}
      w={['100%', '100%', '100%', '100%', '90%']}
      gap={['40px', '40px', '4%', '4%', '4%']}
      m={[
        '20px auto 50px',
        '20px auto 50px',
        '20px auto 40px',
        '20px auto 40px',
        '20px auto 40px'
      ]}
    >
      <Tabs position='relative' variant='unstyled'>
        <TabList color={'grey'}>
          <Tab fontWeight={'black'} _selected={{ color: 'black' }}>
            DESCRIÇÃO
          </Tab>
          <Tab fontWeight={'black'} _selected={{ color: 'black' }}>
            AVALIAÇÕES
          </Tab>
          <Tab fontWeight={'black'} _selected={{ color: 'black' }}>
            MEDIDAS
          </Tab>
        </TabList>
        <TabIndicator
          mt='-1.5px'
          height='3px'
          bg='blue.900'
          borderRadius='1px'
        />
        <TabPanels>
          <TabPanel>{data.description}</TabPanel>
          <TabPanel>
            <Text color={'grey'}>Nenhuma avaliação para esse produto.</Text>
          </TabPanel>
          <TabPanel>
            <Measurements measurements={data.measurements} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
