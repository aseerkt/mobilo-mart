import AddToCart from '@/components/AddToCart';
import ProductRating from '@/components/ProductRating';
import fetcher from '@/libs/fetcher';
import { Mobile } from '@/types/mobile';
import { formatPrice } from '@/utils/formatNumbers';
import {
  Divider,
  Flex,
  Grid,
  Image,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

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
        px='2'
        maxW='7xl'
        mx='auto'
        gap={8}
        pt={10}
        templateColumns={{
          base: '1fr',
          sm: 'auto 250px 250px',
          md: 'auto 350px 250px',
          lg: '450px auto 250px',
        }}
      >
        {/* IMAGE */}
        <Flex justify='center' align='center' border='1px solid lightcyan'>
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
