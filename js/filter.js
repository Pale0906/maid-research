// 🎯 filter.js — 控制女僕咖啡店篩選邏輯（支援 filter-tag 按鈕樣式）

// 📌 取得 DOM 元件
const timeSlider = document.querySelector(".filter-time");
const timeLabel = document.querySelector(".filter-time-label");
const resetBtn = document.getElementById("reset-filters");

// 📍 點擊 .filter-tag 切換 active 狀態（多選按鈕）
document.querySelectorAll(".filter-tag").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    applyFilters(); // 每次點擊都立即重新篩選
  });
});

// ⏰ 更新時間滑桿顯示文字
function updateTimeLabel(value) {
  const hour = Math.floor(value);
  const minutes = (value % 1 === 0.5) ? ":30" : ":00";
  const displayHour = hour < 24 ? hour : hour - 24;
  timeLabel.textContent = `顯示 ${displayHour}${minutes} 有營業的店舖`;
}

// 📍 初始化時間文字與滑桿事件
if (timeSlider) {
  updateTimeLabel(timeSlider.value);
  timeSlider.addEventListener("input", (e) => {
    updateTimeLabel(e.target.value);
    applyFilters();
  });
}

// 📦 取得所有篩選條件（從 .filter-tag.active 抓值）
function getFilters() {
  const theme  = Array.from(document.querySelectorAll(".filter-theme.active")).map(el => el.dataset.value);
  const type   = Array.from(document.querySelectorAll(".filter-type.active")).map(el => el.dataset.value);
  const days   = Array.from(document.querySelectorAll(".filter-day.active")).map(el => el.dataset.value);
  const area   = Array.from(document.querySelectorAll(".filter-area.active")).map(el => el.dataset.value);
  const cost   = document.querySelector(".filter-cost").value;
  const status = document.querySelector(".filter-status").value;
  const time   = parseFloat(timeSlider.value);
  return { theme, type, days, cost, area, status, time };
}

// ✅ 主篩選邏輯
function applyFilters() {
  const filters = getFilters();
  const cards = document.querySelectorAll(".cafe-card");
  let matchCount = 0;

  cards.forEach(card => {
    const cardTheme = card.dataset.theme?.split(",") || [];
    const cardType = card.dataset.type?.split(",") || [];
    const cardDays = card.dataset.days?.split(",") || [];
    const cardOpen = parseFloat(card.dataset.open);
    const cardClose = parseFloat(card.dataset.close);
    const cardCost = parseInt(card.dataset.cost);
    const cardArea = card.dataset.area;
    const cardStatus = card.dataset.status;

    // ✅ 每一個條件獨立比對
    const matchTheme  = filters.theme.length === 0 || filters.theme.some(v => cardTheme.includes(v));
    const matchType   = filters.type.length === 0 || filters.type.some(v => cardType.includes(v));
    const matchDays   = filters.days.length === 0 || filters.days.some(v => cardDays.includes(v));
    const matchCost   = !filters.cost || cardCost <= parseInt(filters.cost);
    const matchArea   = filters.area.length === 0 || filters.area.includes(cardArea);
    const matchStatus = filters.status === "all" || filters.status === cardStatus;
    const matchTime   = filters.time >= cardOpen && filters.time <= cardClose;

    const isMatch = matchTheme && matchType && matchDays && matchCost && matchArea && matchStatus && matchTime;

    card.style.display = isMatch ? "block" : "none";
    if (isMatch) matchCount++;
  });

  document.getElementById("cafe-count").textContent = matchCount;
}

// 📦 重設篩選條件（回復預設）
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    // 讓所有 .filter-tag 都加上 active（預設為全選）
    [".filter-theme", ".filter-type", ".filter-day", ".filter-area"].forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.classList.add("active"));
    });

    // 下拉式預設
    document.querySelector(".filter-cost").value = "";
    document.querySelector(".filter-status").value = "open";

    // 重設時間滑桿
    timeSlider.value = 20;
    updateTimeLabel(20);

    applyFilters();
  });
}

// 手機版篩選器顯示/隱藏功能
document.querySelector('.filter-toggle').addEventListener('click', function() {
    const filterPanel = document.querySelector('.filter-panel');
    filterPanel.classList.toggle('active'); // 當點擊時切換顯示/隱藏
});

// ✅ 綁定 select 篩選器變動
[".filter-cost", ".filter-status"].forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
      el.addEventListener("change", applyFilters);
    }
});
  
// 📦 初始載入後自動篩選一次
window.addEventListener("DOMContentLoaded", applyFilters);

