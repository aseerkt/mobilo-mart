import { numberWithCommas } from '@/utils/formatNumbers';
import { Flex, Text } from '@chakra-ui/react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface RatingProps {
  id: string;
  stars: number;
  numReviews: number;
}

function ProductRating({ id, stars, numReviews }: RatingProps) {
  return (
    <Flex
      title={`${stars.toFixed(1)} out of 5.0 (${numReviews} ratings)`}
      userSelect='none'
      marginY='2'
      alignItems='center'
      w='max-content'
    >
      <Flex color='yellow.400' marginRight='2'>
        {[1, 2, 3, 4, 5].map((v) =>
          stars >= v ? (
            <FaStar key={`star_full_${v}_${id}`} size='1.4em' />
          ) : stars >= v - 0.5 ? (
            <FaStarHalfAlt key={`star_half_${v}_${id}`} size='1.4em' />
          ) : (
            <FaRegStar key={`star_none_${v}_${id}`} size='1.4em' />
          )
        )}
      </Flex>
      <Text fontWeight='500' color='teal' fontSize='sm'>
        {numberWithCommas(numReviews)} ratings
      </Text>
    </Flex>
  );
}

export default ProductRating;
