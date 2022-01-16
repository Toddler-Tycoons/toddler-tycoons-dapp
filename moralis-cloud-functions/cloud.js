Moralis.Cloud.define("", async request => {
    const config = await Moralis.Config.get({ useMasterKey: true });
    return (
        `https://discord.com/api/oauth2/authorize?client_id=` +
        config.get("DiscordClientId") +
        `&redirect_uri=https%3A%2F%2Ficcm6faz4mrf.usemoralis.com%3A2053%2Fserver%2Ffunctions%2FdiscordVerify%3F_ApplicationId%3DoRjAw8xhsrb4mlj90NdhDYJKpR9hOKYoKh0BDWiG&response_type=code&scope=identify`
    );
});
