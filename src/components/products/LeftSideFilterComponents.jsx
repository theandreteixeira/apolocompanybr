import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'

export const FilterSection = ({ title, item, change, apply }) => {
  return (
    <>
      <h2>
        <Button>
          <Box flex='1' textAlign='left' fontSize={['14px', '18px']}>
            {title}
          </Box>
          {/* <AccordionIcon /> */}
        </Button>
      </h2>
      <Box pb={4}>
        <Stack direction={'column'} gap={'5px'}>
          {item.map((e, i) => (
            <Checkbox
              onChange={e => {
                change(e)
              }}
              value={e}
              name={title}
              key={i}
            >
              <Text fontSize={['13px', '16px']}>{e}</Text>
            </Checkbox>
          ))}
          <Button fontSize={['13px', '16px']} name={title} onClick={apply}>
            Apply
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export const PriceFilter = ({ handleChange, handleSubmit }) => {
  return (
    <>
      <h2>
        <Button>
          <Box flex='1' textAlign='left' fontSize={['14px', '18px']}>
            Price Filter
          </Box>
          {/* <AccordionIcon /> */}
        </Button>
      </h2>
      <Box pb={4}>
        <Flex m={'2%'} direction={'column'} gap={2}>
          <Input
            onChange={handleChange}
            fontSize={['13px', '16px']}
            type={'number'}
            name='minPrice'
            placeholder='₹ min price'
          />
          <Input
            onChange={handleChange}
            fontSize={['13px', '16px']}
            type={'number'}
            name='maxPrice'
            placeholder='₹ max price'
          />
          <Button onClick={handleSubmit} fontSize={['13px', '16px']}>
            Apply
          </Button>
        </Flex>
      </Box>
    </>
  )
}
