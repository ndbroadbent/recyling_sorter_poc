export enum RecyclingCategory {
  ALUMINIUM_STEEL_CANS = 'ALUMINIUM_STEEL_CANS',
  PLASTICS_1_2_5 = 'PLASTICS_1_2_5',
  BROWN_GLASS = 'BROWN_GLASS',
  GREEN_GLASS = 'GREEN_GLASS',
  CLEAR_GLASS = 'CLEAR_GLASS',
  UNKNOWN = 'UNKNOWN',
}

export interface CategoryInfo {
  name: string;
  tub: number | 'unknown';
  description: string;
}

export interface ClassificationResult {
  category: RecyclingCategory;
  confidence: number;
  reasoning: string;
}

export interface SortedItem {
  imagePath: string;
  classification: ClassificationResult;
}
