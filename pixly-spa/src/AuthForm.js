import { useEffect, useState } from 'react';

function AuthForm({ type, authFunc }) {
  let initialState;
  switch (type) {
    case 'login':
      initialState = { username: '', password: '' };
      break;
    case 'register':
      initialState = { username: '', password: '', firstName: '', lastName: '' };
      break;
  }
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    setFormData(initialState);
  }, [type]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    authFunc(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map(k => {
        return <div key={k}>
          <label htmlFor={k}>{k}</label>
          <input id={k} name={k} value={formData[k]} onChange={handleChange} />
        </div>;
      })}
      <button>{type === "login" ? "Login" : "Register"}</button>
    </form>
  );
}

export default AuthForm;
