import Head from 'next/head';
import withAuth from '../libs/withAuth';

function OrdersPage() {
  return (
    <div>
      <Head>
        <title>My Orders</title>
      </Head>
    </div>
  );
}

export default withAuth({ title: 'My Orders' })(OrdersPage);
