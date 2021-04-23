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
  const [edit, setEdit] = useState(null);
  const [file, setFile] = useState(null);

  function bufferCB(err, buffer) {
    setFile(new File([buffer.buffer], "image.png", {
      type: "image/png",
    }));
    const bytes = new Uint8Array(buffer);
    const STRING_CHAR = String.fromCharCode.apply(null, bytes);
    let base64String = btoa(STRING_CHAR);
    setImage('data:image/png;base64,' + base64String);
  }

  function handleEdit(){
    Jimp.read(image)
      .then(img => {
        return img
          .resize(256, 256) // resize
          .quality(60) // set JPEG quality
          .greyscale() // set greyscale
          .getBuffer(Jimp.AUTO, bufferCB);
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    const image = images.find(i => i.id === +id);
    setImage(image.url);

  }, [])

  // useEffect(() => {
  //   const image = images.find(i => i.id === +id);
  //   Jimp.read(image.url)
  //     .then(img => {
  //       return img
  //         .resize(256, 256) // resize
  //         .quality(60) // set JPEG quality
  //         .greyscale() // set greyscale
  //         .getBuffer(Jimp.AUTO, bufferCB);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  //   setImage(image);
  // }, [images, id]);

  function uploadFile() {
    PixlyApi.uploadImage({ image: file }, user.token);
  }

  return (image ? (
    <>
      <img src={image} />
      <button onClick={handleEdit}>Edit</button>
      <button onClick={uploadFile}>Beam me up, Scotty</button>
    </>
  ) : (
    <h2>Loading...</h2>
  )
  );
}

export default ImageDetails;
