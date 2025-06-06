import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  Grid,
  Heading,
  Input,
  Button,
  Spinner,
  Flex,
  Spacer,
  Stack,
  Icon,
} from '@chakra-ui/react';
import { ArrowBackIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from 'framer-motion';
import { MdSearchOff } from "react-icons/md";
import SkipOption from './SkipOption';
import reactLogo from '../assets/waste.jpg';

// Map skip sizes to images (placeholder - replace with actual assets)
const skipImageMap = {
  4: reactLogo,
  6: reactLogo,
  8: reactLogo,
  10: reactLogo,
  12: reactLogo,
  14: reactLogo,
  16: reactLogo,
  20: reactLogo,
  40: reactLogo,
};

// Motion wrappers for Chakra components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

/**
 * SkipSelector Component - Main component for selecting skip sizes
 * 
 * Features:
 * - Fetches skip data from API
 * - Displays skips in a responsive grid
 * - Search functionality
 * - Selection system with animated feedback
 * - Fixed footer when skip is selected
 */
function SkipSelector() {
  // State management
  const [skips, setSkips] = useState([]);        // All available skips
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state
  const [selectedSkip, setSelectedSkip] = useState(null); // Currently selected skip
  const [searchTerm, setSearchTerm] = useState('');      // Search term for filtering

  // Fetch skip data on component mount
  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await fetch(
          'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        setSkips(await response.json());
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  /**
   * Handles skip selection/deselection
   * @param {Object} skip - The skip object to select
   */
  const handleSkipSelect = (skip) => {
    setSelectedSkip(prev => prev?.id === skip.id ? null : skip);
  };

  /**
   * Handles search input changes
   * @param {Object} event - The input change event
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter skips based on search term (matches skip size)
  const filteredSkips = skips.filter(skip => 
    String(skip.size).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total price for selected skip (including VAT)
  const selectedSkipPrice = selectedSkip 
    ? (selectedSkip.price_before_vat + selectedSkip.vat).toFixed(2)
    : null;

  /**
   * Handles continue button click
   */
  const handleContinue = () => {
    if (selectedSkip) {
      alert(`You selected ${selectedSkip.size} yard skip`);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box textAlign="center" py={10}>
        Error loading skip options: {error.message}
      </Box>
    );
  }

  return (
    <Box bg="gray.900" color="white" minH="100vh" pb={selectedSkip ? 28 : 8}>
      {/* Main content container */}
      <Box w="100%" display="flex" justifyContent="center" px={4} py={8}>
        <Box w="100%" maxW="1200px">
          {/* Header section */}
          <VStack spacing={4} textAlign="center" mb={8}>
            <Heading as="h2" size="xl" color="blue.300">
              Choose Your Skip Size
            </Heading>
            <Text color="gray.400">
              Select the skip size that best suits your project
            </Text>
          </VStack>

          {/* Search input */}
          <Box mb={8}>
            <Input
              placeholder="Search skip size..."
              value={searchTerm}
              onChange={handleSearchChange}
              size="lg"
              variant="filled"
              bg="gray.800"
              borderColor="gray.700"
              _hover={{ borderColor: 'gray.600' }}
              _focus={{ borderColor: 'blue.500' }}
              color="white"
            />
          </Box>

          {/* Skip options grid */}
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={6}
            justifyItems="center"
            alignItems="center"
          >
            <AnimatePresence>
              {filteredSkips.map((skip) => (
                <MotionBox
                  key={skip.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  width="100%"
                >
                  <SkipOption
                    skip={skip}
                    onSelect={handleSkipSelect}
                    isSelected={selectedSkip?.id === skip.id}
                    imageUrl={skipImageMap[skip.size]}
                  />
                </MotionBox>
              ))}
            </AnimatePresence>
          </Grid>

          {/* No results message */}
          {filteredSkips.length === 0 && (
            <MotionBox
              textAlign="center"
              p={6}
              border="1px solid"
              borderColor="gray.700"
              borderRadius="xl"
              bg="gray.800"
              color="gray.300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Icon as={MdSearchOff} boxSize={10} color="gray.400" mb={2} />
              <Text fontSize="lg" fontWeight="medium">
                No skip options found
              </Text>
              <Text fontSize="sm" mt={1}>
                Try adjusting your search term
              </Text>
            </MotionBox>
          )}
        </Box>
      </Box>

      {/* Fixed footer (appears when skip is selected) */}
      <AnimatePresence>
        {selectedSkip && (
          <MotionFlex
            key="footer"
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            bg="gray.800"
            px={6}
            py={4}
            borderTopWidth="1px"
            borderColor="gray.700"
            zIndex={100}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            flexDirection={{ base: "column", md: "row" }}
            gap={4}
            alignItems={{ md: "center" }}
          >
            {/* Selected skip info */}
            <Box flex="1">
              <Text fontSize="md" fontWeight="semibold">
                {selectedSkip.size} Yard Skip – £{selectedSkipPrice} – {selectedSkip.hire_period_days} day hire
              </Text>
              <Text fontSize="xs" color="gray.400" mt={1}>
                Imagery shown may not reflect exact specifications
              </Text>
            </Box>

            {/* Action buttons */}
            <Stack direction="row" spacing={3}>
              <Button
                colorScheme="gray"
                leftIcon={<ArrowBackIcon />}
                onClick={() => setSelectedSkip(null)}
              >
                Back
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleContinue}
              >
                Continue
              </Button>
            </Stack>
          </MotionFlex>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default SkipSelector;