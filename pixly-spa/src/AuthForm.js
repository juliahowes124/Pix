import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Box,
  Heading,
  Text,
  Flex,
  Spacer
} from "@chakra-ui/react"

export function AuthForm({ type, authFunc }) {

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
    <Box w={["90%", "90%", "50%", "50%"]} p={4} m="auto"  mt="100" position="relative">
      <Heading mb="5">
        {type === 'login' ? "Login" : "Register"}
      </Heading>
      <Formik
            initialValues={{username: '', password: ''}}
            onSubmit={async (values, actions) => {
              await authFunc(values);
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form>
                <Field name="username" validate={validateUserName}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.username && form.touched.username} mb="5">
                      <FormLabel htmlFor="username">
                        <Text>Username</Text>
                      </FormLabel>
                      <Input {...field} id="username" placeholder="Username"/>
                      <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={validatePassword}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                      <FormLabel htmlFor="password">
                        <Text>Password</Text>
                      </FormLabel>
                      <Input {...field} id="password" placeholder="Password" type="password" />
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Flex justify="right">
                  <Spacer/>
                  <Box>
                    <Button
                      mt={4}
                      variant="primary"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Box>
                </Flex>
              </Form>
            )}
          </Formik>
    </Box>
  );
}
