import { useState, useEffect } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';

function Carousel() {
  const slides = [
    {
      src: '/slideshow/pexels-mohi-syed-47261.jpg',
      alt: 'Samsung Galaxy',
      objectPosition: 'center',
      text: '',
    },
    {
      src: '/slideshow/pexels-negative-space-48605.jpg',
      alt: 'Samsung Galaxy',
      objectPosition: 'left center',
      text: '',
    },
    {
      src: '/slideshow/pexels-pixabay-257923.jpg',
      alt: 'Samsung Galaxy',
      objectPosition: 'left top',
      text: '',
    },
    {
      src: '/slideshow/pexels-thiago-japyassu-1069798.jpg',
      alt: 'Samsung Galaxy',
      objectPosition: 'right bottom',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    function goToNextSlide() {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    }
    let slideshow = setInterval(goToNextSlide, 3000);
    return () => clearInterval(slideshow);
  }, []);

  const slidesCount = slides.length;

  const carouselStyle = {
    transition: 'all 1s',
    ml: `-${currentSlide * 100}%`,
  };

  return (
    <Flex
      className='test'
      w='full'
      alignItems='center'
      justifyContent='center'
      _before={{
        zIndex: 5,
        boxShadow: 'inset 0 -50% 50% -50% #000000',
      }}
    >
      <Flex w='full' overflow='hidden' pos='relative'>
        <Flex h='100vh' minH='600' w='full' {...carouselStyle}>
          {slides.map(({ text, ...rest }, sid) => (
            <Box key={`slide-${sid}`} boxSize='full' shadow='md' flex='none'>
              <Image
                w='full'
                h='full'
                boxSize='full'
                objectFit='cover'
                {...rest}
              />
            </Box>
          ))}
        </Flex>

        <Box
          justify='center'
          pos='absolute'
          top='40%'
          h='60%'
          w='full'
          bg='linear-gradient( transparent 56%, var(--chakra-colors-gray-100) 98%)'
        ></Box>
      </Flex>
    </Flex>
  );
}

export default Carousel;
