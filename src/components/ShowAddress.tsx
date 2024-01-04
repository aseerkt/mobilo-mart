import {
  Box,
  Button,
  Divider,
  Flex,
  GridItem,
  GridItemProps,
  Link,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaEnvelope, FaMapMarker, FaPhone } from 'react-icons/fa';
import { Address } from '../types/address';

interface ShowAddressProps {
  address: Address;
  showChangeAddress?: boolean;
}

const BORDER_STYLE = '1px solid lightgray';

function ShowAddress({ address, showChangeAddress = false }: ShowAddressProps) {
  const gridItemStyles: GridItemProps = {
    p: '5',
    h: 'full',
    ...(showChangeAddress
      ? { border: BORDER_STYLE, borderRadius: 'lg' }
      : {
          borderLeft: { base: 'none', sm: BORDER_STYLE },
          borderTop: { base: BORDER_STYLE, sm: 'none' },
        }),
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
