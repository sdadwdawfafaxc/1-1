window.addEventListener('load', function() {
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.add('fade-out');
  setTimeout(() => {
    overlay.style.display = 'none';
    showWelcomePopup();
  }, 500);
});

function showWelcomePopup() {
  const popup = document.getElementById('welcomePopup');
  if (popup) {
    popup.classList.add('show');
  }
}
function closeWelcomePopup() {
  const popup = document.getElementById('welcomePopup');
  if (popup) {
    popup.classList.remove('show');
  }
}

// ป้องกัน toggle theme ซ้ำระหว่างโหลด
let themeToggling = false;
function updateToggleBtn() {
  const btn = document.getElementById('toggleThemeBtn');
  if (btn) btn.textContent = document.body.classList.contains('light-mode') ? "☀️" : "🌙";
}
function toggleTheme() {
  if (themeToggling) return;
  themeToggling = true;
  document.body.classList.toggle('light-mode');
  updateToggleBtn();
  setTimeout(() => { themeToggling = false; }, 350);
}
document.addEventListener('DOMContentLoaded', updateToggleBtn);

// Hamburger animation
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const ham = document.getElementById('hamburger');
  if (navLinks && ham) {
    navLinks.classList.toggle('open');
    ham.classList.toggle('open');
  }
}
document.addEventListener('click', function(e) {
  const nav = document.getElementById('navLinks');
  const ham = document.getElementById('hamburger');
  if (window.innerWidth <= 900 && nav.classList.contains('open')) {
    if (!nav.contains(e.target) && !ham.contains(e.target)) {
      nav.classList.remove('open');
    }
  }
});

function navigateMenu(event, sectionId) {
  event.preventDefault();
  document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');
  const section = document.getElementById(sectionId);
  if (section) section.style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('navLinks').classList.remove('open');

  if(sectionId === 'กลางบ้าน') showDefaultHomeworkImages();
  if(sectionId === 'ตารางเรียน') showDefaultScheduleImage();
}
document.addEventListener('DOMContentLoaded', () => {
  showDefaultScheduleImage();
});

function addHomework() {
  const files = document.getElementById('homeworkFile').files;
  const text = document.getElementById('homeworkText').value.trim();
  const list = document.getElementById('homeworkList');
  let hasData = false;

  if (list.querySelector('.no-data')) list.innerHTML = '';

  if (files.length > 0) {
    hasData = true;
    for (let file of files) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.loading = "lazy";
          img.style.maxWidth = '220px';
          img.style.margin = '8px 0';
          img.style.borderRadius = '12px';
          img.style.boxShadow = '0 2px 8px #0003';
          img.alt = file.name;
          img.classList.add('pop-animate');
          list.appendChild(img);
        };
        reader.readAsDataURL(file);
      } else {
        const fileDiv = document.createElement('div');
        fileDiv.textContent = `📄 ${file.name}`;
        fileDiv.style.margin = '8px 0';
        fileDiv.classList.add('pop-animate');
        list.appendChild(fileDiv);
      }
    }
  }

  if (text) {
    hasData = true;
    const p = document.createElement('div');
    p.textContent = `💬 ${text}`;
    p.style.margin = '8px 0';
    p.style.background = '#fff3';
    p.style.padding = '8px 12px';
    p.style.borderRadius = '8px';
    p.classList.add('pop-animate');
    list.appendChild(p);
  }

  if (!hasData && list.children.length === 0) {
    list.innerHTML = '<span class="no-data">ยังไม่มีข้อมูล</span>';
  }

  document.getElementById('homeworkFile').value = '';
  document.getElementById('homeworkText').value = '';
}

function showDefaultHomeworkImages() {
  const preview = document.getElementById('uploadedImagePreview');
  const list = document.getElementById('homeworkList');
  if (!list.hasChildNodes() || list.innerHTML.trim() === '') {
    list.innerHTML = '<span class="no-data">ยังไม่มีข้อมูล</span>';
  }
}

function showDefaultScheduleImage() {
  const preview = document.getElementById('scheduleImagePreview');
  if (!preview.hasChildNodes() || preview.innerHTML.trim() === '') {
    preview.innerHTML = '<span class="no-data">ยังไม่มีข้อมูล</span>';
  }
}
