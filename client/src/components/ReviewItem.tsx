import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import React, { useCallback } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt, FaTrash } from 'react-icons/fa';
import useSWR from 'swr';
import useUser from '../libs/useUser';
import { Review } from '../types/mobile';
import ReviewForm from './ReviewForm';

interface ReviewItemProps {
  review: Review;
}

function ReviewItem({ review }: ReviewItemProps) {
  const toast = useToast();
  const { user } = useUser();
  const { revalidate } = useSWR(`/products/${review.mobile}`);

  const deleteReview = async () => {
    try {
      await axios.delete(`/reviews/${review.mobile}`);
      await revalidate();

      toast({
        id: 'delete-review',
        title: 'Review deleted',
        status: 'success',
        isClosable: true,
        duration: 2000,
      });
    } catch (err) {
      toast({
        id: `delete-review-error`,
        title: `Review delete failed`,
        description: err.message,
        status: 'error',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  return (
    <Box border='1px solid lightblue' borderRadius='md' p='4' my='4'>
      <Flex mb='3' align='center'>
        <Avatar size='sm' mr='2' name={review.user.name} />
        <Text fontWeight='semibold'>{review.user.name}</Text>
      </Flex>
      <Flex my='2' color='yellow.400' marginRight='2'>
        {[1, 2, 3, 4, 5].map((v) =>
          review.rating >= v ? (
            <FaStar key={`star_full_${v}_${review.id}`} size='1em' />
          ) : review.rating >= v - 0.5 ? (
            <FaStarHalfAlt key={`star_half_${v}_${review.id}`} size='1em' />
          ) : (
            <FaRegStar key={`star_none_${v}_${review.id}`} size='1em' />
          )
        )}
      </Flex>
      <Text color='gray.500' fontSize='xs'>
        Reviewed on{' '}
        {new Date(review.createdAt).toLocaleDateString('en-IN', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </Text>
      <Text my='2' fontWeight='bold'>
        {review.title}
      </Text>
      <Text fontSize='sm'>{review.body}</Text>

      {review.user.id === user?.id && (
        <HStack spacing={3} my='2'>
          <ReviewForm mobileId={review.mobile} edit reviewToEdit={review} />
          <IconButton
            ml='2'
            size='sm'
            colorScheme='red'
            aria-label='delete address'
            onClick={(e) => {
              e.stopPropagation();
              deleteReview();
            }}
            icon={<FaTrash />}
          />
        </HStack>
      )}
    </Box>
  );
}

export default ReviewItem;
