import withAuth from '@/libs/withAuth';
import useOrders from '../libs/useOrders';
import { Divider, Grid, GridItem, Text } from '@chakra-ui/layout';
import OrderEntry from '../components/OrderEntry';
import Layout from '../shared/Layout';
import ShowAddress from '../components/ShowAddress';
import { TWO_GRID_STYLES } from '../shared/twoGridStyles';

function OrdersPage() {
  const { loading, orders } = useOrders();
  return (
    <div>
      <Layout>
        <Text fontSize='2xl' fontWeight='700' pb='5'>
          My Orders
        </Text>
        <Divider mb='5' />
        {orders?.map((order) => (
          <Grid
            border='1px solid lightgray'
            key={order.id}
            {...TWO_GRID_STYLES}
          >
            <GridItem>
              {order.items.map((item) => (
                <OrderEntry key={item.id} orderItem={item} />
              ))}
            </GridItem>
            <ShowAddress address={order.address} />
          </Grid>
        ))}
      </Layout>
    </div>
  );
}

export default withAuth({ title: 'My Orders' })(OrdersPage);
