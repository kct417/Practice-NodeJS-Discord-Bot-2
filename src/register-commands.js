import { REST, Routes, ApplicationCommandOptionType } from "discord.js";
import { config } from "dotenv";

config();

const commands = [
    // basic commands
    {
        name: 'hey',
        description: 'Replies with pong',
    },
    {
        name: 'ping',
        description: 'Replies with hey',
    },

    // commands with required options
    {
        name: 'add',
        description: 'Add two numbers',
        options: [
            {
                name: 'first',
                description: 'First number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second',
                description: 'Second number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },

    // commands with choices
    {
        name: 'addsmall',
        description: 'Add one, two, or three to a number',
        options: [
            {
                name: 'first',
                description: 'First number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second',
                description: 'Second number',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                    name: 'one',
                    value: 1,
                    },
                    {
                    name: 'two',
                    value: 2,
                    },
                    {
                    name: 'three',
                    value: 3,
                    },
                ],
                required: true,
            },
        ],
    },
    
    // command with embeds
    {
        name: 'embed',
        description: 'Send an embed',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
                ),
                { body: commands } 
        );

        console.log('Slash commands registered successfully');
    } catch (error) {
        console.log(`${error}`);
    }
})();