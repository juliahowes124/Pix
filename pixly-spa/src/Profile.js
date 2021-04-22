import {useContext, useEffect} from 'react';
import ImagesContext from './context/imagesContext';
import UserContext from './context/userContext';
import PixlyApi from './PixlyApi';

function Profile() {
  const {images, setImages} = useContext(ImagesContext);
  const {user} = useContext(UserContext)

  useEffect(() => {
    async function getImages() {
      const images = await PixlyApi.fetchUserImages(user.username, user.token);
      setImages(images);
      console.log('images set')
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

export default Profile;
