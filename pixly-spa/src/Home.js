import {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { Text, Grid, Box, Image, GridItem } from "@chakra-ui/react"
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
      <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={4}>
        {images.length ? images.map(image => (
          <GridItem mb={8} key={image.id} cursor="pointer">
            <Image src={image.s3Url} onClick={() => handleImageClick(image.id)} boxSize="sm" objectFit="cover"/>
          </GridItem>
        )): <Text width="100%" textAlign="center">No photos yet!</Text>}
      </Grid>
    </PageLayout>
  );
}

export default Home;
