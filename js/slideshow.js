// ===============================
// 🎞️ 幻燈片輪播
// ===============================
let slideIndex = 0;
let slideTimer;

function showSlidesManual(n) {
  const slides = document.getElementsByClassName("slide");
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  for (let slide of slides) {
    slide.style.display = "none";
  }

  slides[slideIndex].style.display = "block";
}

// ⏩ 自動播放
function autoSlides() {
  const slides = document.getElementsByClassName("slide");
  for (let slide of slides) {
    slide.style.display = "none";
  }

  slideIndex++;
  if (slideIndex >= slides.length) slideIndex = 0;
  slides[slideIndex].style.display = "block";

  slideTimer = setTimeout(autoSlides, 8000);
}

// ➕ 按下左右切換
function plusSlides(n) {
  clearTimeout(slideTimer); // 停止自動輪播
  slideIndex += n;
  showSlidesManual(slideIndex);
  slideTimer = setTimeout(autoSlides, 8000); // 重新啟動自動輪播
}

document.addEventListener("DOMContentLoaded", () => {
  showSlidesManual(slideIndex);
  slideTimer = setTimeout(autoSlides, 8000);
});
