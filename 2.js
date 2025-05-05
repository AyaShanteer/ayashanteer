// 1. تأثير الجسيمات
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    }
  },
  retina_detect: true
});

// 2. تأثير النص المتحرك
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;
    
    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];
      
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    
    this.el.innerHTML = output;
    
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(() => this.update());
      this.frame++;
    }
  }
}

// 3. التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// 4. تبديل اللغة
const enBtn = document.getElementById("en-btn");
const arBtn = document.getElementById("ar-btn");
const transAr = {
  nav: ["الرئيسية", "من أنا", "المهارات", "الخبرة", "التعليم", "الأدوات", "اتصل بي"],
  about: "أخصائية تسويق رقمي ومهتمة بتجربة المستخدم؛ أصمم تجارب سلسة مدعومة بالبيانات."
};

function switchLang(lang) {
  document.documentElement.lang = lang;
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
  
  // ترجمة القائمة
  document.querySelectorAll(".nav-link").forEach((link, index) => {
    link.textContent = lang === "ar" ? transAr.nav[index] : ["Home", "About", "Skills", "Experience", "Education", "Tools", "Contact"][index];
  });
  
  // ترجمة نص about
  document.querySelector("#about .about-content p").textContent = 
    lang === "ar" ? transAr.about : "I’m a Digital Marketing Specialist & UX enthusiast crafting data-driven campaigns and seamless user experiences.";
  
  // تفعيل الأزرار
  enBtn.classList.toggle("active", lang === "en");
  arBtn.classList.toggle("active", lang === "ar");
}

enBtn.addEventListener("click", () => switchLang("en"));
arBtn.addEventListener("click", () => switchLang("ar"));

// 5. تهيئة الموقع عند التحميل
document.addEventListener("DOMContentLoaded", () => {
  // تأثير العنوان المتحرك
  const phrases = [
    "Digital Marketing Specialist",
    "Content Creator",
    "AI & UX Tools Expert"
  ];
  const el = document.querySelector(".scramble-text");
  const fx = new TextScramble(el);
  let counter = 0;
  
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 2000);
    });
    counter = (counter + 1) % phrases.length;
  };
  
  next();

  // تأثيرات التمرير
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".animate-on-scroll").forEach(el => {
    observer.observe(el);
  });

  // سنة الفوتر
  document.getElementById("current-year").textContent = new Date().getFullYear();
});

// 6. المؤشر المخصص
const cursor = document.createElement("div");
cursor.classList.add("mouse-pointer");
document.body.appendChild(cursor);
document.body.style.cursor = "none";

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});