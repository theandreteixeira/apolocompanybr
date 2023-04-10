import { Box, Divider, Grid, ListItem, OrderedList, Text, UnorderedList, useToast, Icon, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas, setToast } from "../../utils/extraFunctions";
import { ImageModal } from "../../components/description/ImageModal";
import { SelectSize } from "../../components/description/SelectSize";
import { NewButton } from "../../components/description/NewButton";
import { getItemSession } from "../../utils/sessionStorage";
import { Product, addToCartRequest } from "../../redux/features/cart/actions";
import { GrStar } from "react-icons/gr";
import { useState } from "react";
import { addToFavouriteRequest } from "../../redux/features/favourite/actions";
import { useNavigate } from "react-router-dom";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    Button,
    Tabs, TabList, Tab, TabPanels, TabPanel, TabIndicator
  } from '@chakra-ui/react'
  import React from "react";
import { BagItems } from "../../components/cart/BagItems";


export const Description = () => {

    const data = getItemSession("singleProduct");
    const { name, gender, description, category, price, sizes, color, rating, photos } = data;
    const [mySize, setMySize] = useState(false);
    const token = useSelector((state) => state.authReducer.token);
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSouldOut = verifyIsSouldOut(sizes);

    // drawer para carinho
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const verifyIsSouldOut = (sizes) => {
      var isSold = true;
      for (let i = 0; i < sizes.length; i++) {
        if(sizes[i].quantity > 0) {
          isSold = false;
          break;
        }
      }
      return isSold;
    }


    const handleAddToCart = async () => {
        if (mySize === false) {
            setToast(toast, "Por favor selecione um tamanho", "error");
        } else {
            onOpen();
            const payload = { ...data, size: mySize.name, quantity: 1 };
            dispatch(addToCartRequest(payload, toast));
        }
    };

    const handleAddToFavourite = () => {
        if (!token) {
            setToast(toast, 'Please login first', 'error');
            navigate('/auth');
        } else {
            dispatch(addToFavouriteRequest(data, token, toast));
        }
    };


    return (
        <>
            <Grid
                p={'10px'}
                gap={['40px', '40px', "4%", "4%", "4%"]}
                templateColumns={["100%", "100%", "55% 41%", "62% 34%", "62% 34%"]}
                w={["100%", "100%", "100%", "100%", "90%"]}
                m={["40px auto 20px", "40px auto 20px", "40px auto 10px", "40px auto 10px", "40px auto 10px"]}
            >
                <ImageModal img={photos} />

                <Box px={["20px", "40px"]}>
                    <Text fontSize={"28px"} fontWeight={"black"}>{name.toUpperCase()}</Text>
                    <Text fontSize={"22px"} mt="15px" mb="20px" fontWeight={"black"}>
                        R$ {numberWithCommas(price)}
                    </Text>
                    <Box my={"15px"}>
                    <Flex direction="row">
                      <Icon boxSize={6} color="black" as={GrStar} />
                      <Icon boxSize={6} color="black" as={GrStar} />
                      <Icon boxSize={6} color="black" as={GrStar} />
                      <Icon boxSize={6} color="black" as={GrStar} />
                      <Icon boxSize={6} color="#E2E8F0" as={GrStar} />
                      </Flex>
                    </Box>
                    <Text color='grey'>{category}</Text>
                    <Divider my={'15px'}/>
                    <UnorderedList fontSize={"16px"} styleType="none" mb={"20px"}>
                        <ListItem my={'10px'}>
                          <Flex direction="row">
                            <Text fontWeight={"bold"}> Gênero: </Text> {gender}
                          </Flex>
                        </ListItem>
                        <ListItem my={'10px'}>
                        <Flex direction="row">
                          <Text fontWeight={"bold"}> Categoria: </Text> {category}
                          </Flex>
                          </ListItem>
                        <ListItem my={'10px'}>
                        <Flex direction="row">
                          <Text fontWeight={"bold"}> Cor: </Text> {color}
                          </Flex>
                          </ListItem>
                        <ListItem my={'10px'}>
                        <Flex direction="row">
                          <Text fontWeight={"bold"}> Avaliação: </Text> {rating}
                          </Flex>
                          </ListItem>
                    </UnorderedList>
                    <Box my={"30px"}>
                   { isSouldOut ? <Text>PRODUTO ESGOTADO</Text> : <SelectSize sizes={sizes} setMySize={setMySize} /> }
                    </Box>
                    {!isSouldOut &&
                    <NewButton
                    click={handleAddToCart}
                    name={"Adicionar a sacola"}
                    bgColor={"black"}
                    color={"white"}
                    hoverBg={'#1e1e1e'}
                    borderColor={'transparent'}
                    />
                  }
                </Box>
            </Grid>
            <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color={"white"} />
            <DrawerHeader bgColor={"black"} color={"white"} fontSize={"15px"}>Produto adicionado ao carrinho</DrawerHeader>

            <DrawerBody>

            </DrawerBody>

            <DrawerFooter>
                <Button
                  color={"white"}
                  width={"100%"}
                  onClick={()=> navigate('/cart')}
                  h={"60px"}
                  bg={"black"}
                  border={`1px solid ${'#cecdce'}`}
                  borderRadius="0"
                  w={"100%"}
                  fontSize={"17px"}
                  mb={'20px'}
                  _hover={{ bg: "black", borderColor: 'black' }}
                >FINALIZAR COMPRA</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Box
          p={'10px'}
          w={["100%", "100%", "100%", "100%", "90%"]}
          gap={['40px', '40px', "4%", "4%", "4%"]}
          m={["20px auto 50px", "20px auto 50px", "20px auto 40px", "20px auto 40px", "20px auto 40px"]}
        >
        <Tabs position="relative" variant="unstyled">
        <TabList color={'grey'}>
          <Tab fontWeight={'black'} _selected={{color:'black'}}>DESCRIÇÃO</Tab>
          <Tab fontWeight={'black'} _selected={{color:'black'}}>AVALIAÇÕES</Tab>
          <Tab fontWeight={'black'} _selected={{color:'black'}}>MEDIDAS</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="3px"
          bg="blue.900"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel color={'grey'}>
            {description}
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Box>
        </>
    );
};
