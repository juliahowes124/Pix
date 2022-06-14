import { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Jimp from 'jimp';
import { Center, Image, Button, Box, HStack, Spinner, Text} from '@chakra-ui/react'
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
  const [hoveredFilter, setHoveredFilter] = useState('');

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

  const handleMouseLeave = () => {
    setHoveredFilter("")
  }

  if(!image) {
    return <Loading/>
  }

  return (
    <PageLayout title="Edit Photo">
      <Center flexDir="column" w={["100%", null, "50%"]}>
      <Text h={4} mb={4} color="dark">{hoveredFilter}</Text>
      <HStack justifyContent="space-between" alignItems="start">
          <Button isDisabled={isLoading} variant="tertiary" onClick={() => { handleEdit('posterize', 10) }} onMouseOver={() => setHoveredFilter("Posterize")} onMouseLeave={handleMouseLeave}><MdGradient/></Button>
          <Button isDisabled={isLoading} variant="tertiary" onClick={() => { handleEdit('brightness', .2) }} onMouseOver={() => setHoveredFilter("Brightness +")} onMouseLeave={handleMouseLeave}><HiSun/></Button>
          <Button isDisabled={isLoading} variant="tertiary" onClick={() => { handleEdit('contrast', .1) }} onMouseOver={() => setHoveredFilter("Contrast +")} onMouseLeave={handleMouseLeave}><ImContrast/></Button>
          <Button isDisabled={isLoading} variant="tertiary" onClick={() => { handleEdit('blur', 2) }} onMouseOver={() => setHoveredFilter("Blur")} onMouseLeave={handleMouseLeave}><MdBlurOn/></Button>
          <Button isDisabled={isLoading} variant="tertiary" onClick={() => { handleEdit('invert') }} onMouseOver={() => setHoveredFilter("Invert")} onMouseLeave={handleMouseLeave}><IoInvertModeOutline/></Button>
        </HStack>
        <Box position="relative">
          <Image src={image} boxSize="sm" objectFit="cover"/>
          <Center boxSize="sm" position="absolute" top={0} bg="white" opacity=".5" display={isLoading ? 'flex' : 'none'}>
            <Spinner/>
          </Center>
        </Box>
       
        <HStack my={4}>

        <Button isDisabled={isLoading} variant="secondary" onClick={handleReset}>Reset</Button>
        <Button isDisabled={isLoading} variant="primary" onClick={uploadFile}>Save New</Button>
        </HStack>
      </Center>
    </PageLayout>
  );
}

export default ImageDetails;
