import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { Control, Controller, get } from 'react-hook-form';

interface InputFieldProps extends InputProps {
  name: string;
  control: Control<any>;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
}

const InputField = ({
  name,
  control,
  label,
  helperText,
  ...rest
}: InputFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <FormControl isInvalid={get(errors, field.name)}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <Input {...rest} {...field} />
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
          <FormErrorMessage>{get(errors, field.name)}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default InputField;
