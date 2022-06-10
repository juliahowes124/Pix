import {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { Text, Flex, Box, Image } from "@chakra-ui/react"
import PixlyApi from './PixlyApi';
import { PageLayout } from './components/PageLayout';
import UserContext from './context/userContext';
import { Loading } from './components/Loading';

function Home() {
  const [images, setImages] = useState(null);
  const history = useHistory();
  const {user} = useContext(UserContext)
  
  useEffect(() => {
    async function getImages() {
      const images = await PixlyApi.fetchImages(user);
      setImages(images);
    };
    getImages();
  }, [user]);

  const handleImageClick = (id) => {
    history.push(`/images/${id}`)
  }

  if (!images) {
    return <Loading/>
  }

  return (
    <PageLayout title="Photo Library">
      <Flex flexWrap="wrap" justifyContent="space-between">
        {images.length ? images.map(image => (
          <Box boxSize="sm" mb={8} key={image.id} cursor="pointer">
            <Image src={image.s3Url} onClick={() => handleImageClick(image.id)} boxSize="sm" objectFit="cover"/>
          </Box>
        )): <Text width="100%" textAlign="center">No photos yet!</Text>}
      </Flex>
    </PageLayout>
  );
}

export default Home;
