import { z } from "zod";
import fs from "fs/promises";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

interface Card {
    question: string;
    answer: string;
}

interface Set {
    name: string;
    cards: Card[];
}

export const exampleRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.example.findMany();
    }),

    getSecretMessage: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),
});

export const listFlashcards = createTRPCRouter({
    list: publicProcedure.query(async () => {
        const data = await fs.readFile("result.json", "utf-8");
        const cards: Card[] = JSON.parse(data.toString()) as Card[];
        return cards;
    }),
    listFlashcardsSets: publicProcedure.query(async () => {
        const data = await fs.readFile("flashcardssets.json", "utf-8");
        const cards: Set[] = JSON.parse(data.toString()) as Set[];
        return cards;
    }),
});

export const mutationRouter = createTRPCRouter({
    hello: publicProcedure
        .input(
            z.object({
                question: z.string(),
                answer: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            const card = {
                question: input.question,
                answer: input.answer,
            };
            try {
                // Read the existing data from the file
                const data = await fs.readFile("result.json", "utf-8");

                // Parse the JSON data into a JavaScript object
                const cards = JSON.parse(data) as Card[];

                // Add a new object to the array
                cards.unshift(card);

                // Write the updated JSON data back to the file
                await fs.writeFile(
                    "result.json",
                    JSON.stringify(cards, null, 2),
                );

                return { card };
            } catch (error) {
                console.error(error);
                throw new Error("Failed to add card to file");
            }
        }),
});
