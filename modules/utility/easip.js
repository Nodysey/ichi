const fetch = require("node-fetch");
const { EmbedBuilder, EmbedFieldBuilder } = require('discord.js');
const EAS = require('@globaleas/easjs');
const alertIcons = {
    "ADR": "https://cdn.discordapp.com/attachments/907457287864590396/907757405947977738/administrative.png",
    "AVA": "https://cdn.discordapp.com/attachments/907457287864590396/907758496882233394/avalanche.png",
    "AVW": "https://cdn.discordapp.com/attachments/907457287864590396/907759382392078346/avalanche.png",
    "BLU": "https://cdn.discordapp.com/attachments/907457287864590396/907757517751332914/warning.png",
    "BZW": "https://cdn.discordapp.com/attachments/907457287864590396/907759443079491614/snowflake.png",
    "CAE": "https://cdn.discordapp.com/attachments/907457287864590396/907757517751332914/warning.png",
    "CDW": "https://cdn.discordapp.com/attachments/907457287864590396/907759471877558342/warning.png",
    "CEM": "https://cdn.discordapp.com/attachments/907457287864590396/907757517751332914/warning.png",
    "CFA": "https://cdn.discordapp.com/attachments/907457287864590396/907758410865455164/flooding.png",
    "CFW": "https://cdn.discordapp.com/attachments/907457287864590396/907759413299933234/flooding.png",
    "DMO": "https://cdn.discordapp.com/attachments/907457287864590396/907758264232607815/DEMO.png",
    "DSW": "https://cdn.discordapp.com/attachments/907457287864590396/907759476008964166/wind.png",
    "EAN": "https://cdn.discordapp.com/attachments/907457287864590396/907759471877558342/warning.png",
    "EAT": "https://cdn.discordapp.com/attachments/907457287864590396/907757517751332914/warning.png",
    "EQW": "https://cdn.discordapp.com/attachments/907457287864590396/907759388763254844/earthquake.png",
    "EVI": "https://cdn.discordapp.com/attachments/907457287864590396/907759401883041862/EVI.png",
    "EWW": "https://cdn.discordapp.com/attachments/907457287864590396/907759476008964166/wind.png",
    "FFA": "https://cdn.discordapp.com/attachments/907457287864590396/907758410865455164/flooding.png",
    "FFS": "https://cdn.discordapp.com/attachments/907457287864590396/907757420359585822/flooding.png",
    "FFW": "https://cdn.discordapp.com/attachments/907457287864590396/907759413299933234/flooding.png",
    "FLA": "https://cdn.discordapp.com/attachments/907457287864590396/907758410865455164/flooding.png",
    "FLS": "https://cdn.discordapp.com/attachments/907457287864590396/907757420359585822/flooding.png",
    "FLW": "https://cdn.discordapp.com/attachments/907457287864590396/907759413299933234/flooding.png",
    "FRW": "https://cdn.discordapp.com/attachments/907457287864590396/907759407478231080/fire_warning.png",
    "FSW": "https://cdn.discordapp.com/attachments/907457287864590396/907759443079491614/snowflake.png",
    "FZW": "https://cdn.discordapp.com/attachments/907457287864590396/907759443079491614/snowflake.png",
    "HLS": "https://cdn.discordapp.com/attachments/907457287864590396/907757437329735710/hurricane.png",
    "HMW": "https://cdn.discordapp.com/attachments/907457287864590396/907759471877558342/warning.png",
    "HUA": "https://cdn.discordapp.com/attachments/907457287864590396/907758421229568010/hurricane.png",
    "HUW": "https://cdn.discordapp.com/attachments/907457287864590396/907759420744814632/hurricane.png",
    "HWA": "https://cdn.discordapp.com/attachments/907457287864590396/907758488845942824/wind.png",
    "HWW": "https://cdn.discordapp.com/attachments/907457287864590396/907759476008964166/wind.png",
    "LAE": "https://cdn.discordapp.com/attachments/907457287864590396/907757517751332914/warning.png",
    "LEW": "https://cdn.discordapp.com/attachments/907457287864590396/907757517751332914/warning.png",
    "NAT": "https://cdn.discordapp.com/attachments/907457287864590396/907757510465818664/unmute.png",
    "NIC": "https://cdn.discordapp.com/attachments/907457287864590396/907757517751332914/warning.png",
    "NMN": "https://cdn.discordapp.com/attachments/907457287864590396/907757517751332914/warning.png",
    "NPT": "https://cdn.discordapp.com/attachments/907457287864590396/907757485375504414/NationalTest.png",
    "NST": "https://cdn.discordapp.com/attachments/907457287864590396/907757468686385152/mute.png",
    "NUW": "https://cdn.discordapp.com/attachments/907457287864590396/907759430341373973/Radiological_Hazard.png",
    "RHW": "https://cdn.discordapp.com/attachments/907457287864590396/907759430341373973/Radiological_Hazard.png",
    "RMT": "https://cdn.discordapp.com/attachments/907457287864590396/907758270490505226/TEST.png",
    "RWT": "https://cdn.discordapp.com/attachments/907457287864590396/907758270490505226/TEST.png",
    "SMW": "https://cdn.discordapp.com/attachments/907457287864590396/907759425668911155/Marine.png",
    "SPS": "https://cdn.discordapp.com/attachments/907457287864590396/907757517751332914/warning.png",
    "SPW": "https://cdn.discordapp.com/attachments/907457287864590396/907757449484836885/inplace.png",
    "SQW": "https://cdn.discordapp.com/attachments/907457287864590396/907759443079491614/snowflake.png",
    "SSA": "https://cdn.discordapp.com/attachments/907457287864590396/907758446743539802/storm.png",
    "SSW": "https://cdn.discordapp.com/attachments/907457287864590396/907759449354145792/storm.png",
    "SVA": "https://cdn.discordapp.com/attachments/907457287864590396/907758429152616468/severestorm.png",
    "SVR": "https://cdn.discordapp.com/attachments/907457287864590396/907759436930646026/severestorm.png",
    "SVS": "https://cdn.discordapp.com/attachments/907457287864590396/907757502433738772/storm.png",
    "TOA": "https://cdn.discordapp.com/attachments/907457287864590396/907758459179663360/tornado.png",
    "TOE": "https://cdn.discordapp.com/attachments/907457287864590396/907757393977438268/911Telephone_Outage.png",
    "TOR": "https://cdn.discordapp.com/attachments/907457287864590396/907759453770743848/tornado.png",
    "TRA": "https://cdn.discordapp.com/attachments/907457287864590396/907758471267614770/tropical_storm.png",
    "TRW": "https://cdn.discordapp.com/attachments/907457287864590396/907759458556461066/tropical_storm.png",
    "TSA": "https://cdn.discordapp.com/attachments/907457287864590396/907758480641900544/tsunami.png",
    "TSW": "https://cdn.discordapp.com/attachments/907457287864590396/907759463048544326/tsunami.png",
    "VOW": "https://cdn.discordapp.com/attachments/907457287864590396/907759467293200394/volcano.png",
    "WSA": "https://cdn.discordapp.com/attachments/907457287864590396/907758437612548106/snowflake.png",
    "WSW": "https://cdn.discordapp.com/attachments/907457287864590396/907759443079491614/snowflake.png"
};

module.exports = {
    "data": {
        name: "easip",
        description: "easip capture tool"
    },
    async execute(client) {
        const config = {
            channel_id: "1399929305127194785",
        }
        function init() {
            let playedAlerts = [];

            async function getAlerts() {
                const alerts = await fetch(`https://easip-client.ccp.xcal.tv/eas/api/alert/active?format=json`)
                    .then((response) => {return response.json()});

                if (!alerts.alerts) return // somehow no alerts?

                for (let idx = 0; idx < alerts.alerts.length; idx++) {
                    const alert = alerts.alerts[idx];
                    if (alert.identifier.startsWith('ZCZC-EAS-RWT-SyntheticTestAlert') || playedAlerts.includes(alert.identifier + alert.info[0].senderName)) {
                        // do jack shit
                    } else {
                        queuePlayback(alert);
                        playedAlerts.unshift(alert.identifier + alert.info[0].senderName);
                        playedAlerts.slice(0,25);
                    }
                }
            }

            const channel = client.channels.cache.get(config.channel_id);
            if (!channel) return;

            async function queuePlayback(alert) {
                const same = EAS.decodeSame(alert.identifier + alert.info[0].senderName.padEnd(8,' ') + '-');
                const embed = new EmbedBuilder()
                    .setColor('#FFD700')
                    .setTitle('EAS Alert')
                    .setDescription(same.formatted)
                    .setThumbnail(alertIcons[alert.info[0].eventCode[0].value])
                    .addFields(
                        {name: 'Alert Description', inline: false, value:`\`\`\`${alert.info[0].description}\`\`\``},
                        {name: 'Issued', inline: true, value:`<t:${alert.sent/1000}:f>`},
                        {name: 'Effective', inline: true, value:`<t:${alert.info[0].effective/1000}:f>`},
                        {name: 'Expires', inline: true, value:`<t:${alert.info[0].expires/1000}:f>`},
                        {name: 'Video URL', inline: false, value:`[Play Video](https://ws4k.net/easip/player?v=${alert.info[0].resource[0].uri})`}
                    )
                    .setFooter({text: 'ws4k.net/ichi'})
                    .setTimestamp();

                // Send the embed to the channel
                channel.send({ embeds: [embed] });
            }

            getAlerts();
            setInterval(getAlerts,60000);
        }
        init();
    }
}
