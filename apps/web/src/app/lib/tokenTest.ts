import { encoding_for_model } from '@dqbd/tiktoken';

export function tokenTest(): { status: string; tokens?: number; text?: string } {
  try {
    const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Donec a diam lectus. Sed sit amet ipsum mauris.`;

    const encoder = encoding_for_model('gpt-4');
    const encoded = encoder.encode(loremIpsum);
    const tokens = encoded.length;

    const data = {
      status: 'ok',
      tokens,
      text: loremIpsum,
    };
    return data;
  } catch (error) {
    console.error(error);
    return { status: `Error: ${error}` };
  }
}
