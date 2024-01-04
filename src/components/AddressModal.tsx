import InputField from '@/shared/InputField';
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
  useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';
import { useStore } from '../store';

const AddressModal: React.FC<{ edit?: boolean; addressToEdit?: Address }> = ({
  children,
  edit = false,
  addressToEdit,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { addAddress, editAddress } = useStore();

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        {children}
      </div>
      <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{edit ? 'Edit' : 'Add'} address</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody mt='5'>
            <Formik
              initialValues={
                !edit
                  ? {
                      fullName: '',
                      emailAddress: '',
                      mobileNumber: '',
                      streetAddress: '',
                      city: '',
                      state: '',
                    }
                  : addressToEdit
              }
              onSubmit={(values) => {
                const addressValues = {
                  ...values,
                  mobileNumber: Number(values.mobileNumber),
                };
                if (!edit) {
                  addAddress(addressValues);
                } else {
                  editAddress({
                    id: addressToEdit.id,
                    ...addressValues,
                  });
                }
                onClose();
              }}
            >
              {() => (
                <Form id='add-address-form'>
                  <InputField
                    label='Full Name'
                    isRequired
                    name='fullName'
                    placeholder='John Doe'
                  />
                  <InputField
                    type='email'
                    label='Email Address'
                    isRequired
                    name='emailAddress'
                    placeholder='johndoe@gmail.com'
                  />
                  <InputField
                    type='tel'
                    label='Mobile No.'
                    isRequired
                    name='mobileNumber'
                    placeholder='9487989890'
                  />
                  <InputField
                    label='Street Address'
                    isRequired
                    name='streetAddress'
                    placeholder='Duplex House, West Street 145'
                  />
                  <InputField
                    label='City'
                    isRequired
                    name='city'
                    placeholder='Calicut'
                  />
                  <InputField
                    label='State'
                    isRequired
                    name='state'
                    placeholder='Kerala'
                  />
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <Button type='button' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              form='add-address-form'
              leftIcon={edit ? <FaEdit /> : <FaPlusCircle />}
              type='submit'
              colorScheme='blue'
            >
              Address
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddressModal;
