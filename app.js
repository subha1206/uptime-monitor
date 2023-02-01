const cron = require('node-cron');
const axios = require('axios');
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

const client = Sib.ApiClient.instance;

const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SMTP_API_KEY;

const sender = {
    email: 'subha.work98@gmail.com',
    name: 'Production Down!',
};

const recivers = [
    {
        email: 'subha@vidyo.ai',
    },
    // {
    //     email: 'dhiren@vidyo.ai'
    // }
];

const transactionalEmailApi = new Sib.TransactionalEmailsApi();

let alreadySent = false;

cron.schedule(`*/15 * * * * *`, async () => {
    const res = await axios.get(process.env.CHECK_URL);
    // if (res.status !== 200 && !alreadySent) {
    transactionalEmailApi
        .sendTransacEmail({
            subject: 'Bhai kya kar raha hai tu ?',
            sender,
            to: recivers,
            htmlContent: `
                <img src="https://www.probytes.net/wp-content/uploads/2018/01/4-1.png" />
            `,
        })
        .then(() => alreadySent = true)
        .catch(() => alreadySent = true);
    // }
});