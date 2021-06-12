import {useState, useContext, useEffect} from 'react';
import UserContext from './context/userContext';
import PixlyApi from './PixlyApi';

function Profile() {
  const [albums, setAlbums] = useState([]);
  const {user} = useContext(UserContext)

  useEffect(() => {
    async function getAlbums() {
      const albums = await PixlyApi.fetchUserAlbums(user.username, user.token);
      setAlbums(albums);
    };
    getAlbums();
  }, []);


  return (
    albums ? (
      albums.map(a => <h2>{a.name}</h2>)
    ) : (
      <div>Loading...</div>
    )
  );
}

export default Profile;
