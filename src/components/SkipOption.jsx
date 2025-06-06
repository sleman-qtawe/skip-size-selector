import React from 'react';
import { Box, Text, Image, Button, Flex, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Create a motion-enabled Box component for animations
const MotionBox = motion(Box);

/**
 * SkipOption Component - Displays a skip hire option with interactive selection
 * 
 * @param {Object} skip - Skip data object containing size, price, etc.
 * @param {Function} onSelect - Callback when skip is selected
 * @param {Boolean} isSelected - Whether this skip is currently selected
 * @param {String} imageUrl - URL of the skip image
 * @returns {JSX.Element} - Rendered skip option card
 */
function SkipOption({ skip, onSelect, isSelected, imageUrl }) {
  // Calculate total price including VAT and format to 2 decimal places
  const totalPrice = (skip.price_before_vat + skip.vat).toFixed(2);

  return (
    <MotionBox
      // Animation properties
      whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5, boxShadow: '0 0 20px rgba(66, 153, 225, 0.6)' }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      
      // Styling properties
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow={isSelected ? 'lg' : 'md'}
      cursor="pointer"
      borderColor={isSelected ? 'blue.400' : 'gray.700'}
      bgGradient={isSelected ? 'linear(to-br, gray.800, blue.900)' : 'linear(to-br, gray.800, gray.900)'}
      maxW="400px"
      w="100%"
      mx="auto"
      textAlign="center"
      onClick={() => onSelect(skip)}
    >
      {/* Skip image with size badge */}
      <Box position="relative" h="180px" bg="gray.700">
        <Image
          src={imageUrl}
          alt={`${skip.size} Yard Skip`}
          objectFit="cover"
          width="100%"
          height="100%"
          borderTopRadius="2xl"
        />
        <Text
          position="absolute"
          top="2"
          left="2"
          bg="blue.500"
          color="white"
          fontSize="xs"
          fontWeight="bold"
          px="3"
          py="1"
          borderRadius="md"
          shadow="md"
        >
          {skip.size} Yards
        </Text>
      </Box>

      {/* Skip details section */}
      <Box px="5" py="4">
        <Heading as="h3" size="md" color="white" mb="1">
          {skip.size} Yard Skip
        </Heading>
        <Text fontSize="sm" color="gray.400" mb="1">
          {skip.hire_period_days} day hire
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="blue.400" mb="4">
          £{totalPrice}
        </Text>
      </Box>

      {/* Selection button */}
      <Button
        width="100%"
        borderTopRadius="0"
        colorScheme="blue"
        variant={isSelected ? 'solid' : 'outline'}
        py="3"
        _hover={isSelected ? { bg: 'blue.600' } : { bg: 'gray.700' }}
        borderColor={isSelected ? 'blue.500' : 'gray.600'}
        borderBottomRadius="2xl"
      >
        <Flex align="center" justify="center">
          {isSelected ? 'Selected' : 'Select this skip'}
          {!isSelected && <Box as="span" ml="2">→</Box>}
        </Flex>
      </Button>
    </MotionBox>
  );
}

export default SkipOption;