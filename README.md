# Recycling Sorter POC

A proof-of-concept image recognition system for a robotic arm that sorts recycling into different buckets using OpenAI's GPT-4.1 vision API.

## Overview

This POC simulates a robotic recycling sorter that:
- Picks up items from an unsorted container
- Uses computer vision to identify the material type
- Sorts items into 5 recycling categories plus an "unknown" category
- Provides confidence ratings and reasoning for each classification

## Recycling Categories

| Tub # | Category | Description |
|-------|----------|-------------|
| 1 | Clean aluminium & steel cans | Metal cans only, rinsed, no foil trays |
| 2 | Plastics #1, #2, #5 | Clear plastic #1, plastics #2 & #5 with visible recycling numbers |
| 3 | Brown glass | Brown glass bottles and jars |
| 4 | Green glass | Green glass bottles and jars |
| 5 | Clear glass | Clear glass bottles and jars |
| Unknown | Non-recyclable | Items that cannot be identified or have confidence < 75% |

## Prerequisites

- Node.js 18+ 
- OpenAI API key with access to GPT-4.1 vision capabilities

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Usage

Run the recycling simulation:

```bash
npm run simulation
```

This will:
1. Process all test images in the `test_images/` directory
2. Classify each item using AI vision analysis
3. Sort items into appropriate bins
4. Display results with confidence levels and reasoning
5. Show overall statistics

## Development

### Scripts

- `npm run simulation` - Run the recycling sorter simulation
- `npm run build` - Build TypeScript files
- `npm run lint` - Check code with Biome
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Biome

### Project Structure

```
├── src/
│   ├── types.ts        # TypeScript type definitions
│   ├── config.ts       # Configuration and category definitions
│   ├── classifier.ts   # OpenAI vision API integration
│   └── simulation.ts   # Main simulation logic
├── test_images/        # Sample images for testing
├── dist/              # Compiled JavaScript (gitignored)
└── .env               # Environment variables (gitignored)
```

### Technologies

- **TypeScript** - Type-safe JavaScript
- **OpenAI GPT-4.1** - Latest vision model for image classification
- **Biome** - Fast formatter and linter
- **Node.js** - Runtime environment

## How It Works

1. **Image Capture**: The simulation reads images from the test directory
2. **AI Analysis**: Each image is sent to GPT-4.1 with a detailed prompt
3. **Classification**: The AI returns a category, confidence score, and reasoning
4. **Sorting**: Items with ≥75% confidence are sorted into bins, others go to "unknown"
5. **Results**: Final statistics show sorting success rate

## Configuration

The confidence threshold (default: 75%) can be adjusted in `src/config.ts`.

## Future Enhancements

- Real-time camera integration
- Robotic arm control interface
- Database for tracking sorted items
- Web dashboard for monitoring
- Multi-language support
- Training mode for improving accuracy

## License

MIT License - see [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Nathan Broadbent