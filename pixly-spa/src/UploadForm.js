import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import UserContext from './context/userContext';
import PixlyApi from './PixlyApi';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Box,
  Heading,
  Flex,
  Spacer,
  Image,
} from "@chakra-ui/react"

function UploadForm() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [previewUrl, setPreviewUrl] = useState(null);

  function validateImage(value) {
    let error;
    if(!value) {
      error = "Please select image to upload."
    }
    return error;
  }

  return (
    <Box w={["90%", "90%", "50%", "50%"]} p={4} m="auto" bg="white" mt="100" position="relative">
    <Heading mb="5">
      Upload an Image
    </Heading>
    <Formik
          initialValues={{image: null}}
          onSubmit={async (values, actions) => {
            await PixlyApi.uploadImage(values, user);
            history.push(`/`);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Field name="image" validate={validateImage}>
                {({ field, form }) => (
                  <FormControl mb="5" isInvalid={form.errors.image && form.touched.image}>
                    <FormLabel htmlFor="image">
                    <Heading variant="secondary">Upload: </Heading>
                    </FormLabel>
                    <Input {...field} id="image" value={undefined} type="file" onChange={(evt) => {
                      const file = evt.target.files[0];
                      if(!file) return;
                      const fileReader = new FileReader();
                      fileReader.onload = () => {
                        setPreviewUrl(fileReader.result);
                      }
                      fileReader.readAsDataURL(file);
                      props.setFieldValue("image", file);
                    }} />
                    <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {previewUrl && 
                <Flex mt="5" flexDirection="column">
                  <Heading variant="secondary">Preview: </Heading>
                  <Image src={previewUrl} boxSize="xxs" objectFit="cover" alignSelf="center"/>
                </Flex>
              }
              <Flex justify="right">
                <Spacer/>
                <Box>
                  <Button
                    mt={4}
                    variant="primary"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Upload
                  </Button>
                </Box>
              </Flex>
            </Form>
          )}
        </Formik>
  </Box>
  );
}

export default UploadForm;
