import { Address } from '@/types/address';
import {
  Badge,
  Button,
  Divider,
  Flex,
  GridItem,
  GridItemProps,
  HStack,
  Text,
} from '@chakra-ui/react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const addressCardStyles: GridItemProps = {
  minH: '40',
  h: 'full',
  p: '5',
  borderRadius: 'md',
  fontSize: 'sm',
  lineHeight: '1.6',
  pos: 'relative',
};

interface AddressItemProps {
  address: Address;
  isCurrentAddress: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

export const AddressItem = ({
  address,
  isCurrentAddress,
  onEdit,
  onDelete,
  onSelect,
}: AddressItemProps) => {
  return (
    <GridItem
      key={address.id}
      border={`3px solid ${isCurrentAddress ? 'teal' : 'lightgray'}`}
      {...addressCardStyles}
    >
      <Text fontWeight='semibold'>{address.fullName}</Text>
      <Text>{address.streetAddress}</Text>
      <Text>
        {address.city}, {address.state}
      </Text>
      <Divider my='3' />
      <Flex align='center'>
        <FaPhone color='teal' />
        <Text ml='2'>{address.mobileNumber}</Text>
      </Flex>
      <Flex align='center'>
        <FaEnvelope color='teal' />
        <Text ml='2'>{address.emailAddress}</Text>
      </Flex>
      <Divider my='3' />
      <Flex mt='3'>
        <HStack spacing={3}>
          <Button size='sm' onClick={onEdit} colorScheme='teal' variant='link'>
            Edit
          </Button>

          {isCurrentAddress ? (
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
            <>
              <Button
                size='sm'
                colorScheme='red'
                variant='link'
                onClick={onDelete}
              >
                Delete
              </Button>
              <Button size='sm' variant='link' onClick={onSelect}>
                Select
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </GridItem>
  );
};
