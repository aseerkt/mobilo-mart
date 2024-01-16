import { IMobile } from '@/types/mobile';
import { formatPrice } from '@/utils/formatNumbers';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import ProductRating from './ProductRating';

interface ProductCardProps {
  product: IMobile;
}

function ProductCard({ product }: ProductCardProps) {
  const mrp = (product.price * 100) / (100 - product.discount);
  let deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + product.deliveryDays);

  return (
    <Flex
      flexDirection='column'
      bg='white'
      minH='400'
      h='full'
      p='5'
      borderRadius='lg'
    >
      <Flex h='44' marginBottom='4' justifyContent='center' alignItems='center'>
        <Image
          objectFit='contain'
          h='full'
          src={product.image}
          alt={product.name}
        />
      </Flex>
      <Flex
        flex='1'
        direction='column'
        justify='space-between'
        textAlign='center'
        align='center'
      >
        <NextLink href={`products/${product._id}`}>
          <Text
            cursor='pointer'
            noOfLines={3}
            fontSize='md'
            color='blue.800'
            fontWeight='bold'
            _hover={{
              color: 'blue.500',
            }}
          >
            {product.name}
          </Text>
        </NextLink>
        <Flex flexDirection='column' justifyContent='flex-end' align='center'>
          <ProductRating
            id={product._id}
            stars={product.stars}
            numReviews={product.numReviews}
          />
          <Box letterSpacing='wider'>
            <Text color='red' marginY='2' fontSize='lg' fontWeight='500'>
              {formatPrice(product.price)}
            </Text>
            {product.discount > 0 && (
              <Flex fontWeight='500'>
                <Text
                  color='gray'
                  fontSize='small'
                  textDecoration='line-through'
                >
                  {formatPrice(mrp)}
                </Text>
                <Text marginLeft='2' fontSize='small' color='black'>
                  Save {formatPrice(mrp - product.price)} ({product.discount}%)
                </Text>
              </Flex>
            )}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProductCard;
