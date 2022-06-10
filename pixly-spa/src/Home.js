import {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { Text, Flex, Box, Image } from "@chakra-ui/react"
import PixlyApi from './PixlyApi';
import { PageLayout } from './components/PageLayout';

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
    <PageLayout title="Your photos">
      <Flex flexWrap="wrap" justifyContent="space-between">
        {images.map(image => (
          <Box boxSize="sm" mb={8} key={image.id} cursor="pointer">
            <Image src={image.s3Url} onClick={() => handleImageClick(image.id)} boxSize="sm" objectFit="cover"/>
          </Box>
        ))}
      </Flex>
    </PageLayout>
  );
}

export default Home;
