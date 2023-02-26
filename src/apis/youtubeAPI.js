const request = require("request");

module.exports = {
    getChannelDetails
}

const baseUrl = "https://www.googleapis.com/youtube/v3";
const key = "YOUTUBE_API_KEY";

async function getChannelDetails(channelId) {
    const url = `${baseUrl}/channels?part=statistics&id=${channelId}&key=${key}`;

    const result = await new Promise((resolve, reject) => {
        request({
            method: 'GET',
            url: url
        }, (err, response, text) => {
            if(err) return reject(err);

            const json = JSON.parse(text);
            const statistics = json.items[0].statistics;

            const subscribers = parseInt(statistics.subscriberCount);
            const views = parseInt(statistics.viewCount);
            const videos = parseInt(statistics.videoCount);

            resolve(
                {
                    subscribers: subscribers,
                    views: views,
                    videos: videos
                }
            );
        })
    });

    return result;
}