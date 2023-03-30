import { Box, Divider, Grid, ListItem, OrderedList, Text, UnorderedList, useToast } from "@chakra-ui/react";
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


export const Description = () => {

    const data = getItemSession("singleProduct");
    const { title, gender, description, category, price, size, color, rating, img } = data;
    const [mySize, setMySize] = useState(false);
    const token = useSelector((state) => state.authReducer.token);
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleAddToCart = () => {
        if (mySize === false) {
            setToast(toast, "Por favor selecione um tamanho", "error");
        } else {
            const payload = { ...data, size: mySize, quantity: 1 };
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
                m={["40px auto 100px", "40px auto 100px", "40px auto 60px", "40px auto 60px", "40px auto 60px"]}
            >
                <ImageModal img={img} />

                <Box px={["20px", "40px"]}>
                    <Text fontSize={"32px"} fontWeight={"black"}>{title.toUpperCase()}</Text>
                    <Text fontSize={"22px"} mt="15px" mb="20px" fontWeight={"black"}>
                        R$ {numberWithCommas(price)}
                    </Text>
                    <Box my={"15px"}>
                        <AiFillStar color="#000000" height={'30px'} />
                    </Box>
                    <Text>{description}</Text>
                    <Divider my={'15px'}/>
                    <UnorderedList fontSize={"18px"} styleType="none" mb={"20px"}>
                        <ListItem>Gênero: {gender}</ListItem>
                        <ListItem>Categoria: {category}</ListItem>
                        <ListItem>Cor: {color}</ListItem>
                        <ListItem>Avaliação: {rating}</ListItem>
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


