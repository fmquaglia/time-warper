import { PromptTemplate } from 'langchain/prompts';

const template = 'What is a good name for a company that makes {product}?';
export const prompt = new PromptTemplate({
    template: template,
    inputVariables: ['product'],
});
