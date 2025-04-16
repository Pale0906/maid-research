// ===============================
// 🧭 側邊欄控制邏輯（桌機＋手機）
// ===============================
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('active');
}
  
  // 📱 點擊內容區域時關閉側邊欄（僅限手機寬度）
  document.addEventListener("click", function (e) {
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.querySelector(".hamburger-btn");
    const isSidebarOpen = sidebar.classList.contains("active");
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
  
    if (isSidebarOpen && !isClickInsideSidebar && !isClickOnHamburger && window.innerWidth < 1775) {
      sidebar.classList.remove("active");
    }
  });
  
  // 🖥️ 當視窗大小改變，自動控制 sidebar 顯示
  window.addEventListener('resize', () => {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth >= 1775) {
      sidebar.classList.remove('active'); // 回到桌面版預設打開
    }
  });
  