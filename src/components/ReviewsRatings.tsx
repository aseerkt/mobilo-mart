import { Divider, GridItem, Text, Flex } from '@chakra-ui/layout';
import { Progress } from '@chakra-ui/progress';
import { Review } from '../types/mobile';

interface ReviewsRatingsProps {
  reviews: Review[];
  numReviews: number;
}

function ReviewsRatings({ reviews }: ReviewsRatingsProps) {
  return (
    <GridItem>
      <Text fontSize='xl' fontWeight='bold'>
        Customer Ratings
      </Text>
      <Divider my='5' />
      {reviews.length === 0 ? (
        <Flex h='40' p='4' align='center' border='1px solid lightblue'>
          No public customer ratings
        </Flex>
      ) : (
        <Flex
          border='1px solid lightblue'
          borderRadius='md'
          p={{ base: '3', sm: '5' }}
          direction='column'
        >
          <Text mb='3'>
            {reviews.length} public rating{reviews.length !== 1 && 's'}
          </Text>
          {[5, 4, 3, 2, 1].map((v) => {
            const count = reviews.reduce(
              (prev, curr) => prev + (curr.rating === v ? 1 : 0),
              0
            );
            const percent = parseInt(
              ((count * 100) / reviews.length).toFixed(0)
            );
            return (
              <Flex my='2' align='center' justify='space-between'>
                <Text w={{ base: '12', sm: '16' }}>{v} star</Text>
                <Progress
                  colorScheme='yellow'
                  size='lg'
                  flex='1'
                  mx='1'
                  hasStripe
                  value={percent}
                  title={
                    percent > 0 && `${percent}% of reviews have ${v} stars`
                  }
                />
                <Text w={{ base: '10', sm: '16' }} textAlign='right'>
                  {percent}%
                </Text>
              </Flex>
            );
          })}
        </Flex>
      )}
    </GridItem>
  );
}

export default ReviewsRatings;
