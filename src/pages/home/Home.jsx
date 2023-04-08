import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClothSection } from "../../components/home/ClothSection.jsx";
import { ShoeSection } from "../../components/home/ShoeSection.jsx";
import { Banner } from "../../components/home/Banner.jsx";
import { Error } from "../../components/loading/Error.jsx";
import { Loading } from "../../components/loading/Loading.jsx";
import { getClothData, getShoeData } from "../../redux/features/home/actions.js";
import { setNavbarPath } from "../../redux/features/path/actions.js";
import { setItemSession } from "../../utils/sessionStorage.js";
import { Image, Box, Text, Center, Button } from '@chakra-ui/react';

export const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, clothData, shoeData } = useSelector((state) => state.homeReducer);



    const handleSection = (gender) => {
        dispatch(setNavbarPath(gender));
        setItemSession("path", gender);
        navigate(`/${gender}`)
    };


    useEffect(() => {
        dispatch(getClothData());
        dispatch(getShoeData());
    }, []);


    return loading ? (
        <Loading />
    ) : error ? (
        <Error />
    ) : (
        <>
            {/* {shoeData.map((data, index) => (
                <ShoeSection handleSection={handleSection} key={index} {...data} />
            ))} */}

            {clothData.map((data, index) => (
                <ClothSection handleSection={handleSection} key={index} {...data} />
            ))}
           {/* { Banner({source: 'https://imgnike-a.akamaihd.net/branding/home-sbf/touts/tout-liverpool-LBJ-22-03-desk-v2.jpg'}) } */}
           {
            <Box
                m={'60px auto 60px'}
                w={['94%', '94%', '94%', '94%', '80%']}
            >
                <Image src='https://imgnike-a.akamaihd.net/branding/home-sbf/touts/tout-future-fitness-30-01-desk-v2.jpg'/>
            </Box>
           }
           {
            <>
           <Box my={"10px"}>
           <Image
           borderRadius={'15px'}  src="https://images2.minutemediacdn.com/image/upload/c_crop,w_4445,h_2500,x_0,y_264/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/90min_pt-BR_international_web/01gx40rbg6vx73b2yacb.jpg"></Image>
            <Text mt={"10px"} fontSize={30} fontWeigth={"bold"} textAlign={"center"}>{"lebron x Liverpool FC".toUpperCase()}</Text>
             <Text fontSize={20} textAlign={"center"}>"Alcance sua própria grandeza com a nova coleção inspirada no legado que eles deixaram em suas comunidades."</Text>
            <Center><Button
            color={"white"}
                            onClick={()=> navigate('/cart')}
                            h={"60px"}
                            bg={"black"}
                            border={`1px solid ${'#cecdce'}`}
                            borderRadius="50"
                            fontSize={"15px"}
                            mb={'20px'}
                             px={'50px'}
                            mt={'10px'}
                            _hover={{ bg: "black", borderColor: 'black' }}
            >VER MAIS</Button></Center>
           </Box>
          </>
           }
        </>
    );
};

