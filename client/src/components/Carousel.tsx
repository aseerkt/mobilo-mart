import { useState, useEffect } from 'react';
import { Box, Flex, Img, Text, TextProps } from '@chakra-ui/react';

const TEXT_MARGIN = '15vh';

const slides = [
  {
    src: '/slideshow/pexels-negative-space-48605.jpg',
    alt: 'Samsung Galaxy',
    objectPosition: 'left center',
    text: 'Choose mobile of your choice',
    textStyles: {
      color: 'white',
      right: TEXT_MARGIN,
      textAlign: 'right',
    },
  },
  {
    src: '/slideshow/pexels-thiago-japyassu-1069798.jpg',
    alt: 'Samsung Galaxy',
    objectPosition: 'right bottom',
    text: 'Purchase mobiles with considerable price',
    textStyles: {
      color: 'white',
      left: TEXT_MARGIN,
    },
  },
  {
    src: '/slideshow/pexels-pixabay-257923.jpg',
    alt: 'Samsung Galaxy',
    objectPosition: 'left top',
    text: 'All your favourite brands in one place',
    textStyles: {
      color: 'black',
      right: TEXT_MARGIN,
      textAlign: 'right',
    },
  },
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    function goToNextSlide() {
      setCurrentSlide((s) => (s === slides.length - 1 ? 0 : s + 1));
    }
    let slideshow = setInterval(goToNextSlide, 5000);
    return () => clearInterval(slideshow);
  }, []);

  const carouselStyle = {
    transition: 'all 1.5s',
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
          {slides.map(({ text, textStyles, ...rest }, sid) => (
            <Box
              pos='relative'
              key={`slide-${sid}`}
              boxSize='full'
              shadow='md'
              flex='none'
            >
              <Img
                w='full'
                h='full'
                boxSize='full'
                objectFit='cover'
                {...rest}
              />
              <Text
                display={{ base: 'none', lg: 'block' }}
                zIndex='5'
                pos='absolute'
                top='40%'
                w='35%'
                fontWeight='extrabold'
                fontSize={{ md: '4xl', lg: '5xl' }}
                lineHeight='1.2'
                transform='translateY(-50%)'
                {...(textStyles as TextProps)}
              >
                {text}
              </Text>
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
