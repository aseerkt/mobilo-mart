import { addDaysToDate } from '@/utils/dateUtils';
import {
  Badge,
  Box,
  Divider,
  Flex,
  HStack,
  Text,
  chakra,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

interface CountdownProps {
  deliveryDays: number;
  purchasedDate: Date;
  productId: string;
}

function DeliveryCD({
  deliveryDays,
  purchasedDate,
  productId,
}: CountdownProps) {
  const [timeData, setTimeData] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  const [isDelivered, setIsDelivered] = useState(false);

  const deliveryDate = useMemo(
    () => addDaysToDate(purchasedDate, deliveryDays),
    [purchasedDate, deliveryDays]
  );

  useEffect(() => {
    let countdownInterval = setInterval(() => {
      // https://stackoverflow.com/a/27187801/10240723
      const today = new Date() as any;
      const diffMs = ((deliveryDate as any) - today) / 1000;
      if (diffMs < 0) {
        setIsDelivered(true);
        clearInterval(countdownInterval);
        return;
      }
      let days = Math.floor(diffMs / 24 / 60 / 60);
      let hoursLeft = Math.floor(diffMs - days * 86400);
      let hours = Math.floor(hoursLeft / 3600);
      let minutesLeft = Math.floor(hoursLeft - hours * 3600);
      let minutes = Math.floor(minutesLeft / 60);
      let remainingSeconds = parseInt(String(diffMs % 60));

      function pad(n: number) {
        return n < 10 ? '0' + n : n + '';
      }

      setTimeData((prev) => ({
        ...prev,
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(remainingSeconds),
      }));
    }, 1000);
    return () => {
      clearInterval(countdownInterval);
    };
  }, [deliveryDate]);

  return (
    <Box
      border='3px solid teal'
      height={99}
      borderRadius='md'
      w='max-content'
      my='3'
    >
      <Flex p='2' align='center'>
        <Text fontWeight='normal'>
          Delivery date{' '}
          <chakra.span fontWeight='semibold' ml='2'>
            {new Date(deliveryDate).toLocaleDateString('en-IN', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })}
          </chakra.span>
        </Text>
      </Flex>
      <Divider />
      {isDelivered ? (
        <Flex p='2'>
          <Badge colorScheme='green' fontSize='sm'>
            Item Delivered
          </Badge>
        </Flex>
      ) : (
        <HStack p='2' spacing={4}>
          {Object.entries(timeData).map(([selector, value]) => (
            <Flex
              direction='column'
              align='center'
              key={`${purchasedDate}_${productId}_${selector}`}
              fontSize='sm'
            >
              <Text fontWeight='semibold' color='green'>
                {value}
              </Text>
              <Text fontSize='x-small'>{selector.toUpperCase()}</Text>
            </Flex>
          ))}
        </HStack>
      )}
    </Box>
  );
}

export default DeliveryCD;
