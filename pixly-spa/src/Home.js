import {useContext, useEffect} from 'react';
import PixlyApi from './PixlyApi';
import ImagesContext from './context/imagesContext';

function Home() {
  const {images, setImages} = useContext(ImagesContext);

  useEffect(() => {
    async function getImages() {
      const images = await PixlyApi.fetchImages();
      console.log(images);
      setImages(images);
    };
    getImages();
  }, []);

  return (
    images ? (
      images.map(i => <img src={i.url} key={i.id} style={{width: '200px', height: '200px'}}/>)
    ) : (
      <div>Loading...</div>
    )
  );
}

export default Home;
