const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const express = require('express');
const app = express()

app.get('/', (req, res)=>{
    res.send('running')
})

app.listen(3000, ()=>{
    console.log('running');
})

const bot = new Telegraf("7836633245:AAH5ZaFnLEgw41DDfRdk06oDwUJ5xXBoAKc");

const numft = new Intl.NumberFormat('en-us')



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

bot.action('btc', async (ctx) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`;
    const response = await axios.get(url);

    // Extract and display the price in USD
    const price = response.data['bitcoin'].usd;
    await ctx.reply(`$${numft.format(price)}`);
});

bot.action('eth', async (ctx) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`;
    const response = await axios.get(url);

    // Extract and display the price in USD
    const price = response.data['ethereum'].usd;
    await ctx.reply(`$${numft.format(price)}`);
});

bot.action('ltc', async (ctx) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd`;
    const response = await axios.get(url);

    // Extract and display the price in USD
    const price = response.data['litecoin'].usd;
    await ctx.reply(`$${numft.format(price)}`);
});

bot.launch();
