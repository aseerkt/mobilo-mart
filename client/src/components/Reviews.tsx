import { Divider, Flex, Grid, GridItem, Text } from '@chakra-ui/layout';
import { useMemo } from 'react';
import useUser from '../libs/useUser';
import { Review } from '../types/mobile';
import ReviewForm from './ReviewForm';
import ReviewItem from './ReviewItem';
import ReviewsProgress from './ReviewsProgress';

interface ReviewsFCProps {
  reviews: Review[];
  numReviews: number;
  mobileId: string;
}

function Reviews({ mobileId, reviews, numReviews }: ReviewsFCProps) {
  const { user } = useUser();
  const cannotReview = useMemo(
    () => !user || reviews.some((review) => review.user.id === user.id),
    [reviews, user]
  );

  return (
    <Grid
      py='10'
      px='2'
      gridTemplateColumns={{ base: '1fr', md: '250px auto', lg: '450px auto' }}
      gap={8}
    >
      <ReviewsProgress reviews={reviews} numReviews={numReviews} />
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
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </GridItem>
    </Grid>
  );
}

export default Reviews;
