import fs from 'node:fs/promises';
import OpenAI from 'openai';
import { config } from './config.js';
import { RecyclingCategory, type ClassificationResult } from './types.js';

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

export async function classifyRecyclingItem(imagePath: string): Promise<ClassificationResult> {
  try {
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString('base64');

    const prompt = `You are an expert recycling sorter robot. Analyze this image and determine which recycling category it belongs to.

Categories:
1. Clean aluminium & steel cans (metal cans only, must be rinsed, no foil trays)
2. Plastics #1 (clear only), #2, #5 (must have visible recycling number 1, 2, or 5)
3. Brown glass bottles/jars
4. Green glass bottles/jars
5. Clear glass bottles/jars
6. Unknown/Non-recyclable (anything else or if uncertain)

Respond with a JSON object containing:
- "category": one of ["ALUMINIUM_STEEL_CANS", "PLASTICS_1_2_5", "BROWN_GLASS", "GREEN_GLASS", "CLEAR_GLASS", "UNKNOWN"]
- "confidence": a number from 0-100 indicating your confidence
- "reasoning": brief explanation of your classification

Important:
- If you cannot clearly see recycling numbers on plastic, classify as UNKNOWN
- If the item appears dirty or contaminated, classify as UNKNOWN
- If you're not certain about the material or color, classify as UNKNOWN`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 300,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response content from OpenAI');
    }

    const result = JSON.parse(content) as ClassificationResult;

    if (result.confidence < config.confidenceThreshold) {
      result.category = RecyclingCategory.UNKNOWN;
      result.reasoning = `Low confidence (${result.confidence}%). ${result.reasoning}`;
    }

    return result;
  } catch (error) {
    console.error('Error classifying image:', error);
    return {
      category: RecyclingCategory.UNKNOWN,
      confidence: 0,
      reasoning: `Error processing image: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
