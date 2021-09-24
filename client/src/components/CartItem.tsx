import useCartStore, { CartItemType } from '@/store/cartStore';
import { formatPrice } from '@/utils/formatNumbers';
import { Button, Divider, Flex, Grid, Image, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import QuantitySelector from './QuantitySelector';

interface CartItemProps {
  cartItem: CartItemType;
}

function CartItem({ cartItem: i }: CartItemProps) {
  const changeItemQty = useCartStore((state) => state.changeItemQty);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <>
      <Grid
        templateColumns={{ base: '1fr', sm: '176px auto 130px' }}
        py='4'
        gap='5'
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
          <Text fontWeight='500' fontSize='sm' color='green'>
            In Stock
          </Text>
          <Text>FREE Delivery</Text>
          <Flex mt='auto' mb='1' aling='center'>
            <Flex align='center'>
              <QuantitySelector
                minimalText
                qty={i.qty}
                onQtyChange={(e) =>
                  changeItemQty(i.mobile.id, parseInt(e.target.value))
                }
              />
            </Flex>
            <Divider mx='2' orientation='vertical' />
            <Button
              onClick={() => removeItem(i.mobile.id)}
              fontWeight='500'
              variant='link'
            >
              Delete
            </Button>
          </Flex>
        </Flex>
        <Text textAlign='right' fontWeight='800' color='red'>
          {formatPrice(i.mobile.price)}
        </Text>
      </Grid>
      <Divider />
    </>
  );
}

export default CartItem;
