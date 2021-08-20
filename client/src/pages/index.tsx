import { Mobile } from '@/types/mobile';
import { Box } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import useSWR from 'swr';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import fetcher from '../libs/fetcher';

interface HomePageProps {
  products: Mobile[];
}

export default function Home({ products }: HomePageProps) {
  const { data } = useSWR('/products', { initialData: products });
  return (
    <Box bg='gray.100'>
      <Head>
        <title>Mobilo Mart</title>
        <meta name='description' content='Mobile focused shopping franchise' />
      </Head>
      <Carousel />
      <Box
        pos='relative'
        maxW='7xl'
        marginX='auto'
        display='grid'
        gridTemplateColumns='repeat(auto-fit, minmax(250px, 1fr))'
        gridGap='5'
        zIndex={50}
      >
        {data?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Box>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async function () {
  const productsData = await fetcher('/products');

  return { props: { products: productsData } };
};
