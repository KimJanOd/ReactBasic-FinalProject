import { useState } from 'react';
import {
  Box,
  Flex,
  SimpleGrid,
  Image,
  Heading,
  Text,
  Input,
  Checkbox,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Button,
  Grid,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

export const RecipeListPage = ({
  recipes,
  searchQuery,
  onSearchChange,
  activeFilters,
  onFilterChange,
  onSelectRecipe,
}) => {
  const [tempFilters, setTempFilters] = useState(activeFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const allDietLabels = Array.from(new Set(recipes.flatMap((r) => r.recipe.dietLabels)));
  const allHealthLabels = Array.from(new Set(recipes.flatMap((r) => r.recipe.healthLabels)));
  const allCautions = Array.from(new Set(recipes.flatMap((r) => r.recipe.cautions)));

  const applyFilters = () => onFilterChange(tempFilters);
  const clearFilters = () => setTempFilters([]);

  const byNameOrHealth = recipes.filter((item) =>
    item.recipe.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.recipe.healthLabels.some(hl =>
      hl.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filtered = byNameOrHealth.filter((item) =>
    activeFilters.every(
      (label) =>
        item.recipe.dietLabels.includes(label) ||
        item.recipe.healthLabels.includes(label) ||
        item.recipe.cautions.includes(label)
    )
  );

  return (
    <Box p={4} bg="gray.50" rounded="md">
      <Heading mb={4}>All Recipes</Heading>

      <Flex mb={6} wrap="wrap" align="center" gap={4}>
        <Input
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          flex="6"
          variant="outline"
          rounded="full"
          borderColor="gray.500"
          _hover={{ borderColor: 'blue.500' }}
        />

        <Popover
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onOpen={() => setIsFilterOpen(true)}
        >
          <PopoverTrigger>
            <Button
              flex="1"
              variant="outline"
              bg={isFilterOpen ? 'blue.500' : 'transparent'}
              color={isFilterOpen ? 'white' : 'gray.800'}
              borderColor={isFilterOpen ? 'blue.500' : 'gray.500'}
            >
              Filter{activeFilters.length > 0 && ` (${activeFilters.length})`}
            </Button>
          </PopoverTrigger>
          <PopoverContent maxW="md" w="100%">
            <PopoverArrow />
            <PopoverCloseButton onClick={() => setIsFilterOpen(false)} />
            <PopoverHeader>Choose filters</PopoverHeader>
            <PopoverBody>
              <Box mb={4}>
                <Heading size="sm" mb={2}>Diet</Heading>
                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                  {allDietLabels.map((label) => (
                    <Checkbox
                      key={label}
                      isChecked={tempFilters.includes(label)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setTempFilters((prev) =>
                          checked ? [...prev, label] : prev.filter((l) => l !== label)
                        );
                      }}
                      colorScheme="green"
                    >
                      {label}
                    </Checkbox>
                  ))}
                </Grid>
              </Box>
              <Box mb={4}>
                <Heading size="sm" mb={2}>Health</Heading>
                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                  {allHealthLabels.map((label) => (
                    <Checkbox
                      key={label}
                      isChecked={tempFilters.includes(label)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setTempFilters((prev) =>
                          checked ? [...prev, label] : prev.filter((l) => l !== label)
                        );
                      }}
                      colorScheme="blue"
                    >
                      {label}
                    </Checkbox>
                  ))}
                </Grid>
              </Box>
              <Box>
                <Heading size="sm" mb={2}>Cautions</Heading>
                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                  {allCautions.map((label) => (
                    <Checkbox
                      key={label}
                      isChecked={tempFilters.includes(label)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setTempFilters((prev) =>
                          checked ? [...prev, label] : prev.filter((l) => l !== label)
                        );
                      }}
                      colorScheme="red"
                    >
                      {label}
                    </Checkbox>
                  ))}
                </Grid>
              </Box>
            </PopoverBody>
            <PopoverFooter display="flex" flexDirection="column" gap={2}>
              <Button size="sm" variant="ghost" onClick={clearFilters}>
                Clear all
              </Button>
              <Button size="sm" colorScheme="blue" onClick={applyFilters}>
                Show results
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>

      {filtered.length === 0 ? (
        <Box p={4} textAlign="center" color="gray.200">
          No recipes found
          {searchQuery && ` for "${searchQuery}"`}
          {activeFilters.length > 0 && ` with filters: ${activeFilters.join(', ')}`}.
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {filtered.map(({ recipe }) => (
            <Box
              key={recipe.label}
              boxShadow="card"
              rounded="xl"
              transition="box-shadow 0.2s ease-in-out"
              _hover={{ boxShadow: 'cardHover' }}
              overflow="hidden"
              cursor="pointer"
              onClick={() => onSelectRecipe({ recipe })}
            >
              <Image
                src={recipe.image}
                alt={`Image of ${recipe.label}`}
                boxSize="200px"
                objectFit="cover"
                w="100%"
              />
              <Box p={6}>
                <Text fontSize="sm" color="gray.800" mb={1}>
                  {recipe.mealType?.join(', ')}{recipe.dishType?.length > 0 && ` - ${recipe.dishType[0]}`}
                </Text>

                <Heading size="md" mb={2}>
                  {recipe.label}
                </Heading>

                <Wrap spacing={2} mb={2}>
                  {['Vegan', 'Vegetarian'].map(
                    (hl) =>
                      recipe.healthLabels?.includes(hl) && (
                        <WrapItem key={hl}>
                          <Badge colorScheme="orange">{hl}</Badge>
                        </WrapItem>
                      )
                  )}

                  {recipe.healthLabels
                    ?.filter((hl) => hl !== 'Vegan' && hl !== 'Vegetarian')
                    .slice(0, 1)
                    .map((hl) => (
                      <WrapItem key={hl}>
                        <Badge colorScheme="blue">{hl}</Badge>
                      </WrapItem>
                    ))}

                  {recipe.dietLabels?.length > 0 && (
                    <WrapItem>
                      <Badge colorScheme="green">{recipe.dietLabels[0]}</Badge>
                    </WrapItem>
                  )}

                  {recipe.cautions?.length > 0 && (
                    <WrapItem>
                      <Badge colorScheme="red">{recipe.cautions[0]}</Badge>
                    </WrapItem>
                  )}
                </Wrap>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
