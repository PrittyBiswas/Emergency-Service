const container = document.getElementById("cardContainer");
const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

let heartCount = 0;
let copyCount = 0;

hotline.forEach(service => {
    const card = document.createElement("div");
    card.className = "w-54 rounded-xl shadow-md border p-4 flex flex-col gap-3 relative bg-white";

    card.innerHTML = `
    <div class="flex justify-between items-start">
      <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center overflow-hidden">
        <img src="${service.icon}" alt="${service.name_en}" class="w-8 h-8 object-contain" />
      </div>
      <button class="heartBtn text-gray-400 hover:text-red-500">♥</button>
    </div>

    <div>
      <h2 class="text-lg font-bold">${service.name_bn}</h2>
      <p class="text-sm text-gray-600">${service.name_en}</p>
    </div>

    <div class="text-2xl font-bold">${service.number}</div>
    <span class="px-2 py-1 bg-gray-100 rounded-full text-sm">${service.tag}</span>

    <div class="flex gap-2">
      <button class="copyBtn flex-1 border rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
        📋 Copy
      </button>
      <button class="callBtn flex-1 bg-green-600 text-white rounded-lg px-3 py-2 text-sm hover:bg-green-700">
        📞 Call
      </button>
    </div>
  `;



})