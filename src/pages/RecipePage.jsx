// src/pages/RecipePage.jsx
import {
  Box,
  Heading,
  Button,
  Image,
  AspectRatio,
  Text,
  Badge,
  Wrap,
  WrapItem,
  List,
  ListItem,
  SimpleGrid,
  GridItem,
  Divider,
} from '@chakra-ui/react';

export const RecipePage = ({ recipe, onBack }) => {
  const r = recipe.recipe;

  const nutrientMap = {
    ENERC_KCAL: 'Energy (kcal)',
    PROCNT: 'Protein (g)',
    FAT: 'Fat (g)',
    CHOCDF: 'Carbs (g)',
    CHOLE: 'Cholesterol (mg)',
    NA: 'Sodium (mg)',
  };

  return (
    <>
      <Box px={3} py={5} bg="gray.50">
        <Button onClick={onBack} variant="outline">← Back to list</Button>
      </Box>

      <Box bg="white" boxShadow="card" rounded="2xl" overflow="hidden">
        <AspectRatio ratio={16 / 9} w="100%">
          <Image
            src={r.image}
            alt={`Image of ${r.label}`}
            objectFit="cover"
            roundedTop="2xl"
          />
        </AspectRatio>

        <Box p={6} bg="white">
          <Heading size="xl" mb={4} color="gray.800">
            {r.label}
          </Heading>

          <Wrap spacing={6} mb={4}>
            {r.mealType && (
              <WrapItem>
                <Text color="gray.800">
                  <Text as="span" fontWeight="bold">Meal:</Text> {r.mealType.join(', ')}
                </Text>
              </WrapItem>
            )}
            {r.dishType && (
              <WrapItem>
                <Text color="gray.800">
                  <Text as="span" fontWeight="bold">Dish:</Text> {r.dishType.join(', ')}
                </Text>
              </WrapItem>
            )}
            {typeof r.totalTime === 'number' && (
              <WrapItem>
                <Text color="gray.800">
                  <Text as="span" fontWeight="bold">Time:</Text> {r.totalTime} min
                </Text>
              </WrapItem>
            )}
            {typeof r.yield === 'number' && (
              <WrapItem>
                <Text color="gray.800">
                  <Text as="span" fontWeight="bold">Servings:</Text> {r.yield}
                </Text>
              </WrapItem>
            )}
          </Wrap>

          <Divider borderColor="gray.200" mb={4} />

          {/* Vegan / Vegetarian labels first */}
          <Wrap spacing={2} mb={2}>
            {r.healthLabels.includes('Vegan') && (
              <WrapItem>
                <Badge colorScheme="orange">Vegan</Badge>
              </WrapItem>
            )}
            {r.healthLabels.includes('Vegetarian') && (
              <WrapItem>
                <Badge colorScheme="orange">Vegetarian</Badge>
              </WrapItem>
            )}

            {/* All Health Labels */}
            {r.healthLabels.map((hl) => (
              <WrapItem key={hl}>
                <Badge colorScheme="blue">{hl}</Badge>
              </WrapItem>
            ))}

            {/* All Diet Labels */}
            {r.dietLabels.map((dl) => (
              <WrapItem key={dl}>
                <Badge colorScheme="green">{dl}</Badge>
              </WrapItem>
            ))}

            {/* All Cautions */}
            {r.cautions.map((c) => (
              <WrapItem key={c}>
                <Badge colorScheme="red">{c}</Badge>
              </WrapItem>
            ))}
          </Wrap>

          <Divider borderColor="gray.200" mb={4} />

          <Box mb={4}>
            <Heading size="md" mb={2} color="gray.800">Ingredients</Heading>
            <List spacing={1} color="gray.800">
              {r.ingredientLines.map((line, idx) => (
                <ListItem key={idx}>{line}</ListItem>
              ))}
            </List>
          </Box>

          <Divider borderColor="gray.200" mb={4} />

          <Box>
            <Heading size="md" mb={2} color="gray.800">Nutritional Information</Heading>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              {Object.entries(r.totalNutrients || {})
                .filter(([key]) => nutrientMap[key])
                .map(([key, val]) => (
                  <GridItem key={key}>
                    <Text color="gray.800">
                      <Text as="span" fontWeight="bold">
                        {nutrientMap[key]}:
                      </Text>{' '}
                      {Math.round(val.quantity)} {val.unit}
                    </Text>
                  </GridItem>
                ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
