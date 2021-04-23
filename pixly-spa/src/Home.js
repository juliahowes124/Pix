import {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PixlyApi from './PixlyApi';
import ImagesContext from './context/imagesContext';

function Home() {
  const {images, setImages} = useContext(ImagesContext);

  useEffect(() => {
    async function getImages() {
      const images = await PixlyApi.fetchImages();
      setImages(images);
    };
    getImages();
  }, []);

  return (
    images ? (
      images.map(i => <Link key={i.id} to={`/images/${i.id}`}>
        <img src={i.url}  style={{width: '200px', height: '200px'}}/>
      </Link>)
    ) : (
      <div>Loading...</div>
    )
  );
}

export default Home;
