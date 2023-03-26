import { expect, test } from '@jest/globals';
import { PromptTemplate } from 'langchain/prompts';

test('Test partial with function', async () => {
    const prompt = new PromptTemplate({
        template: '{foo}{bar}',
        inputVariables: ['foo', 'bar'],
    });
    const partialPrompt = await prompt.partial({bar: 'bar'})
    expect(await partialPrompt.format({foo: 'foo'})).toBe('foobar');
});
