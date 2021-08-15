import Head from 'next/head';
import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mobilo Mart</title>
        <meta name='description' content='Mobile focused shopping franchise' />
      </Head>
      <Carousel />
    </div>
  );
}
