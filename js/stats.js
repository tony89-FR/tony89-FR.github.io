const API_URL = "https://la-communaute-live-bot.onrender.com";

async function loadStats() {

    try {

        const response = await fetch(`${API_URL}/stats`);
        const stats = await response.json();

    document.getElementById("members").textContent = stats.members;
    document.getElementById("channels").textContent = stats.channels;
    document.getElementById("voice").textContent = stats.voiceChannels;
    document.getElementById("events").textContent = stats.events;

    } catch (err) {

        console.error(err);

    }

}

loadStats();
