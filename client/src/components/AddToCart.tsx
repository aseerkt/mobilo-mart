import { Mobile } from '@/types/mobile';
import { Flex, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useStore } from '../store';
import QuantitySelector from './QuantitySelector';

interface AddToCartProps {
  product?: Mobile;
}

function AddToCart({ product }: AddToCartProps) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const addToCart = useStore((state) => state.addToCart);

  return (
    <>
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
    </>
  );
}

export default AddToCart;
