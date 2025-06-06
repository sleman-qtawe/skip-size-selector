import { extendTheme } from '@chakra-ui/react';

/**
 * Custom Chakra UI Theme Configuration
 * 
 * This file defines:
 * - Custom color palette
 * - Font stack
 * - Global styles
 * - Default color mode settings
 */

// 1. COLOR PALETTE
const colors = {
  brand: {
    50: '#e0f2fe',  // Lightest blue
    100: '#bae6fd',
    200: '#7dd3fc',
    300: '#38bdf8',  // Light blue
    400: '#0ea5e9',
    500: '#0284c7',  // PRIMARY brand blue
    600: '#0369a1',  // Darker blue
    700: '#075985',
    800: '#0c4a6e',  // Very dark blue
    900: '#082f49',  // Deep navy
  },
  gray: {
    50: '#f9fafb',   // Lightest gray
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',   // Medium gray
    500: '#6b7280',
    600: '#4b5563',   // Dark gray
    700: '#374151',
    800: '#1f2937',   // Very dark gray
    900: '#111827',   // Near-black (dark mode background)
  },
};

// 2. TYPOGRAPHY
const fonts = {
  heading: `'Poppins', sans-serif`,  // For all heading elements
  body: `'Inter', sans-serif`,      // For body text
  mono: `'Fira Code', monospace`,   // For code/technical text
};

// 3. GLOBAL STYLES
const styles = {
  global: {
    // Base body styles
    body: {
      bg: 'gray.900',    // Dark background
      color: 'gray.100', // Light text
      lineHeight: 'base',
      minHeight: '100vh',
    },
    
    // Text selection styling
    '::selection': {
      background: 'brand.500',  // Brand blue for selection
      color: 'white',
    },
    
    // Scrollbar styling (optional)
    '::-webkit-scrollbar': {
      width: '8px',
    },
    '::-webkit-scrollbar-thumb': {
      bg: 'brand.600',
      borderRadius: 'full',
    },
  },
};

// 4. THEME CONFIGURATION

const theme = extendTheme({
  colors,      // Custom color palette
  fonts,       // Font definitions
  styles,      // Global styles
  config: {
    initialColorMode: 'dark',      // Default to dark mode
    useSystemColorMode: false,     // Don't sync with system preference
  },
  components: {
    // Component-specific overrides can be added here
    Button: {
      baseStyle: {
        fontWeight: 'semibold',    // Default button weight
        borderRadius: 'md',        // Medium rounded corners
      },
    },
  },
});

export default theme;