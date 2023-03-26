import { expect, test } from "@jest/globals";
import { PromptTemplate } from "langchain/prompts";

test("Test partial with function", async () => {
    const prompt = new PromptTemplate({
        template: "Tell me a {adjective} joke about the day {date}",
        inputVariables: ["adjective"],
        partialVariables: { date: () => new Date().toLocaleDateString() },
    });
    expect(
        await prompt.format({ adjective: "fun" }))
        .toBe(`Tell me a fun joke about the day ${new Date().toLocaleDateString()}`);
});
