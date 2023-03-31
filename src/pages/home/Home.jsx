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
import { Image } from '@chakra-ui/react';

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
            {shoeData.map((data, index) => (
                <ShoeSection handleSection={handleSection} key={index} {...data} />
            ))}

            {clothData.map((data, index) => (
                <ClothSection handleSection={handleSection} key={index} {...data} />
            ))}
           {/* { Banner({source: 'https://imgnike-a.akamaihd.net/branding/home-sbf/touts/tout-liverpool-LBJ-22-03-desk-v2.jpg'}) } */}
           {
            <Image mx={'15px'} my={'10px'} src='https://imgnike-a.akamaihd.net/branding/home-sbf/touts/tout-future-fitness-30-01-desk-v2.jpg'/>
           }
           {
            <Image mx={'15px'} src='https://imgnike-a.akamaihd.net/branding/home-sbf/touts/tout-liverpool-LBJ-22-03-desk-v2.jpg'/>
           }
        </>
    );
};

