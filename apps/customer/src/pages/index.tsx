import Carousel from '@/components/Carousel';
import ProductCard from '@/components/ProductCard';
import dbConnect from '@/database';
import Mobile from '@/database/models/Mobile';
import fetcher from '@/libs/fetcher';
import { parseDoc } from '@/utils/objUtils';
import { Box, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

export default function Home() {
  const { data } = useSWR('/api/products', fetcher);

  return (
    <Box bg='gray.100'>
      <Head>
        <title>Mobilo Mart</title>
        <meta name='description' content='Mobile focused shopping franchise' />
      </Head>
      <Carousel />
      <Text
        id='browse'
        color='blackAlpha'
        textTransform='uppercase'
        fontSize='3xl'
        textAlign='center'
        mb='6'
        pt='16'
        mt='-16'
        fontWeight='700'
      >
        {' '}
        Browse Mobiles
      </Text>
      <Box
        pos='relative'
        maxW='7xl'
        mx='auto'
        display='grid'
        gridTemplateColumns='repeat(auto-fit, minmax(250px, 1fr))'
        gridGap='5'
        zIndex={50}
        pb='10'
      >
        {data?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Box>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async function () {
  await dbConnect();
  const mobiles = await Mobile.find({});

  return {
    props: {
      fallback: { '/api/products': parseDoc(mobiles) },
    },
    revalidate: 1800,
  };
};
