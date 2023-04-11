import { Button, Code, Kbd, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { RiCoupon3Line } from "react-icons/ri";


export const Coupon = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MenuItem onClick={onOpen} icon={<RiCoupon3Line />} >
                Cupons
            </MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cupons disponíveis</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Coupon</Th>
                                        <Th textAlign={'end'}>Desconto</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <DiscountText num={5} />
                                    <DiscountText num={10} />
                                    <DiscountText num={15} />
                                    <DiscountText num={20} />
                                    <DiscountText num={25} />
                                    <DiscountText num={30} />
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            bg={'black'}
                            color={'white'}
                            _hover={{ bg: '#1e1e1e' }}
                            onClick={onClose}
                        >
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};


const DiscountText = ({ num }) => {
    return (
        <Tr>
            <Td><Code colorScheme='yellow' children={`APOLO${num}`} /></Td>
            <Td textAlign={'end'}><Kbd>{num}% OFF</Kbd></Td>
        </Tr>
    );
};