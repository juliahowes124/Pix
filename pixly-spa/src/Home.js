import {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { Text, Flex, Box, Image } from "@chakra-ui/react"
import PixlyApi from './PixlyApi';

function Home() {
  const [images, setImages] = useState(null);
  const history = useHistory();
  
  useEffect(() => {
    async function getImages() {
      const images = await PixlyApi.fetchImages();
      setImages(images);
    };
    getImages();
  }, []);

  const handleImageClick = (id) => {
    history.push(`/images/${id}`)
  }

  if (!images) {
    return <Text>Loading...</Text>
  }

  return (
    <Flex flexWrap="wrap" justifyContent="space-around">
      {images.map(image => (
        <Box boxSize="sm" mb={8} key={image.id}>
          <Image src={image.s3Url} onClick={handleImageClick} boxSize="sm" objectFit="cover"/>
        </Box>
      ))}
    </Flex>
      
  );
}

export default Home;
