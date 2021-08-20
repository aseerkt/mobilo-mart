import useCartStore from '@/store/cartStore';
import { Mobile } from '@/types/mobile';
import {
  Flex,
  InputGroup,
  InputLeftElement,
  Icon,
  Select,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';

interface AddToCartProps {
  product?: Mobile;
}

function AddToCart({ product }: AddToCartProps) {
  const [qty, setQty] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Flex
      direction='column'
      p='5'
      border='1px solid lightgray'
      borderRadius='lg'
    >
      <Button colorScheme='teal' onClick={() => addToCart(product, qty)}>
        Add to Cart
      </Button>
      <Flex alignItems='center' marginY='2'>
        <Text fontWeight='500' marginRight='2'>
          Quantity
        </Text>
        <Select
          variant='filled'
          size='sm'
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value))}
        >
          {new Array(11).fill(0).map((_, i) => (
            <option key={`qty_${i}`} value={i}>
              {i} {i === 0 && '(Delete)'}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
}

export default AddToCart;
