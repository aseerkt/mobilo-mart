import useCartStore, { CartItemType } from '@/store/cartStore';
import { formatPrice } from '@/utils/formatNumbers';
import {
  Button,
  Divider,
  Flex,
  FormLabel,
  Grid,
  Image,
  Select,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

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
          <Image h='full' objectFit='contain' src={i.image} alt={i.name} />
        </Flex>
        <Flex direction='column' flex='1'>
          <NextLink href={`/products/${i.id}`}>
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
              {i.name}
            </Text>
          </NextLink>
          <Text fontWeight='500' fontSize='sm' color='green'>
            In Stock
          </Text>
          <Text>FREE Delivery</Text>
          <Flex mt='auto' mb='1' aling='center'>
            <Flex align='center'>
              <Text mr='2'>Qty</Text>
              <Select
                variant='filled'
                size='sm'
                value={i.qty}
                onChange={(e) => changeItemQty(i.id, parseInt(e.target.value))}
              >
                {new Array(11).fill(0).map((_, i) => (
                  <option key={`qty_${i}`} value={i}>
                    {i} {i === 0 && '(Delete)'}
                  </option>
                ))}
              </Select>
            </Flex>
            <Divider mx='2' orientation='vertical' />
            <Button
              onClick={() => removeItem(i.id)}
              fontWeight='500'
              variant='link'
            >
              Delete
            </Button>
            <Divider mx='2' orientation='vertical' />
            <Button fontWeight='500' variant='link'>
              Save for later
            </Button>
          </Flex>
        </Flex>
        <Text textAlign='right' fontWeight='800' color='red'>
          {formatPrice(i.price)}
        </Text>
      </Grid>
      <Divider />
    </>
  );
}

export default CartItem;
