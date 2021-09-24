import NextLink from 'next/link';
import { Button } from '@chakra-ui/button';
import {
  GridItem,
  Divider,
  Box,
  Flex,
  Link,
  Text,
  GridItemProps,
} from '@chakra-ui/layout';
import { FaPhone, FaEnvelope, FaMapMarker } from 'react-icons/fa';
import { Address } from '../types/address';

interface ShowAddressProps {
  address: Address;
  showChangeAddress?: boolean;
}

function ShowAddress({ address, showChangeAddress = false }: ShowAddressProps) {
  const gridItemStyles: GridItemProps = {
    p: '5',
    h: 'max-content',
    ...(showChangeAddress
      ? { border: '1px solid lightgray', borderRadius: 'lg' }
      : { borderLeft: '1px solid lightgray' }),
  };
  return (
    <GridItem {...gridItemStyles}>
      <Text fontSize='xl' fontWeight='700' pb='5'>
        Delivery Address
      </Text>
      <Divider mb='5' />
      <Box fontSize='sm' lineHeight='1.6'>
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
        {showChangeAddress && (
          <Link as={NextLink} href='/addresses?buy=1'>
            <Button
              mt='4'
              colorScheme='blue'
              variant='outline'
              leftIcon={<FaMapMarker />}
            >
              Change Address
            </Button>
          </Link>
        )}
      </Box>
    </GridItem>
  );
}

export default ShowAddress;