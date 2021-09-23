import useCartStore from '@/store/cartStore';
import { Mobile } from '@/types/mobile';
import { Flex, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import QuantitySelector from './QuantitySelector';

interface AddToCartProps {
  product?: Mobile;
}

function AddToCart({ product }: AddToCartProps) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Flex
      direction='column'
      p='5'
      border='1px solid lightgray'
      borderRadius='lg'
    >
      <Button
        colorScheme='teal'
        onClick={() => {
          addToCart(product, qty);
          router.push('/cart');
        }}
      >
        Add to Cart
      </Button>
      <Flex alignItems='center' marginY='2'>
        <QuantitySelector
          qty={qty}
          onQtyChange={(e) => setQty(parseInt(e.target.value))}
        />
      </Flex>
    </Flex>
  );
}

export default AddToCart;
