let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}



// 为 window 添加滚动事件监听
window.addEventListener('wheel', (event) => {
  // 判断滚动方向
  const isScrollingDown = event.deltaY > 0;
  const currentSection = getCurrentSection();

  if (currentSection) {
    let nextIndex = -1;

    // 找到当前 section 的索引
    for (let i = 0; i < sections.length; i++) {
      if (sections[i] === currentSection) {
        nextIndex = isScrollingDown ? i + 1 : i - 1;
        break;
      }
    }

    // 如果有下一个 section，滚动到它
    if (nextIndex >= 0 && nextIndex < sections.length) {
      sections[nextIndex].scrollIntoView({
        behavior: 'smooth' // 平滑滚动
      });
    }
  }
});

// 获取当前可视区域内的 section
function getCurrentSection() {
  const rect = document.documentElement.getBoundingClientRect();
  const threshold = rect.height / 2; // 设置阈值为视口高度的一半

  for (const section of sections) {
    const sectionRect = section.getBoundingClientRect();
    if (sectionRect.top >= 0 && sectionRect.top + threshold <= rect.height) {
      return section;
    }
  }

  return null;
}