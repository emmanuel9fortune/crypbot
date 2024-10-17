const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const express = require('express');
const app = express();

// Start Express server
app.get('/', (req, res) => {
    res.send('running');
});

const bot = new Telegraf("7836633245:AAH5ZaFnLEgw41DDfRdk06oDwUJ5xXBoAKc"); // Use an environment variable for your bot token

// Handle '/start' command
bot.start((ctx) => {
    ctx.reply(
        'Welcome! Enter contact address.',
    );
});

// Fetch Bitcoin price
bot.on('text', async (ctx) => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${ctx.message.text}`);
    try {
        const data = response.data;
        const name = data.name;
        const symbol = data.symbol.toUpperCase();
        const currentPrice = data.market_data.current_price.usd;
        const marketCap = data.market_data.market_cap.usd;
        const totalSupply = data.market_data.total_supply;
        await ctx.reply(`
            name : ${name}
            symbol : ${symbol}
            price : ${currentPrice}
            marketCap : ${marketCap}
            totalSupply : ${totalSupply}
        `);
    } catch (error) {
        await ctx.reply('Error fetching Bitcoin price.');
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
