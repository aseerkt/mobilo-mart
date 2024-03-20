import { AddressItem } from '@/components/AddressItem';
import AddressModal from '@/components/AddressModal';
import Layout from '@/shared/Layout';
import { Address } from '@/types/address';
import {
  Divider,
  Grid,
  GridItem,
  GridItemProps,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { useStore } from '../store';

const addAddressBoxStyles: GridItemProps = {
  display: 'flex',
  flexDir: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '3px dashed lightgray',
  minH: '40',
  h: 'full',
  p: '5',
  borderRadius: 'md',
  fontSize: 'sm',
  lineHeight: '1.6',
  pos: 'relative',
  cursor: 'pointer',
  _hover: {
    borderColor: 'gray',
  },
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
  const { isOpen, onToggle } = useDisclosure();
  const [addressToEdit, setAddressToEdit] = useState<Address>();

  const openEditAddressModal = (address?: Address) => () => {
    setAddressToEdit(address);
    onToggle();
  };

  const closeAddressModal = () => {
    setAddressToEdit(undefined);
    onToggle();
  };

  const handleDeleteAddress = (addressId: string) => () => {
    removeAddress(addressId);
  };

  const handleAddressSelect = (addressId: string) => () => {
    selectAddress(addressId);
    if (router.query.buy) {
      router.push('/checkout');
    }
  };

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
          <AddressModal
            key={addressToEdit?.id}
            isOpen={isOpen}
            addressToEdit={addressToEdit}
            onClose={closeAddressModal}
          />
          {addresses.length < 3 && (
            <GridItem {...addAddressBoxStyles} role='button' onClick={onToggle}>
              <FaPlusSquare color='lightgray' size='2em' />
              <Text color='gray' fontWeight='bold' mt='3' fontSize='2xl'>
                Add address
              </Text>
            </GridItem>
          )}
          {addresses.map((address) => (
            <AddressItem
              key={address.id}
              address={address}
              isCurrentAddress={address.id === currentAddressId}
              onEdit={openEditAddressModal(address)}
              onDelete={handleDeleteAddress(address.id)}
              onSelect={handleAddressSelect(address.id)}
            />
          ))}
        </Grid>
      </Layout>
    </div>
  );
}

export default AddressesPage;
