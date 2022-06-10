import { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Jimp from 'jimp';
import { Text, Center, Image, Button, Box, VStack, Spinner} from '@chakra-ui/react'
import PixlyApi from './PixlyApi';
import UserContext from './context/userContext';
import { PageLayout } from './components/PageLayout';

function ImageDetails() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null)
  const [file, setFile] = useState(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getImage() {
      const image = await PixlyApi.fetchImageById(+id, user.token);
      setImage(image.s3Url);
      setOriginalImage(image.s3Url)
    }

    getImage();
  }, []);

  function handleReset() {
    setImage(originalImage)
  }

  function handleEdit(method, arg) {
    setIsLoading(true)
    Jimp.read(image).then(img => img[method](arg).getBuffer(Jimp.AUTO, bufferCB));
  }

  function bufferCB(err, buffer) {
    if(err) console.log('photo edit error: ', err)
    setFile(new File([buffer.buffer], "image.png", { type: "image/png" }));
    let base64String = buffer.toString('base64');
    setImage('data:image/png;base64,' + base64String);
    setIsLoading(false);
  }

  async function uploadFile() {
    setIsLoading(true)
    await PixlyApi.uploadImage({ image: file }, user.token);
    setIsLoading(false)
    history.push('/')
  }

  if(!image) {
    return <Text>Loading...</Text>
  }

  return (
    <PageLayout title="Photo editing">
      <Center flexDirection="row">
        <Box position="relative" mr="2rem">
          <Image src={image} boxSize="md" objectFit="cover"/>
          <Center boxSize="md" position="absolute" top={0} bg="white" opacity=".5" display={isLoading ? 'flex' : 'none'}>
            <Spinner/>
          </Center>
        </Box>
        <VStack justifyContent="space-between" my="3rem" alignItems="start">
          <Button isDisabled={isLoading} variant="secondary" onClick={() => { handleEdit('posterize', 10) }}>Posterize</Button>
          <Button isDisabled={isLoading} variant="secondary" onClick={() => { handleEdit('sepia') }}>Sepia</Button>
          <Button isDisabled={isLoading} variant="secondary" onClick={() => { handleEdit('brightness', .2) }}>Brighten</Button>
          <Button isDisabled={isLoading} variant="secondary" onClick={() => { handleEdit('contrast', .1) }}>Contrast +</Button>
          <Button isDisabled={isLoading} variant="secondary" onClick={() => { handleEdit('blur', 2) }}>Blur</Button>
          <Button isDisabled={isLoading} variant="secondary" onClick={() => { handleEdit('invert') }}>Invert</Button>
        <Button isDisabled={isLoading} variant="primary" onClick={handleReset}>Reset</Button>
        <Button isDisabled={isLoading} variant="primary" onClick={uploadFile}>Save New</Button>
        </VStack>
      </Center>
    </PageLayout>
  );
}

export default ImageDetails;
