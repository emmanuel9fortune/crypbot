const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const express = require('express');
const app = express();

// Start Express server
app.get('/', (req, res) => {
    res.send('running');
});

const bot = new Telegraf("7836633245:AAH5ZaFnLEgw41DDfRdk06oDwUJ5xXBoAKc"); // Use an environment variable for your bot token

const numft = new Intl.NumberFormat('en-us');

// Handle '/start' command
bot.start((ctx) => {
    ctx.reply(
        'Welcome! Click to view current prices.',
        Markup.inlineKeyboard([
            Markup.button.callback('Bitcoin', 'btc'),
            Markup.button.callback('Ethereum', 'eth'),
            Markup.button.callback('Litecoin', 'ltc')
        ])
    );
});

// Fetch Bitcoin price
bot.action('btc', async (ctx) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`;
    try {
        const response = await axios.get(url);
        const price = response.data['bitcoin'].usd;
        await ctx.reply(`$${numft.format(price)}`);
    } catch (error) {
        await ctx.reply('Error fetching Bitcoin price.');
    }
});

// Fetch Ethereum price
bot.action('eth', async (ctx) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`;
    try {
        const response = await axios.get(url);
        const price = response.data['ethereum'].usd;
        await ctx.reply(`$${numft.format(price)}`);
    } catch (error) {
        await ctx.reply('Error fetching Ethereum price.');
    }
});

// Fetch Litecoin price
bot.action('ltc', async (ctx) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd`;
    try {
        const response = await axios.get(url);
        const price = response.data['litecoin'].usd;
        await ctx.reply(`$${numft.format(price)}`);
    } catch (error) {
        await ctx.reply('Error fetching Litecoin price.');
    }
});

// Start the bot
bot.launch()
    .then(() => console.log('Bot started'))
    .catch((err) => console.error('Error launching bot:', err));

// Start Express server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
