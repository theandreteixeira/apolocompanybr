import { Box, Divider, Grid, ListItem, OrderedList, Text, UnorderedList, useToast, Icon } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas, setToast } from "../../utils/extraFunctions";
import { ImageModal } from "../../components/description/ImageModal";
import { SelectSize } from "../../components/description/SelectSize";
import { NewButton } from "../../components/description/NewButton";
import { getItemSession } from "../../utils/sessionStorage";
import { addToCartRequest } from "../../redux/features/cart/actions";
import { AiFillStar } from "react-icons/ai";
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
  } from '@chakra-ui/react'


export const Description = () => {

    const data = getItemSession("singleProduct");
    const { title, gender, description, category, price, size, color, rating, img } = data;
    const [mySize, setMySize] = useState(false);
    const token = useSelector((state) => state.authReducer.token);
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleAddToCart = async () => {
        if (mySize === false) {
            setToast(toast, "Por favor selecione um tamanho", "error");
        } else {
            const payload = { ...data, size: mySize, quantity: 1 };
            await new Promise(res => setTimeout(() => res(true), 2000));
            dispatch(addToCartRequest(payload, toast));
            navigate('/cart')
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
                m={["40px auto 100px", "40px auto 100px", "40px auto 60px", "40px auto 60px", "40px auto 60px"]}
            >
                <ImageModal img={img} />

                <Box px={["20px", "40px"]}>
                    <Text fontSize={"32px"} fontWeight={"black"}>{title.toUpperCase()}</Text>
                    <Text fontSize={"22px"} mt="15px" mb="20px" fontWeight={"black"}>
                        R$ {numberWithCommas(price)}
                    </Text>
                    <Box my={"15px"}>
                      <Icon boxSize={6} color="black" as={AiFillStar} />
                    </Box>
                    <Text color='grey'>{description}</Text>
                    <Divider my={'15px'}/>
                    <UnorderedList fontSize={"18px"} styleType="none" mb={"20px"}>
                        <ListItem>
                        <Text fontWeight={"bold"}> Gênero: </Text>
                           {gender}
                          </ListItem>
                        <ListItem>
                          <Text fontWeight={"bold"}> Categoria: </Text>
                           {category}
                          </ListItem>
                        <ListItem>
                          <Text fontWeight={"bold"}> Cor: </Text>
                          {color}
                          </ListItem>
                        <ListItem>
                          <Text fontWeight={"bold"}> Avaliação: </Text>
                          {rating}
                          </ListItem>
                    </UnorderedList>
                    <Box my={"30px"}>
                        <SelectSize size={size} setMySize={setMySize} />
                    </Box>
                    <NewButton
                        click={handleAddToCart}
                        name={"Adicionar a sacola"}
                        bgColor={"black"}
                        color={"white"}
                        hoverBg={'#1e1e1e'}
                        borderColor={'transparent'}
                    />
                </Box>
            </Grid>
        </>
    );
};


function DrawerExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
      <>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
          Open
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <Input placeholder='Type here...' />
            </DrawerBody>

            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
