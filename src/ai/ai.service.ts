import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openAi: OpenAI;

  constructor() {
    this.openAi = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Set your API key in your environment variables
    });
  }

  async explain(
    analysisReason: string,
    base64Image: string,
    documentType: string,
  ): Promise<string> {
    const response = await this.openAi.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a medical assistant. Provide feedback for this image in a structured JSON format.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Explain result of ${documentType} test`,
            },
            {
              type: 'text',
              text: `Analysis reason: ${analysisReason}`,
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
      functions: [
        {
          name: 'generate_test_analysis',
          description:
            'Generates an analysis of medical results in a structured format',
          parameters: {
            type: 'object',
            properties: {
              description: {
                type: 'string',
                description:
                  'A short explanation of the bad results from the test',
              },
              todo: {
                type: 'string',
                description:
                  'Some suggestions to improve the medical results, like exercise or healthy eating',
              },
              extra_tests: {
                type: 'array',
                items: {
                  type: 'string',
                  description:
                    'A list of additional tests the patient should take',
                },
              },
              medical_appointments: {
                type: 'array',
                items: {
                  type: 'string',
                  description:
                    'A list of medical specialists the patient should visit',
                },
              },
            },
          },
        },
      ],
    });

    console.log(JSON.stringify(response.choices[0].message, null, 2));

    return JSON.parse(response.choices[0].message.function_call?.arguments);
  }
}
