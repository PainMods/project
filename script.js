const serverUrl = "http://103.82.93.111:3000"; // Ganti dengan IP VPS kamu

async function fetchCount() {
    try {
        const response = await fetch(`${serverUrl}/get-count`);
        const data = await response.json();

        document.getElementById("todayCount").innerText = data.today;
        document.getElementById("allTimeCount").innerText = data.allTime;

        await updateCount();
    } catch (error) {
        console.error("Error fetching count:", error);
    }
}

async function updateCount() {
    try {
        await fetch(`${serverUrl}/update-count`, { method: "POST" });
    } catch (error) {
        console.error("Error updating count:", error);
    }
}

fetchCount();
