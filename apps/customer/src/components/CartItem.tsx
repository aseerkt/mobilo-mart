import { CartItemType } from '@/store/cartStore';
import { formatPrice } from '@/utils/numericUtils';
import { Button, Divider, Flex, Grid, Image, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useStore } from '../store';
import QuantitySelector from './QuantitySelector';

interface CartItemProps {
  cartItem: CartItemType;
}

function CartItem({ cartItem: i }: CartItemProps) {
  const changeItemQty = useStore((state) => state.changeItemQty);
  const removeItem = useStore((state) => state.removeItem);

  return (
    <>
      <Grid
        templateColumns={{ base: '1fr', sm: '176px auto 130px' }}
        justifyItems={{ base: 'center', sm: 'unset' }}
        py='4'
        gap='5'
      >
        <Flex h='44' w='44' justify='center' align='center'>
          <Image
            h='full'
            objectFit='contain'
            src={i.product.image}
            alt={i.product.name}
          />
        </Flex>
        <Flex
          direction='column'
          alignItems={{ base: 'center', sm: 'flex-start' }}
          minH={{ base: '44', sm: 'unset' }}
          px={{ base: '5', sm: 'unset' }}
        >
          <NextLink href={`/products/${i.product._id}`}>
            <Text
              noOfLines={2}
              fontSize='lg'
              fontWeight='600'
              cursor='pointer'
              color='blue.800'
              textAlign={{ base: 'center', sm: 'left' }}
              _hover={{
                color: 'blue.500',
              }}
            >
              {i.product.name}
            </Text>
          </NextLink>
          <Text fontWeight='500' fontSize='sm' color='green'>
            In Stock
          </Text>
          <Text>FREE Delivery</Text>
          <Flex mt='auto' mb='1' align='center'>
            <Flex align='center'>
              <QuantitySelector
                minimalText
                qty={i.qty}
                onQtyChange={(e) =>
                  changeItemQty(i.product._id, parseInt(e.target.value))
                }
              />
            </Flex>
            <Divider mx='2' orientation='vertical' />
            <Button
              onClick={() => removeItem(i.product._id)}
              fontWeight='500'
              variant='link'
            >
              Delete
            </Button>
          </Flex>
        </Flex>
        <Text
          textAlign='right'
          fontSize={{ base: 'xl', sm: 'unset' }}
          fontWeight='800'
          color='red'
        >
          {formatPrice(i.product.price)}
        </Text>
      </Grid>
      <Divider />
    </>
  );
}

export default CartItem;
