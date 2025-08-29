document.addEventListener("DOMContentLoaded", () => {
    const hotlines = [
        { name_bn: "জাতীয় জরুরি সেবা", name_en: "National Emergency", number: "999", tag: "জাতীয় জরুরি সেবা", icon: "assets/emergency.png" },
        { name_bn: "পুলিশ", name_en: "Police", number: "999", tag: "পুলিশ", icon: "assets/police.png" },
        { name_bn: "ফায়ার সার্ভিস", name_en: "Fire Service", number: "999", tag: "অগ্নি", icon: "assets/fire-service.png" },
        { name_bn: "অ্যাম্বুলেন্স", name_en: "Ambulance", number: "1994-999999", tag: "স্বাস্থ্য", icon: "assets/ambulance.png" },
        { name_bn: "নারী ও শিশু সহায়তা", name_en: "Women & Child Help", number: "109", tag: "সহায়তা", icon: "assets/emergency.png" },
        { name_bn: "দুদম", name_en: "Anti-Corruption Helpline", number: "106", tag: "সহায়তা", icon: "assets/emergency.png" },
        { name_bn: "বিদ্যুৎ", name_en: "Electricity Helpline", number: "16216", tag: "সেবা", icon: "assets/emergency.png" },
        { name_bn: "ব্র্যাক", name_en: "Brac Helpline", number: "16445", tag: "সহায়তা", icon: "assets/emergency.png" },
        { name_bn: "বাংলাদেশ রেলওয়ে", name_en: "Bangladesh Railway Helpline", number: "163", tag: "পরিবহন", icon: "assets/emergency.png" }
    ];

    const container = document.getElementById("cardContainer");
    const historyList = document.getElementById("historyList");
    const clearHistory = document.getElementById("clearHistory");
    const heartCountEl = document.getElementById("heartCount");
    const copyCountEl = document.getElementById("copyCount");

    let heartCount = 0;
    let copyCount = 0;

    // Create the custom notification element once when the page loads
    const notification = document.createElement("div");
    notification.id = "custom-notification";
    notification.className = "fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl z-50 text-white transition-all duration-300 transform scale-0 opacity-0";
    document.body.appendChild(notification);

    // Function to show the custom notification
    function showNotification(message, isSuccess = true) {
        notification.textContent = message;
        if (isSuccess) {
            notification.className = "fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl z-50 text-white transition-all duration-300 transform scale-100 opacity-100 bg-green-500";
        } else {
            notification.className = "fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl z-50 text-white transition-all duration-300 transform scale-100 opacity-100 bg-red-500";
        }

        setTimeout(() => {
            notification.className = "fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl z-50 text-white transition-all duration-300 transform scale-0 opacity-0";
        }, 2000);
    }

    hotlines.forEach(service => {
        const card = document.createElement("div");
        card.className = "w-full rounded-xl shadow-md border p-4 flex flex-col gap-3 relative bg-white";

        card.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center overflow-hidden">
                    <img src="${service.icon}" alt="${service.name_en}" class="w-8 h-8 object-contain" />
                </div>
                <button class="heartBtn text-gray-400 hover:text-red-500 text-[35px]">♥</button>
            </div>
            <div>
                <h2 class="text-lg font-bold">${service.name_bn}</h2>
                <p class="text-sm text-gray-600">${service.name_en}</p>
            </div>
            <div class="text-2xl font-bold">${service.number}</div>
            <span class="px-2 py-1 bg-gray-100 rounded-full text-sm">${service.tag}</span>
            <div class="flex gap-2">
                <button class="copyBtn flex-1 border rounded-xl px-3 py-2 text-sm hover:bg-gray-300">
                    📋 Copy
                </button>
                <a href="tel:${service.number.replace(/[^0-9+]/g, '')}" class="callBtn flex-1 bg-green-600 text-white text-center rounded-xl px-3 py-2 text-sm hover:bg-gray-300">
                    📞 Call
                </a>
            </div>
        `;

        const heartBtn = card.querySelector(".heartBtn");
        let loved = false;
        heartBtn.addEventListener("click", () => {
            loved = !loved;
            if (loved) {
                heartBtn.classList.remove("text-gray-400");
                heartBtn.classList.add("text-red-500");
                heartCount++;
            } else {
                heartBtn.classList.remove("text-red-500");
                heartBtn.classList.add("text-gray-400");
                heartCount--;
            }
            if (heartCountEl) heartCountEl.textContent = heartCount;
        });

        card.querySelector(".copyBtn").addEventListener("click", async (e) => {
            try {
                await navigator.clipboard.writeText(service.number);
                copyCount++;
                if (copyCountEl) {
                    copyCountEl.textContent = copyCount;
                }
                showNotification("✅ Copied to clipboard!");

                const btn = e.target;
                const oldText = btn.textContent;
                btn.textContent = "✅ Copied!";
                setTimeout(() => {
                    btn.textContent = oldText;
                }, 1000);

            } catch (err) {
                console.warn("Clipboard not available or user denied permission.", err);
                showNotification("❌ Copy not supported, please copy manually.", false);
            }
        });

        card.querySelector(".callBtn").addEventListener("click", () => {
            if (!historyList) return;
            const li = document.createElement("li");
            const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            li.className = "flex justify-between items-center py-2 border-b";
            li.innerHTML = `<span>${service.name_en} (${service.number})</span><span class="text-gray-400">${now}</span>`;
            historyList.appendChild(li);
        });

        container && container.appendChild(card);
    });

    clearHistory && clearHistory.addEventListener("click", () => {
        if (historyList) historyList.innerHTML = "";
    });
});