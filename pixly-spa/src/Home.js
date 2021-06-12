import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PixlyApi from './PixlyApi';

function Home() {
  const [images, setImages] = useState(null); //without context, since 2 different endpoints, or move context closer
  

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
        <img src={i.s3_url}  style={{width: '200px', height: '200px'}}/>
      </Link>)
    ) : (
      <div>Loading...</div>
    )
  );
}

export default Home;
