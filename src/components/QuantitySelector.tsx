import { Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';

interface QuarntitySelectorProps {
  minimalText?: boolean;
  qty: number;
  onQtyChange: React.ChangeEventHandler<HTMLSelectElement>;
}

function QuantitySelector({
  qty,
  onQtyChange,
  minimalText = false,
}: QuarntitySelectorProps) {
  return (
    <>
      <Text fontWeight='500' marginRight='2'>
        {minimalText ? 'Qty' : 'Quantity'}
      </Text>
      <Select variant='filled' size='sm' value={qty} onChange={onQtyChange}>
        {new Array(11).fill(0).map((_, i) => (
          <option key={`qty_${i}`} value={i}>
            {i} {i === 0 && '(Delete)'}
          </option>
        ))}
      </Select>
    </>
  );
}

export default QuantitySelector;
