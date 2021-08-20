import { GetStaticProps, GetStaticPaths } from 'next';
import fetcher from '@/libs/fetcher';
import Head from 'next/head';
import useSWR from 'swr';
import { Mobile } from '@/types/mobile';
import {
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  Image,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import ProductRating from '@/components/ProductRating';
import { formatPrice } from '@/utils/formatNumbers';
import AddToCart from '@/components/AddToCart';

function SingleProduct({ product }) {
  const { data } = useSWR(`/produts/${product?.id}`, {
    initialData: product,
  });

  const mrp = (data?.price * 100) / (100 - data?.discount) || 0;
  let deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + data?.deliveryDays);

  return (
    <div>
      <Head>
        <title>{data?.name}</title>
      </Head>
      <Grid
        paddingX='2'
        maxW='7xl'
        marginX='auto'
        gap={8}
        paddingTop={10}
        templateColumns={{
          base: '1fr',
          sm: 'auto 250px 250px',
          md: 'auto 350px 250px',
          lg: '450px auto 250px',
        }}
      >
        {/* IMAGE */}
        <Flex justifyContent='center' alignItems='center'>
          <Image src={data?.image} alt={data?.name} />
        </Flex>
        {/* DETAILS */}
        <Flex direction='column'>
          <Text fontWeight='bold' fontSize='lg'>
            {data?.name}
          </Text>
          <ProductRating
            id={data?.id}
            stars={data?.stars}
            numReviews={data?.numReviews}
          />
          <Divider />
          <Table
            w='max-content'
            variant='simple'
            size='sm'
            colorScheme='blackAlpha'
          >
            <TableCaption placement='top'>Mobile Price Details</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign='right'>MRP</Th>
                <Td>
                  <Text
                    fontSize='small'
                    color='gray'
                    textDecoration='line-through'
                  >
                    {formatPrice(mrp)}
                  </Text>
                </Td>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Th textAlign='right'>Deal Price</Th>
                <Td>
                  <Text fontWeight='bold' fontSize='lg' color='red'>
                    {formatPrice(data?.price)}
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Th textAlign='right'>You Save</Th>
                <Td>
                  <Text fontWeight='500' fontSize='small'>
                    {formatPrice(mrp - data?.price)} ({data?.discount}%)
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
        {/* ADD TO CART */}
        <AddToCart product={data} />
      </Grid>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async function ({ params }) {
  const productData = await fetcher(`/products/${params.productId}`);
  return { props: { product: productData } };
};
export const getStaticPaths: GetStaticPaths = async function () {
  const productsData = await fetcher('/products');

  const paths = productsData?.map((p: Mobile) => ({
    params: { productId: p.id },
  }));

  return { paths, fallback: false };
};

export default SingleProduct;
