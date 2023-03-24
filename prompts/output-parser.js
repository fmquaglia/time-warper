import { OpenAI, PromptTemplate } from 'langchain';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { config } from 'dotenv';

config({
    path: `../.env`,
})


export const run = async () => {
    const parser = StructuredOutputParser.fromNamesAndDescriptions({
        answer: 'answer to the user\'s question',
        source: 'source used to answer the user\'s question, should be a website.',
    });
    
    const formatInstructions = parser.getFormatInstructions();
    
    const prompt = new PromptTemplate({
        template:
            'answer the users question as best as possible.\n{format_instructions}\n{question}',
        inputVariables: ['question'],
        partialVariables: {format_instructions: formatInstructions},
    });
    
    const model = new OpenAI({temperature: 0});
    
    const input = await prompt.format({
        question: 'What is the best way to get healthier?',
    });
    const response = await model.call(input);
    
    console.log('Prompt:');
    console.log(input);
    console.log('Raw response:');
    console.log(response);
    console.log('Parsed response:');
    console.log(parser.parse(response));
};

run()
