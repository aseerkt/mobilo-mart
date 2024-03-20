import { Address } from '@/types/address';
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';
import { InputField } from 'ui/components';
import { useStore } from '../store';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addressToEdit?: Address;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  addressToEdit,
}) => {
  const { addAddress, editAddress } = useStore((state) => ({
    addAddress: state.addAddress,
    editAddress: state.editAddress,
  }));

  const form = useForm({
    defaultValues: addressToEdit ?? {
      fullName: '',
      emailAddress: '',
      mobileNumber: '',
      streetAddress: '',
      city: '',
      state: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    const addressValues = {
      ...values,
      mobileNumber: values.mobileNumber,
    };
    if (addressToEdit) {
      editAddress({
        id: addressToEdit.id,
        ...addressValues,
      });
    } else {
      addAddress(addressValues);
    }
    onClose();
  });

  return (
    <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{addressToEdit ? 'Edit' : 'Add'} address</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody mt='5'>
          <form id='add-address-form' onSubmit={onSubmit}>
            <VStack spacing={5}>
              <InputField
                label='Full Name'
                control={form.control}
                name='fullName'
                placeholder='John Doe'
              />
              <InputField
                type='email'
                label='Email Address'
                control={form.control}
                name='emailAddress'
                placeholder='johndoe@gmail.com'
              />
              <InputField
                type='tel'
                label='Mobile No.'
                control={form.control}
                name='mobileNumber'
                placeholder='9487989890'
              />
              <InputField
                label='Street Address'
                control={form.control}
                name='streetAddress'
                placeholder='Duplex House, West Street 145'
              />
              <InputField
                label='City'
                control={form.control}
                name='city'
                placeholder='Calicut'
              />
              <InputField
                label='State'
                control={form.control}
                name='state'
                placeholder='Kerala'
              />
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type='button' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            form='add-address-form'
            leftIcon={addressToEdit ? <FaEdit /> : <FaPlusCircle />}
            type='submit'
            colorScheme='blue'
          >
            Address
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default AddressModal;
