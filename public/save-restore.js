(function() {
  const header = document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.innerHTML = `
      .save-restore {
          position: absolute;
          top: 10px;
          right: 40px;
          width: 20px;
          height: 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          padding: 0;
          font-size: 12px;
          background-color: #eee;
      }
  `;
  header.appendChild(style);

  const toggleButton = document.createElement("button");
  toggleButton.className = "save-restore";
  toggleButton.innerHTML = "&#x1f4be;";
  toggleButton.addEventListener("click", save);

  document.body.appendChild(toggleButton);

  const storageKey = encodeURIComponent(window.location.pathname);
  
  const perspective_viewers = document.getElementsByTagName("perspective-viewer");

  function save() {
    const saved_settings = [];
    for(let n = 0; n < perspective_viewers.length; n++) {
      saved_settings.push(perspective_viewers[n].save());
    }
  
    localStorage.setItem(storageKey, JSON.stringify(saved_settings));
  }

  function restore() {
    const savedString = localStorage.getItem(storageKey);
    if (savedString) {
      const saved_settings = JSON.parse(savedString);
      for(let n = 0; n < perspective_viewers.length; n++) {
        if (n < saved_settings.length) {
          perspective_viewers[n].restore(saved_settings[n]);
        }
      }
    }
  }

  restore();
})();
