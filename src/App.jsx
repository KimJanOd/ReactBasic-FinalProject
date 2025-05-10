import { useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { RecipeListPage } from './pages/RecipeListPage';
import { RecipePage } from './pages/RecipePage';
import { data } from './utils/data';

export const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  return (
    <Box bg="gray.50" minH="100vh" py={6}>
      <Container maxW="container.lg" px={[4, 6]}>
        {selectedRecipe ? (
          <RecipePage
            recipe={selectedRecipe}
            onBack={() => setSelectedRecipe(null)}
          />
        ) : (
          <RecipeListPage
            recipes={data.hits}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
            onSelectRecipe={setSelectedRecipe}
          />
        )}
      </Container>
    </Box>
  );
};

export default App; 
