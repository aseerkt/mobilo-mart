import { OrderItem } from '@/types/order';
import { Divider, Flex, Grid, Image, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import DeliveryCD from './DeliveryCD';

interface OrderEntryProps {
  orderItem: OrderItem;
}

function OrderEntry({ orderItem: item }: OrderEntryProps) {
  return (
    <>
      <Grid
        templateColumns={{ base: '1fr', sm: '176px auto' }}
        py='4'
        gap='5'
        alignItems='center'
      >
        <Flex
          h='44'
          w={{ base: 'w-full', sm: '44' }}
          justify='center'
          align='center'
        >
          <Image
            h='full'
            objectFit='contain'
            src={item.product.image}
            alt={item.product.name}
          />
        </Flex>
        <Flex px={{ base: '4', sm: 0 }} direction='column' flex='1'>
          <NextLink href={`/products/${item.product._id}`}>
            <Text
              noOfLines={2}
              fontSize='lg'
              fontWeight='600'
              cursor='pointer'
              color='blue.800'
              _hover={{
                color: 'blue.500',
              }}
            >
              {item.product.name}
            </Text>
          </NextLink>

          <Text>FREE Delivery</Text>
          <Text>Quantity: {item.qty}</Text>
          <DeliveryCD
            productId={item.product._id}
            purchasedDate={item.createdAt}
            deliveryDays={item.product.deliveryDays}
          />
        </Flex>
      </Grid>
      <Divider />
    </>
  );
}

export default OrderEntry;
