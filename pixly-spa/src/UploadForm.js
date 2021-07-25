import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import UserContext from './context/userContext';
import PixlyApi from './PixlyApi';

function UploadForm() {
  const [formData, setFormData] = useState(null);
  const { user } = useContext(UserContext);
  const history = useHistory()

  function handleChange(evt) {
    setFormData(fData => ({ image: evt.target.files[0] }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    PixlyApi.uploadImage(formData, user.token);
    history.push(`/profile`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload an image!</h2>
      <input onChange={handleChange} name='image' type="file"  />
      <button>Upload</button>
    </form>
  );
}

export default UploadForm;
