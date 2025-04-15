document.addEventListener("DOMContentLoaded", () => {
    // 啟動幻燈片
    showSlides();
  
    // 預設開啟 sidebar（僅桌面）
    if (window.innerWidth >= 1775) {
      document.querySelector(".sidebar").classList.remove("active");
    }
  });