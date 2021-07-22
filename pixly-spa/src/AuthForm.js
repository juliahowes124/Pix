import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
} from "@chakra-ui/react"

function AuthForm({ type, authFunc }) {

  function validateUserName(value) {
    let error;
    if(!value) {
      error = "Username is required."
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if(!value) {
      error = "Password is required."
    }
    return error;
  }

  return (
    <Formik
      initialValues={{username: '', password: ''}}
      onSubmit={(values, actions) => {
        authFunc(values);
        actions.setSubmitting(false);
      }}
    >
       {(props) => (
        <Form>
          <Field name="username" validate={validateUserName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.username && form.touched.username}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input {...field} id="username" placeholder="Username" />
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password" validate={validatePassword}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.password && form.touched.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input {...field} id="password" placeholder="Password" />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            {type === 'login' ? "Login" : "Register"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AuthForm;
