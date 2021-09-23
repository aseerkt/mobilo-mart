import { Box } from '@chakra-ui/react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box maxW='7xl' marginX='auto' minH='60' marginY='10' p='5'>
      {children}
    </Box>
  );
}

export default Layout;
