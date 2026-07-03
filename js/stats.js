const API_URL = "https://la-communaute-live-bot.onrender.com";

async function loadStats() {

    try {

        const response = await fetch(`${API_URL}/stats`);
        const stats = await response.json();

        document.getElementById("memberCount").textContent = stats.members;
        document.getElementById("channelCount").textContent = stats.channels;
        document.getElementById("voiceCount").textContent = stats.voiceChannels;
        document.getElementById("eventCount").textContent = stats.events;

    } catch (err) {

        console.error(err);

    }

}

loadStats();
