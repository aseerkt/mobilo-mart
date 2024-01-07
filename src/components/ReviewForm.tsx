import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { FaEdit, FaPlusCircle, FaStar } from 'react-icons/fa';
import { useSWRConfig } from 'swr';
import { IReview } from '../types/mobile';

interface ReviewFormProps {
  edit?: boolean;
  reviewToEdit?: IReview;
  mobileId: string;
}

function ReviewForm({ mobileId, edit = false, reviewToEdit }: ReviewFormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(
    edit ? reviewToEdit : { title: '', rating: 3, body: '' }
  );

  const { mutate } = useSWRConfig();
  const toast = useToast();

  const revalidateProduct = () =>
    mobileId ? mutate(`/products/${mobileId}`) : null;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      if (edit) {
        await axios.put('/reviews', { ...formData, mobileId });
      } else {
        await axios.post('/reviews', { ...formData, mobileId });
      }
      await revalidateProduct();
      toast({
        id: `${edit ? 'edit' : 'post'}-review`,
        title: `Review ${edit ? 'edited' : 'posted'}`,
        status: edit ? 'info' : 'success',
        isClosable: true,
        duration: 2000,
      });
      onClose();
    } catch (err) {
      toast({
        id: `${edit ? 'edit' : 'post'}-review-error`,
        title: `Review ${edit ? 'edit' : 'post'} failed`,
        description: err.message,
        status: 'error',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  return (
    <Flex alignItems='center'>
      <Button
        onClick={onOpen}
        colorScheme='blue'
        variant={edit ? 'outline' : 'solid'}
        size='sm'
      >
        {edit ? 'Edit' : 'Post'} Review
      </Button>

      <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{edit ? 'Edit' : 'Post'} review</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody mt='5'>
            <form id='add-address-form' onSubmit={onSubmit}>
              <FormControl mb='3' id='title' isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder='Great deal! Buy it now'
                />
              </FormControl>
              <FormControl mb='3' id='body'>
                <FormLabel>Review</FormLabel>
                <Textarea
                  value={formData.body}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, body: e.target.value }))
                  }
                  placeholder='Worth purchasing'
                />
              </FormControl>
              <FormControl mb='3' id='rating' isRequired>
                <FormLabel>Rating</FormLabel>
                <Slider
                  aria-label='slider-ex-4'
                  value={formData.rating}
                  min={0}
                  max={5}
                  step={1}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, rating: value }))
                  }
                >
                  <SliderTrack bg='yellow.100'>
                    <SliderFilledTrack bg='yellow.300' />
                  </SliderTrack>
                  <SliderThumb boxSize={6}>
                    <Box color='yellow.300' as={FaStar} />
                  </SliderThumb>
                </Slider>
                <FormHelperText>
                  Selected rating: {formData.rating}
                </FormHelperText>
              </FormControl>
            </form>
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
              Review
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default ReviewForm;