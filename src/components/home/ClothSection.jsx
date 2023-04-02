import { Box, Grid } from "@chakra-ui/react";
import { ClothGridBox } from "./GridBox";
import { HomeDescText, HomeText } from "./HomeText";


export const ClothSection = ({ name, description, photos, gender, handleSection }) => {
    return (
        <Box
            m={'60px auto 60px'}
            w={['94%', '94%', '94%', '94%', '80%']}
            textAlign={'center'}
        >
            <HomeText>{name}</HomeText>
            <HomeDescText>{description}</HomeDescText>

            <Grid
                onClick={() => { handleSection(gender) }}
                gap={['10px', '10px', '10px', '10px', '20px']}
                templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)"]}
            >
                <ClothGridBox source={photos[0]} />
                <ClothGridBox source={photos[1]} />
                <ClothGridBox source={photos[2]} />
                <ClothGridBox source={photos[3]} />
            </Grid>
        </Box>
    );
};