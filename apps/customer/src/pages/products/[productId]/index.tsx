import AddToCart from '@/components/AddToCart';
import ProductRating from '@/components/ProductRating';
import Reviews from '@/components/Reviews';
import fetcher from '@/libs/fetcher';
import Layout from '@/shared/Layout';
import { IMobile } from '@/types/mobile';
import { formatPrice } from '@/utils/numericUtils';
import { parseDoc } from '@/utils/objUtils';
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
import dbConnect from 'database';
import Mobile from 'database/models/Mobile';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import useSWR from 'swr';

function SingleProduct() {
  const router = useRouter();
  const { data } = useSWR<IMobile | null>(
    `/api/products/${router.query.productId}`,
    fetcher
  );

  const mrp = (data?.price * 100) / (100 - data?.discount) || 0;

  const deliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + data?.deliveryDays);
    return date;
  }, [data?.deliveryDays]);

  return (
    <div>
      <Head>
        <title>{data?.name}</title>
      </Head>
      <Layout>
        <Grid
          px='2'
          py='10'
          gap={8}
          templateColumns={{
            base: '1fr',
            md: '250px auto 250px',
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
              id={data?._id}
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
          <Flex
            direction='column'
            p='5'
            border='1px solid lightgray'
            borderRadius='lg'
          >
            {/* ADD TO CART */}

            <AddToCart product={data} />
            <Text color='teal' fontWeight='semibold' my='2'>
              FREE Delivery
            </Text>
            <Text>{data?.deliveryDays} day delivery</Text>
          </Flex>
        </Grid>
        {data?.reviews && (
          <Reviews
            productId={data?._id}
            reviews={data.reviews}
            numReviews={data?.numReviews}
          />
        )}
      </Layout>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async function ({ params }) {
  await dbConnect();
  const mobile = await Mobile.findById(params.productId);

  if (!mobile) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      fallback: {
        [`/api/products/${params.productId}`]: parseDoc(mobile),
      },
    },
    revalidate: 1800,
  };
};

export const getStaticPaths: GetStaticPaths = async function () {
  await dbConnect();
  const mobiles = await Mobile.find({}).select('_id');

  const paths = mobiles?.map((p) => ({
    params: { productId: p._id.toString() },
  }));

  return { paths, fallback: false };
};

export default SingleProduct;
