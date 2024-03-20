import AddressModal from '@/components/AddressModal';
import Layout from '@/shared/Layout';
import {
  Badge,
  Divider,
  Flex,
  Grid,
  GridItem,
  GridItemProps,
  IconButton,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaPlusSquare,
  FaTrash,
} from 'react-icons/fa';
import { useStore } from '../store';

const addressCardStyles: GridItemProps = {
  minH: '60',
  h: 'full',
  p: '5',
  borderRadius: 'md',
  cursor: 'pointer',
};

function AddressesPage() {
  const router = useRouter();
  const { currentAddressId, addresses, selectAddress, removeAddress } =
    useStore((state) => ({
      currentAddressId: state.currentAddressId,
      addresses: state.addresses,
      selectAddress: state.selectAddress,
      removeAddress: state.removeAddress,
    }));

  return (
    <div>
      <Head>
        <title>My Addresses</title>
      </Head>
      <Layout>
        <Text fontSize='2xl' fontWeight='700' pb='5'>
          My Addresses
        </Text>
        <Divider mb='5' />

        <Grid
          templateColumns={{
            base: '1fr',
            md: '1fr 1fr 1fr',
          }}
          gap='10'
        >
          {addresses.length < 3 && (
            <AddressModal>
              <GridItem
                display='flex'
                flexDir='column'
                justifyContent='center'
                alignItems='center'
                border='3px dashed lightgray'
                {...addressCardStyles}
              >
                <FaPlusSquare color='lightgray' size='2em' />
                <Text color='gray' fontWeight='bold' mt='3' fontSize='2xl'>
                  Add address
                </Text>
              </GridItem>
            </AddressModal>
          )}
          {addresses.map((address) => (
            <GridItem
              onClick={() => {
                selectAddress(address.id);
                if (router.query.buy) {
                  router.push('/checkout');
                }
              }}
              key={address.id}
              border={`3px solid ${
                address.id === currentAddressId ? 'teal' : 'lightgray'
              }`}
              pos='relative'
              {...addressCardStyles}
              fontSize='sm'
              lineHeight='1.6'
            >
              <Text fontWeight='semibold'>{address.fullName}</Text>
              <Text>{address.streetAddress}</Text>
              <Text>{address.city}</Text>
              <Text>{address.state}</Text>
              <Text>India</Text>
              <Flex align='center'>
                <FaPhone color='teal' />
                <Text ml='2'>{address.mobileNumber}</Text>
              </Flex>
              <Flex align='center'>
                <FaEnvelope color='teal' />
                <Text ml='2'>{address.emailAddress}</Text>
              </Flex>
              <Flex mt='3'>
                <AddressModal edit addressToEdit={address}>
                  <IconButton
                    isRound
                    colorScheme='teal'
                    aria-label='add address'
                    icon={<FaEdit />}
                  />
                </AddressModal>

                {address.id === currentAddressId ? (
                  <Badge
                    fontSize='sm'
                    colorScheme='green'
                    pos='absolute'
                    bottom='0'
                    left='50%'
                    transform='translate(-50%, 50%)'
                  >
                    Current
                  </Badge>
                ) : (
                  <IconButton
                    isRound
                    ml='2'
                    colorScheme='red'
                    aria-label='delete address'
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAddress(address.id);
                    }}
                    icon={<FaTrash />}
                  />
                )}
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Layout>
    </div>
  );
}

export default AddressesPage;
