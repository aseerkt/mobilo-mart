import NextLink from 'next/link';
import { Grid, Flex, Divider, Button, Text, Image } from '@chakra-ui/react';
import { formatPrice } from '@/utils/formatNumbers';
import { OrderItem } from '../types/order';
import DeliveryCD from './DeliveryCD';

interface OrderEntryProps {
  orderItem: OrderItem;
}

function OrderEntry({ orderItem: i }: OrderEntryProps) {
  return (
    <>
      <Grid
        templateColumns={{ base: '1fr', sm: '176px auto ' }}
        py='4'
        gap='5'
        alignItems='center'
      >
        <Flex h='44' w='44' justify='center' align='center'>
          <Image
            h='full'
            objectFit='contain'
            src={i.mobile.image}
            alt={i.mobile.name}
          />
        </Flex>
        <Flex direction='column' flex='1'>
          <NextLink href={`/products/${i.mobile.id}`}>
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
              {i.mobile.name}
            </Text>
          </NextLink>

          <Text>FREE Delivery</Text>
          <DeliveryCD
            mobileId={i.mobile.id}
            purchasedDate={i.createdAt}
            deliveryDays={i.mobile.deliveryDays}
          />
        </Flex>
      </Grid>
      <Divider />
    </>
  );
}

export default OrderEntry;
