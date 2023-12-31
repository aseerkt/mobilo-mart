import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useField } from 'formik';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  isRequired?: boolean;
  helperText?: string;
  elementType?: 'input' | 'textarea' | 'select';
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  isRequired,
  size: _,
  helperText,
  ...props
}) => {
  const [field, { touched, error }] = useField(props);
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input variant='filled' {...props} {...field} />
      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage>{touched && error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
