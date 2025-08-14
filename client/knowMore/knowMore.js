// ===== App Data =====
const apps = {
  typefaster: {
    logo: "TypeFasterPortable_128.png",
    title: "TypeFaster",
    description: [
      "TypeFaster is a free typing tutor that teaches you how to touch-type. Once you can touch-type, you will not need to look at the keyboard to find the letters you want to type.",
      "Supports multiple keyboard layouts and more can be added easily. Includes support for non-rectangular keys. The following keyboard layouts are currently supported: Danish, Finnish, French, French-Belgian, German, Hebrew (no lesson files), Italian, Norwegian, Numeric Keypad, Portuguese, Spanish, UK-English, US-Dvorak, US-English."
    ],
    features: [
      "A clear indication of which fingers to use (touch typing essence).",
      "A 3D typing game.",
      "Typing statistics with custom key practice.",
      "Resolution-independent keyboard size.",
      "Multi-user and teacher support.",
      "Interface for editing lesson files and game settings.",
      "Backspace support, right-to-left text support.",
      "Variable text size, lesson progress indicator."
    ],
    download: {
      publisher: "TypeFaster Team & PortableApps.com",
      added: "16th May, 2025",
      updated: "8th August, 2025",
      system: "Windows XP",
      license: "Open Source (GPL)",
      source: "TypeFaster, PortableApps.com Launcher, PortableApps.com Installer"
    },
    screenshot: "Screenshot 2025-08-08 210716.png"
  },

  exampleapp: {
    logo: "example_logo.png",
    title: "Example App",
    description: [
      "Example App is a sample application demonstrating dynamic pages using JS only.",
      "It features interactive elements and responsive design for modern devices."
    ],
    features: [
      "Feature 1: Easy to use.",
      "Feature 2: Fully responsive.",
      "Feature 3: Dynamic content generation.",
      "Feature 4: Interactive UI elements."
    ],
    download: {
      publisher: "Example Publisher",
      added: "1st January, 2025",
      updated: "10th August, 2025",
      system: "Windows 10+",
      license: "Freeware",
      source: "Example Source"
    },
    screenshot: "example_screenshot.png"
  }
};

// ===== Utility: Get URL Parameter =====
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ===== Generate Page Content =====
function renderAppPage(appKey) {
  const app = apps[appKey];
  if (!app) {
    document.getElementById("appContent").innerHTML = "<p>App not found.</p>";
    return;
  }

  let descriptionHTML = app.description.map(p => `<p>${p}</p>`).join("");
  let featuresHTML = app.features.map(f => `<li>${f}</li>`).join("");

  const html = `
    <div class="app-header">
      <img src="${app.logo}" alt="${app.title} Logo" class="app-logo" />
      <h1 class="app-title">${app.title}</h1>
    </div>

    <div class="app-image-container">
      <img src="${app.screenshot}" alt="${app.title} Screenshot" class="app-image" id="clickableImage" />
    </div>


    <section class="app-description">
      <h2>Description</h2><br>
      ${descriptionHTML}<br>
      <ul>${featuresHTML}</ul>
    </section>

    <section class="download-details">
      <h2>Download Details</h2><br>
      <p><strong>Publisher:</strong> ${app.download.publisher}</p>
      <p><strong>Date Added:</strong> ${app.download.added}</p>
      <p><strong>Date Updated:</strong> ${app.download.updated}</p>
      <p><strong>System Requirements:</strong> ${app.download.system}</p>
      <p><strong>App License:</strong> ${app.download.license}</p>
      <p><strong>Source:</strong> ${app.download.source}</p>
    </section><br><br>

    
  `;

  document.getElementById("appContent").innerHTML = html;

  setupModal();
}

// ===== Modal functionality =====
function setupModal() {
  const modal = document.getElementById("imageModal");
  const img = document.getElementById("clickableImage");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.getElementsByClassName("close")[0];

  if (!img) return;

  img.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
  };

  closeBtn.onclick = function() {
    modal.style.display = "none";
  };

  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = "none";
  };
}

// ===== On page load =====
const appKey = getQueryParam("app") || "typefaster";
renderAppPage(appKey);
