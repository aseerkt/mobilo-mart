import { Button, Divider, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { Review } from '../types/mobile';
import ReviewForm from './ReviewForm';
import ReviewItem from './ReviewItem';
import ReviewsRatings from './ReviewsRatings';

interface ReviewsFCProps {
  reviews: Review[];
  numReviews: number;
  mobileId: string;
}

function Reviews({ mobileId, reviews, numReviews }: ReviewsFCProps) {
  const { data, status } = useSession();
  const user = data?.user;
  const unauthenticated = status === 'unauthenticated';
  const cannotReview = useMemo(
    () =>
      unauthenticated ||
      reviews.some((review) => review.user.email === user.email),
    [reviews, user, unauthenticated]
  );

  return (
    <Grid
      py='10'
      px='2'
      gridTemplateColumns={{ base: '1fr', md: '250px auto', lg: '450px auto' }}
      gap={8}
    >
      <ReviewsRatings reviews={reviews} numReviews={numReviews} />
      <GridItem>
        <Text fontSize='xl' fontWeight='bold'>
          Reviews
        </Text>
        <Divider my='5' />
        {reviews.length === 0 && (
          <Flex mb='4' h='40' p='5' border='1px solid lightblue' align='center'>
            <Text>This product has no public reviews</Text>
          </Flex>
        )}
        {!cannotReview && <ReviewForm mobileId={mobileId} />}
        {unauthenticated && (
          <Button colorScheme='teal' size='sm' my='2'>
            Log in to add review
          </Button>
        )}
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </GridItem>
    </Grid>
  );
}

export default Reviews;
