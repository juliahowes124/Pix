import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImagesContext from './context/imagesContext';
import Jimp from 'jimp';
import PixlyApi from './PixlyApi';
import UserContext from './context/userContext';

function ImageDetails() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { images } = useContext(ImagesContext);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const image = images.find(i => i.id === +id);
    setImage(image.url);

  }, []);


  function handleEdit(method, arg) {
    Jimp.read(image).then(img => img[method](arg).getBuffer(Jimp.AUTO, bufferCB));
  }

  function handleEditColor(method, arg) {
    Jimp.read(image).then(img => {
      img.color([
        { apply: method, params: [arg] }
      ]).getBuffer(Jimp.AUTO, bufferCB);
    });
  }

  function bufferCB(err, buffer) {
    setFile(new File([buffer.buffer], "image.png", { type: "image/png" }));
    let base64String = buffer.toString('base64');
    setImage('data:image/png;base64,' + base64String);
  }

  function uploadFile() {
    PixlyApi.uploadImage({ image: file }, user.token);
  }

  return (image ? (
    <>
      <img src={image} />
      <button onClick={() => { handleEditColor('greyscale') }}>Edit</button>
      <button onClick={() => { handleEdit('posterize', 10) }}>Edit</button>
      <button onClick={() => { handleEditColor('saturate', 50) }}>Edit</button>
      <button onClick={uploadFile}>Beam me up, Scotty</button>
    </>
  ) : (
    <h2>Loading...</h2>
  )
  );
}

export default ImageDetails;
