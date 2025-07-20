import dotenv from 'dotenv';
import { type CategoryInfo, RecyclingCategory } from './types.js';

dotenv.config();

interface Config {
  openaiApiKey: string | undefined;
  confidenceThreshold: number;
  categories: Record<RecyclingCategory, CategoryInfo>;
}

export const config: Config = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  confidenceThreshold: 75,
  categories: {
    [RecyclingCategory.ALUMINIUM_STEEL_CANS]: {
      name: 'Clean aluminium & steel cans',
      tub: 1,
      description: 'Metal cans only, rinsed, no foil trays',
    },
    [RecyclingCategory.PLASTICS_1_2_5]: {
      name: 'Plastics #1 (clear), #2, #5',
      tub: 2,
      description: 'Rinsed plastics with recycling numbers 1 (clear only), 2, or 5',
    },
    [RecyclingCategory.BROWN_GLASS]: {
      name: 'Brown glass bottles/jars',
      tub: 3,
      description: 'Brown glass containers only',
    },
    [RecyclingCategory.GREEN_GLASS]: {
      name: 'Green glass bottles/jars',
      tub: 4,
      description: 'Green glass containers only',
    },
    [RecyclingCategory.CLEAR_GLASS]: {
      name: 'Clear glass bottles/jars',
      tub: 5,
      description: 'Clear glass containers only',
    },
    [RecyclingCategory.UNKNOWN]: {
      name: 'Unknown/Non-recyclable',
      tub: 'unknown',
      description: 'Items that cannot be identified or are not recyclable',
    },
  },
};

if (!config.openaiApiKey) {
  console.error('Error: OPENAI_API_KEY is not set in .env file');
  console.error('Please create a .env file and add your OpenAI API key');
  process.exit(1);
}
