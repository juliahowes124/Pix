import { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Jimp from 'jimp';
import { Text, Center, Image, Button, VStack } from '@chakra-ui/react'
import PixlyApi from './PixlyApi';
import UserContext from './context/userContext';

function ImageDetails() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getImage() {
      const image = await PixlyApi.fetchImageById(+id, user.token);
      setImage(image.s3Url);
    }

    getImage();
  }, []);

  function handleEdit(method, arg) {
    setIsLoading(true)
    Jimp.read(image).then(img => img[method](arg).getBuffer(Jimp.AUTO, bufferCB));
  }

  function handleEditColor(method, arg) {
    setIsLoading(true)
    Jimp.read(image).then(img => {
      img.color([
        { apply: method, params: [arg] }
      ]).getBuffer(Jimp.AUTO, bufferCB);
    });
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
    <Center>
      <Image src={image} boxSize="md" objectFit="cover"/>
      <VStack justifyContent="space-between">
        <Button isLoading={isLoading} variant="primary" onClick={() => { handleEditColor('greyscale') }}>Grey scale</Button>
        <Button isLoading={isLoading} variant="primary" onClick={() => { handleEdit('posterize', 10) }}>Posterize</Button>
        <Button isLoading={isLoading} variant="primary" onClick={() => { handleEditColor('saturate', 50) }}>Saturate</Button>
      <Button isLoading={isLoading} variant="primary" onClick={uploadFile} justifySelf="end">Save New</Button>
      </VStack>
    </Center>
  );
}

export default ImageDetails;
