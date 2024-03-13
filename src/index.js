import { Client, IntentsBitField, EmbedBuilder, ActivityType } from 'discord.js';
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

let status = [
    {
        name: 'Practicing coding',
        type: ActivityType.Custom,
    },
    {
        name: 'Status 1',
        type: ActivityType.Watching,
    },
    {
        name: 'Status 2',
        type: ActivityType.Streaming,
    },
    {
        name: 'Status 3',
        type: ActivityType.Listening,
    },
]

client.on('ready', (c) => {
    console.log(`${c.user.tag}`);
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 10000)
})

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }

    switch (message.content) {
        // reply to messages
        case 'hello':
            message.reply('hello');
            return;

        case 'embed':
            const embed = new EmbedBuilder()
                .setTitle('Embed Title')
                .setDescription('Embed description')
                .setColor('Random')
                .addFields({
                    name: 'Field Title 1',
                    value: 'Some random value',
                    inline: true,
                })
                .addFields({
                    name: 'Field Title 2',
                    value: 'Some random value',
                    inline: true,
                })
                .addFields({
                    name: 'Field Title 3',
                    value: 'Some random value',
                    inline: true,
                });
            message.channel.send({ embeds: [embed] });
            return;
    }
})

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
        switch (interaction.commandName) {
            // basic commands
            case 'hey':
                interaction.reply('hey');
                return;
            case 'ping':
                interaction.reply('pong');
                return;

            // commands with required options
            case 'add':
                const add1 = interaction.options.get('first').value;
                const add2 = interaction.options.get('second').value;
                interaction.reply(`${add1 + add2}`);
                return;

            // commands with choices
            case 'addsmall':
                const addsmall1 = interaction.options.get('first').value;
                const addsmall2 = interaction.options.get('second').value;
                interaction.reply(`${addsmall1 + addsmall2}`);
                return;

            // command with embeds
            case 'embed':
                const embed = new EmbedBuilder()
                    .setTitle('Embed Title')
                    .setDescription('Embed description')
                    .setColor('Random')
                    .addFields({
                        name: 'Field Title 1',
                        value: 'Some random value',
                        inline: true,
                    })
                    .addFields({
                        name: 'Field Title 2',
                        value: 'Some random value',
                        inline: true,
                    })
                    .addFields({
                        name: 'Field Title 3',
                        value: 'Some random value',
                        inline: true,
                    });
                interaction.reply({ embeds: [embed] });
                return;
        }
    }
    if (interaction.isButton()) {
        try {
            // buttons
            const role = interaction.guild.roles.cache.get(interaction.customId);
            await interaction.deferReply({ ephemeral: true });

            if (!role) {
                interaction.editReply({
                    content: "Failed to fine role",
                });
                return;
            }

            const hasRole = interaction.member.roles.cache.has(role.id);
            if (hasRole) {
                await interaction.member.roles.remove(role);
                await interaction.editReply(`Role ${role} has been removed.`);
                return;
            }
            await interaction.member.roles.add(role);
            await interaction.editReply(`Role ${role} has been added.`);
        } catch (error) {
            console.log(`${error}`);
        }
    }
})

client.login(process.env.TOKEN);