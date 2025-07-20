import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { classifyRecyclingItem } from './classifier.js';
import { config } from './config.js';
import { RecyclingCategory, type SortedItem } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SimulationResults {
  [RecyclingCategory.ALUMINIUM_STEEL_CANS]: SortedItem[];
  [RecyclingCategory.PLASTICS_1_2_5]: SortedItem[];
  [RecyclingCategory.BROWN_GLASS]: SortedItem[];
  [RecyclingCategory.GREEN_GLASS]: SortedItem[];
  [RecyclingCategory.CLEAR_GLASS]: SortedItem[];
  [RecyclingCategory.UNKNOWN]: SortedItem[];
}

async function runSimulation() {
  console.log('🤖 Starting Recycling Sorter Simulation\n');

  const unsortedItems = [
    'image_1.jpeg',
    'image_2.jpeg',
    'image_3.jpeg',
    'image_4.jpeg',
    'image_5.jpeg',
    'image_6.jpeg',
  ];

  const sortedBins: SimulationResults = {
    [RecyclingCategory.ALUMINIUM_STEEL_CANS]: [],
    [RecyclingCategory.PLASTICS_1_2_5]: [],
    [RecyclingCategory.BROWN_GLASS]: [],
    [RecyclingCategory.GREEN_GLASS]: [],
    [RecyclingCategory.CLEAR_GLASS]: [],
    [RecyclingCategory.UNKNOWN]: [],
  };

  console.log(`📦 Found ${unsortedItems.length} items to sort\n`);

  for (let i = 0; i < unsortedItems.length; i++) {
    const item = unsortedItems[i];
    const imagePath = path.join(__dirname, '..', 'test_images', item);

    console.log(`\n🔄 Processing item ${i + 1}/${unsortedItems.length}: ${item}`);
    console.log('   🤖 Picking up item...');
    console.log('   📸 Capturing image for analysis...');

    const classification = await classifyRecyclingItem(imagePath);

    const categoryInfo = config.categories[classification.category];
    console.log(`   ✅ Classification: ${categoryInfo.name}`);
    console.log(`   📊 Confidence: ${classification.confidence}%`);
    console.log(`   💭 Reasoning: ${classification.reasoning}`);

    const sortedItem: SortedItem = {
      imagePath: item,
      classification,
    };

    sortedBins[classification.category].push(sortedItem);
    console.log(`   📍 Placed in tub: ${categoryInfo.tub}`);
  }

  console.log('\n\n📊 === SORTING RESULTS ===\n');

  for (const [category, items] of Object.entries(sortedBins)) {
    const categoryInfo = config.categories[category as RecyclingCategory];
    console.log(`\n${categoryInfo.name} (Tub ${categoryInfo.tub}):`);
    console.log(`📦 Items: ${items.length}`);

    if (items.length > 0) {
      for (const item of items) {
        console.log(`  - ${item.imagePath} (${item.classification.confidence}% confidence)`);
        console.log(`    ${item.classification.reasoning}`);
      }
    } else {
      console.log('  (empty)');
    }
  }

  console.log('\n\n✅ Simulation complete!');

  const totalSorted = Object.values(sortedBins).reduce((sum, items) => sum + items.length, 0);
  const unknownCount = sortedBins[RecyclingCategory.UNKNOWN].length;
  const successRate = (((totalSorted - unknownCount) / totalSorted) * 100).toFixed(1);

  console.log('\n📈 Statistics:');
  console.log(`   Total items sorted: ${totalSorted}`);
  console.log(`   Successfully categorized: ${totalSorted - unknownCount}`);
  console.log(`   Unknown/Non-recyclable: ${unknownCount}`);
  console.log(`   Success rate: ${successRate}%`);
}

runSimulation().catch(console.error);
