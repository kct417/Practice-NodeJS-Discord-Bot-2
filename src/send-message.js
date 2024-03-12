import { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { config } from 'dotenv';

config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    {
        id: '1217155736476455022',
        label: 'Red',
    },
    {
        id: '1217155836376514660',
        label: 'Green',
    },
    {
        id: '1217155890818322543',
        label: 'Blue',
    },
]

client.on('ready', async (c) => {
    try {
        const channel = client.channels.cache.get('1217037192657113219');
        if (!channel) return;
        const row = new ActionRowBuilder();
        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.label)
                    .setStyle(ButtonStyle.Primary)
            )
        });
        await channel.send({
            content: 'Claim or remove a role below.',
            components: [row],
        });
        process.exit();
    } catch (error) {
        console.log(`${error}`);

    }
})

client.login(process.env.TOKEN);