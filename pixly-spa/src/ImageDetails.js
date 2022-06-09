import { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Jimp from 'jimp';
import { Text, Center, Image, Button, Box, HStack, Spinner} from '@chakra-ui/react'
import PixlyApi from './PixlyApi';
import UserContext from './context/userContext';
import { PageLayout } from './components/PageLayout';
import {MdGradient, MdBlurOn} from 'react-icons/md'
import {HiSun} from 'react-icons/hi'
import {ImContrast} from 'react-icons/im'
import {IoInvertModeOutline} from 'react-icons/io5'
import { Loading } from './components/Loading';

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
      const image = await PixlyApi.fetchImageById(+id, user);
      setImage(image.s3Url);
      setOriginalImage(image.s3Url)
    }

    getImage();
  }, [id, user]);

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
    await PixlyApi.uploadImage({ image: file }, user);
    setIsLoading(false)
    history.push('/')
  }

  if(!image) {
    return <Loading/>
  }

  return (
    <PageLayout title="Edit Photo">
      <Center flexDir="column">
        <Box position="relative" mr="2rem">
          <Image src={image} boxSize="sm" objectFit="cover"/>
          <Center boxSize="sm" position="absolute" top={0} bg="white" opacity=".5" display={isLoading ? 'flex' : 'none'}>
            <Spinner/>
          </Center>
        </Box>
        <HStack justifyContent="space-between" my="1rem" alignItems="start">
          <Button isDisabled={isLoading} variant="secondary" onClick={() => { handleEdit('posterize', 10) }}><MdGradient/></Button>
          <Button isDisabled={isLoading} variant="secondary" onClick={() => { handleEdit('brightness', .2) }}><HiSun/></Button>
          <Button isDisabled={isLoading} variant="secondary" onClick={() => { handleEdit('contrast', .1) }}><ImContrast/></Button>
          <Button isDisabled={isLoading} variant="secondary" onClick={() => { handleEdit('blur', 2) }}><MdBlurOn/></Button>
          <Button isDisabled={isLoading} variant="secondary" onClick={() => { handleEdit('invert') }}><IoInvertModeOutline/></Button>
        </HStack>
        <HStack>

        <Button isDisabled={isLoading} variant="primary" onClick={handleReset}>Reset</Button>
        <Button isDisabled={isLoading} variant="primary" onClick={uploadFile}>Save New</Button>
        </HStack>
      </Center>
    </PageLayout>
  );
}

export default ImageDetails;
