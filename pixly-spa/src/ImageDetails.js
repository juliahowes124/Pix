import {useContext, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ImagesContext from './context/imagesContext';
import Jimp from 'jimp';

function ImageDetails() {
  const {id} = useParams();
  const {images} = useContext(ImagesContext);
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    const image = images.find(i => i.id === +id);
    Jimp.read(image.url)
      .then(img => {
        return img
          .resize(256, 256) // resize
          .quality(60) // set JPEG quality
          .greyscale() // set greyscale
          .getBuffer(Jimp.AUTO, (err, buffer) => {
            const bytes = new Uint8Array(buffer);
            const STRING_CHAR = String.fromCharCode.apply(null, bytes);
            let base64String = btoa(STRING_CHAR);
            setEdit('data:image/png;base64,'+ base64String);
          });
      })
      .catch(err => {
        console.error(err);
      });
    setImage(image);
  }, [images, id]);

  
  

  return ( image ? (
    <>
    <img src={image.url}/>
    <img src={edit}/>
    </>
  ) : (
    <h2>Loading...</h2>
  )
  );
}

export default ImageDetails;
