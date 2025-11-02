let noteArray = [];
let selectedNotes = [];

const note = {
  id: null,
  title: "",
  content: "",
  color: "",
  createdAt: null,
  updatedAt: null,
};

// Vorhandene Notizen initialisieren
function initExistingNotes() {
  const existingNotes = document.querySelectorAll(".note-card");

  existingNotes.forEach((noteCard) => {
    const editBtn = noteCard.querySelector("#editNote");
    const deleteBtn = noteCard.querySelector("#deleteNote");

    if (editBtn && !editBtn.onclick) {
      editBtn.onclick = function () {
        openEditModal(this.closest(".note-card"));
      };
    }

    if (deleteBtn && !deleteBtn.onclick) {
      deleteBtn.onclick = function () {
        deleteNote(this.closest(".note-card"));
      };
    }
  });
}

// Modal-Funktionalität initialisieren
function initModal() {
  const addNoteBtn = document.querySelector(".add-note-btn");
  const infoBtn = document.querySelector(".info-btn");
  const addModal = document.getElementById("addNoteModal");
  const editModal = document.getElementById("editNoteModal");
  const deleteModal = document.getElementById("deleteNoteModal");
  const infoModal = document.getElementById("infoModal");

  const closeAddModal = document.querySelector(".close-modal");
  const closeEditModal = document.querySelector(".close-edit-modal");
  const closeDeleteModal = document.querySelector(".close-delete-modal");
  const closeInfoModal = document.querySelector(".close-info-modal");

  const cancelAddBtn = document.querySelector(".btn-cancel");
  const cancelEditBtn = document.querySelector(".btn-cancel-edit");
  const cancelDeleteBtn = document.querySelector(".btn-cancel-delete");

  const addNoteForm = document.getElementById("addNoteForm");
  const editNoteForm = document.getElementById("editNoteForm");
  const deleteNoteForm = document.getElementById("deleteNoteForm");

  // Öffne das ADD-Modal, wenn die Schaltfläche "Hinzufügen" geklickt wird
  addNoteBtn.addEventListener("click", function () {
    addModal.classList.add("show");
    document.body.classList.add("modal-open");
  });

  // Öffne das INFO-Modal, wenn die Schaltfläche "Info" geklickt wird
  infoBtn.addEventListener("click", function () {
    infoModal.classList.add("show");
    document.body.classList.add("modal-open");
  });

  // schließe Modal-Funktionen
  function closeAddModalWindow() {
    addModal.classList.remove("show");
    document.body.classList.remove("modal-open");
    addNoteForm.reset();
  }

  function closeEditModalWindow() {
    editModal.classList.remove("show");
    document.body.classList.remove("modal-open");
    editNoteForm.reset();
  }

  function closeDeleteModalWindow() {
    deleteModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  function closeInfoModalWindow() {
    infoModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  // schließe ADD modal events
  closeAddModal.addEventListener("click", closeAddModalWindow);
  cancelAddBtn.addEventListener("click", closeAddModalWindow);

  // schließe EDIT modal events
  closeEditModal.addEventListener("click", closeEditModalWindow);
  cancelEditBtn.addEventListener("click", closeEditModalWindow);

  // schließe DELETE modal events
  closeDeleteModal.addEventListener("click", closeDeleteModalWindow);
  cancelDeleteBtn.addEventListener("click", closeDeleteModalWindow);

  // schließe INFO modal events
  closeInfoModal.addEventListener("click", closeInfoModalWindow);

  // schließe modals wenn außerhalb des Modals geklickt wird
  window.addEventListener("click", function (event) {
    if (event.target === addModal) {
      closeAddModalWindow();
    }
    if (event.target === editModal) {
      closeEditModalWindow();
    }
    if (event.target === deleteModal) {
      closeDeleteModalWindow();
    }
    if (event.target === infoModal) {
      closeInfoModalWindow();
    }
  });

  // schließe modals bei Escape-Taste
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (addModal.classList.contains("show")) {
        closeAddModalWindow();
      }
      if (editModal.classList.contains("show")) {
        closeEditModalWindow();
      }
      if (deleteModal.classList.contains("show")) {
        closeDeleteModalWindow();
      }
      if (infoModal.classList.contains("show")) {
        closeInfoModalWindow();
      }
    }
  });

  addNoteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;
    const color = document.querySelector(
      'input[name="noteColor"]:checked'
    ).value;
    const priority = document.getElementById("notePriority").value;

    createNewNote(title, content, color, priority);
    closeAddModalWindow();
  });

  editNoteForm.addEventListener("submit", function (event) {
    console.log("Edit form submitted");
    event.preventDefault();

    const title = document.getElementById("editNoteTitle").value;
    const content = document.getElementById("editNoteContent").value;
    const color = document.querySelector(
      'input[name="editNoteColor"]:checked'
    ).value;
    const priority = document.getElementById("editNotePriority").value;

    // Notiz aktualisieren
    const currentNote = editModal.currentNoteElement;
    if (currentNote) {
      updateNote(currentNote, title, content, color, priority);
    }

    // Modal schließen
    editModal.classList.remove("show");
    document.body.classList.remove("modal-open");
    editNoteForm.reset();
  });
}

// Funktion zum Filtern von Notizen basierend auf dem Suchbegriff
function filterNotes(searchTerm) {
  const noteCards = document.querySelectorAll(".note-card");

  noteCards.forEach((card) => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    const content = card.querySelector("p").textContent.toLowerCase();

    if (title.includes(searchTerm) || content.includes(searchTerm)) {
      card.classList.remove("hidden");
      card.classList.add("visible");
    } else {
      if (searchTerm === "") {
        card.classList.remove("hidden");
        card.classList.add("visible");
      } else {
        card.classList.remove("visible");
        card.classList.add("hidden");
      }
    }
  });
}

// Funktion zum Erstellen einer neuen Notiz
function createNewNote(title, content, color, priority) {
  const noteGrid = document.querySelector(".note-grid");
  const noteCard = document.createElement("div");
  const priorityIcon = document.createElement("img");

  // Klassen hinzufügen
  noteCard.classList.add("note-card");

  // Farbzuordnung definieren (nur einmal!)
  const colorMap = {
    "#83cc16d3": "color-green",
    "#facc15da": "color-yellow",
    "#e11d44d2": "color-red",
  };

  const priorityColorMap = {
    "#83cc16d3": "green",
    "#facc15da": "yellow",
    "#e11d44d2": "red",
  };

  // Hintergrundfarbe setzen
  if (color !== "default") {
    noteCard.classList.add("colorful");
    if (colorMap[color]) {
      noteCard.classList.add(colorMap[color]);
    }
  }

  // Prioritätsicon hinzufügen
  // Prüfen ob Farbe und Priorität übereinstimmen (z.B. grüne Farbe + grüne Priorität)
  const selectedColorName = priorityColorMap[color]; // z.B. "green"
  const isColorAndPriorityMatch =
    selectedColorName && selectedColorName === priority;

  if (priority !== "none") {
    if (isColorAndPriorityMatch) {
      // Wenn Farbe und Priorität übereinstimmen, zeige Clock-Icon
      priorityIcon.src = `icons/clock.svg`;
      priorityIcon.alt = "Priority";
      priorityIcon.classList.add("priority-clock");
    } else {
      // Normale Prioritäts-Icons
      priorityIcon.src = `icons/${priority}.svg`;
      priorityIcon.alt = "Priority";
      priorityIcon.classList.add("priority-icon");
    }
  }

  // Aktuelles Datum abrufen
  const currentDate = new Date();
  const formatedDate = currentDate.toLocaleDateString("de-DE");
  const formatedTime = currentDate.toLocaleTimeString("de-DE");

  // HTML für die Notiz erstellen
  const header = document.createElement("div");
  header.classList.add("card-header");

  // Bezeichnung
  const titleElem = document.createElement("h2");
  titleElem.textContent = title;

  // icon container
  const iconsDiv = document.createElement("div");
  iconsDiv.classList.add("card-header-icons");

  // PRIORITY icon (wenn priority gesetzt ist)
  if (priority !== "none") {
    iconsDiv.appendChild(priorityIcon);
  }

  // EDIT icon
  const editIcon = document.createElement("img");
  editIcon.id = "editNote";
  editIcon.src = "icons/pencil.svg";
  editIcon.alt = "Edit";
  editIcon.classList.add("nav-icon");
  if (color !== "default") editIcon.classList.add("colorful");
  editIcon.addEventListener("click", () => {
    openEditModal(noteCard);
  });

  // DELETE icon
  const deleteIcon = document.createElement("img");
  deleteIcon.id = "deleteNote";
  deleteIcon.src = "icons/trash-repo.svg";
  deleteIcon.alt = "Delete";
  deleteIcon.classList.add("nav-icon");
  if (color !== "default") deleteIcon.classList.add("colorful");
  deleteIcon.addEventListener("click", () => {
    deleteNote(noteCard);
  });

  iconsDiv.append(editIcon, deleteIcon);

  header.append(titleElem, iconsDiv);

  // ---- INHALT ----
  const contentElem = document.createElement("p");
  contentElem.textContent = content;

  // ---- FOOTER ----
  const footer = document.createElement("div");
  footer.classList.add("card-footer");

  const dateElem = document.createElement("span");
  dateElem.classList.add("footer-date");
  if (color !== "default") dateElem.classList.add("colorful");
  dateElem.textContent = `Erstellt am: ${formatedTime}, ${formatedDate}`;

  footer.appendChild(dateElem);

  // ---- Card zusammenfügen ----
  noteCard.append(header, contentElem, footer);

  noteArray.push({
    id: Date.now(),
    title: title,
    content: content,
    color: color,
    priority: priority,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  // Notizkarte zum Grid hinzufügen
  noteGrid.appendChild(noteCard);

  console.log("Neue Notiz erstellt:", { title, content, color, priority });
  noteArray.forEach((note) => {
    console.log("Notiz im Array:", note);
  });
}

// Funktion zum Aktualisieren einer vorhandenen Notiz
function updateNote(noteElement, title, content, color, priority) {
  // Titel aktualisieren
  noteElement.querySelector("h2").textContent = title;

  // Inhalt aktualisieren
  noteElement.querySelector("p").textContent = content;

  // Farbe aktualisieren
  noteElement.classList.remove(
    "colorful",
    "color-green",
    "color-yellow",
    "color-red"
  );

  if (color !== "default") {
    noteElement.classList.add("colorful");
    const colorMap = {
      "#83cc16d3": "color-green",
      "#facc15da": "color-yellow",
      "#e11d44d2": "color-red",
    };
    if (colorMap[color]) {
      noteElement.classList.add(colorMap[color]);
    }
  }

  // Icon-Farben aktualisieren
  const icons = noteElement.querySelectorAll(".nav-icon");
  icons.forEach((icon) => {
    if (color !== "default") {
      icon.classList.add("colorful");
    } else {
      icon.classList.remove("colorful");
    }
  });

  // Footer-Datums-Klasse aktualisieren
  const footerDate = noteElement.querySelector(".footer-date");
  if (color !== "default") {
    footerDate.classList.add("colorful");
  } else {
    footerDate.classList.remove("colorful");
  }

  // Priorität aktualisieren
  const existingPriorityIcon = noteElement.querySelector(".priority-icon");
  if (existingPriorityIcon) {
    existingPriorityIcon.remove();
  }

  if (priority !== "none") {
    const cardHeaderIcons = noteElement.querySelector(".card-header-icons");
    const priorityIcon = document.createElement("img");

    // Prüfen ob Farbe und Priorität übereinstimmen
    const priorityColorMap = {
      "#83cc16d3": "green",
      "#facc15da": "yellow",
      "#e11d44d2": "red",
    };

    const selectedColorName = priorityColorMap[color];
    const isColorAndPriorityMatch =
      selectedColorName && selectedColorName === priority;

    if (isColorAndPriorityMatch) {
      // Wenn Farbe und Priorität übereinstimmen, zeige Clock-Icon
      priorityIcon.src = `icons/clock.svg`;
      priorityIcon.classList.add("priority-clock");
    } else {
      // Normale Prioritäts-Icons
      priorityIcon.src = `icons/${priority}.svg`;
    }

    priorityIcon.alt = "Priority";
    priorityIcon.className = `priority-icon ${
      color !== "default" ? "colorful" : ""
    }`;

    // Füge das Prioritäts-Icon am Anfang der Icon-Leiste hinzu
    const firstIcon = cardHeaderIcons.querySelector(".nav-icon");
    cardHeaderIcons.insertBefore(priorityIcon, firstIcon);
  }

  // Datum aktualisieren
  const currentDate = new Date();
  const formatedDate = currentDate.toLocaleDateString("de-DE");
  const formatedTime = currentDate.toLocaleTimeString("de-DE");
  footerDate.textContent = `Zuletzt aktualisiert: ${formatedTime}, ${formatedDate}`;

  noteArray.forEach((note) => {
    if (note.id === parseInt(noteElement.dataset.noteId)) {
      note.title = title;
      note.content = content;
      note.color = color;
      note.priority = priority;
    }
  });

  // LOG für Debugging
  noteArray.forEach((note) => {
    console.log("Notiz aktualisiert:", note);
  });
}

// Funktion zum Öffnen des Bearbeitungsmodals
function openEditModal(noteElement) {
  const editModal = document.getElementById("editNoteModal");

  // Get current note data
  const title = noteElement.querySelector("h2").textContent;
  const content = noteElement.querySelector("p").textContent;

  // Aktuelles Farbschema ermitteln
  let currentColor = "default";
  if (noteElement.classList.contains("colorful")) {
    if (noteElement.classList.contains("color-green")) {
      currentColor = "#83cc16d3";
    } else if (noteElement.classList.contains("color-yellow")) {
      currentColor = "#facc15da";
    } else if (noteElement.classList.contains("color-red")) {
      currentColor = "#e11d44d2";
    }
  }

  // Aktuelle Priorität ermitteln
  let currentPriority = "none";
  const priorityIcon = noteElement.querySelector(".priority-icon");
  if (priorityIcon) {
    const src = priorityIcon.src;
    if (src.includes("green")) currentPriority = "green";
    else if (src.includes("yellow")) currentPriority = "yellow";
    else if (src.includes("red")) currentPriority = "red";
    else if (src.includes("clock")) {
      // Clock icon bedeutet, dass Farbe und Priorität übereinstimmen
      // Ermittle die Priorität basierend auf der Farbe
      if (noteElement.classList.contains("color-green"))
        currentPriority = "green";
      else if (noteElement.classList.contains("color-yellow"))
        currentPriority = "yellow";
      else if (noteElement.classList.contains("color-red"))
        currentPriority = "red";
    }
  }

  // Formular mit aktuellen Daten füllen
  document.getElementById("editNoteTitle").value = title;
  document.getElementById("editNoteContent").value = content;
  document.querySelector(
    `input[name="editNoteColor"][value="${currentColor}"]`
  ).checked = true;
  document.getElementById("editNotePriority").value = currentPriority;

  // Referenz zur aktuellen Notiz speichern
  editModal.dataset.currentNote =
    noteElement.dataset.noteId ||
    Array.from(noteElement.parentNode.children).indexOf(noteElement);
  editModal.currentNoteElement = noteElement;

  // Bearbeitungsmodal anzeigen
  editModal.classList.add("show");
  document.body.classList.add("modal-open");
}

// Einstellungen-Funktionalität
function initSettings() {
  const settingsBtn = document.querySelector(".settings-btn");
  const settingsModal = document.getElementById("settingsModal");
  const closeSettingsModal = document.querySelector(".close-settings-modal");
  const cancelSettingsBtn = document.querySelector(".btn-cancel-settings");
  const resetSettingsBtn = document.querySelector(".btn-reset-settings");

  const darkModeToggle = document.getElementById("darkModeToggle");
  const compactModeToggle = document.getElementById("compactModeToggle");
  const menuBarToggle = document.getElementById("menuBarToggle");
  const autoSaveToggle = document.getElementById("autoSaveToggle");
  const confirmDeleteToggle = document.getElementById("confirmDeleteToggle");

  // Gespeicherte Einstellungen laden
  loadSettings();

  // Einstellungsmodal öffnen
  settingsBtn.addEventListener("click", function () {
    settingsModal.classList.add("show");
    document.body.classList.add("modal-open");
  });

  // Einstellungsmodal schließen - Funktionen
  function closeSettingsModalWindow() {
    settingsModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  // Einstellungsmodal schließen - Events
  closeSettingsModal.addEventListener("click", closeSettingsModalWindow);
  cancelSettingsBtn.addEventListener("click", closeSettingsModalWindow);

  // Modal schließen, wenn außerhalb geklickt wird
  window.addEventListener("click", function (event) {
    if (event.target === settingsModal) {
      closeSettingsModalWindow();
    }
  });

  // Modal bei Escape-Taste schließen
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && settingsModal.classList.contains("show")) {
      closeSettingsModalWindow();
    }
  });

  // Dunkelmodus-Umschalter
  darkModeToggle.addEventListener("change", function () {
    toggleDarkMode(this.checked);
    saveSettings();
  });

  // Kompakter Modus-Umschalter
  compactModeToggle.addEventListener("change", function () {
    toggleCompactMode(this.checked);
    saveSettings();
  });
  // Menüleisten-Umschalter
  menuBarToggle.addEventListener("change", function () {
    toggleMenuBar(this.checked);
    saveSettings();
  });

  // Löschen-bestätigen-Umschalter
  confirmDeleteToggle.addEventListener("change", function () {
    saveSettings();
  });

  // Einstellungen zurücksetzen
  resetSettingsBtn.addEventListener("click", function () {
    if (
      confirm(
        "Möchten Sie die Einstellungen auf die Standardwerte zurücksetzen?"
      )
    ) {
      resetSettings();
    }
  });
}

function toggleDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

function toggleCompactMode(enabled) {
  const noteCards = document.querySelectorAll(".note-card");

  if (enabled) {
    document.body.classList.add("compact-mode");
    noteCards.forEach((card) => {
      card.style.padding = "12px";
      card.style.marginBottom = "10px";
    });
  } else {
    document.body.classList.remove("compact-mode");
    noteCards.forEach((card) => {
      card.style.padding = "20px";
    });
  }
}

function toggleMenuBar(enabled) {
  const header = document.querySelector("header");
  const menuBar = document.querySelector(".menu-bar");
  const mainContent = document.querySelector("main");
  const navItems = document.querySelectorAll(".nav-item");
  const navTexts = document.querySelectorAll(".nav-text");
  const navIcons = document.querySelectorAll(".nav-icon");

  if (enabled) {
    header.classList.add("visibility");
    menuBar.classList.add("visibility");
    mainContent.classList.add("visibility");
    navTexts.forEach((text) => text.classList.add("visibility"));
    navItems.forEach((item) => item.classList.add("visibility"));
    navIcons.forEach((icon) => icon.classList.add("visibility"));
  } else {
    header.classList.remove("visibility");
    menuBar.classList.remove("visibility");
    mainContent.classList.remove("visibility");
    navTexts.forEach((text) => text.classList.remove("visibility"));
    navItems.forEach((item) => item.classList.remove("visibility"));
    navIcons.forEach((icon) => icon.classList.remove("visibility"));
  }
}

function saveSettings() {
  const settings = {
    darkMode: document.getElementById("darkModeToggle").checked,
    compactMode: document.getElementById("compactModeToggle").checked,
    menuBar: document.getElementById("menuBarToggle").checked,
    autoSave: document.getElementById("autoSaveToggle").checked,
    confirmDelete: document.getElementById("confirmDeleteToggle").checked,
  };

  localStorage.setItem("notizAppSettings", JSON.stringify(settings));
  console.log("Settings saved:", settings);
}

function loadSettings() {
  const savedSettings = localStorage.getItem("notizAppSettings");

  if (savedSettings) {
    const settings = JSON.parse(savedSettings);

    // Dunkelmodus anwenden
    document.getElementById("darkModeToggle").checked =
      settings.darkMode || false;
    toggleDarkMode(settings.darkMode || false);

    // Kompaktmodus anwenden
    document.getElementById("compactModeToggle").checked =
      settings.compactMode || false;
    console.log("Compact mode toggle:", settings.compactMode || false);
    toggleCompactMode(settings.compactMode || false);

    // Menüleiste anwenden
    document.getElementById("menuBarToggle").checked =
      settings.menuBar || false;
    console.log("Menu bar toggle:", settings.menuBar || false);
    toggleMenuBar(settings.menuBar || false);

    // Automatisches Speichern anwenden
    document.getElementById("autoSaveToggle").checked =
      settings.autoSave !== undefined ? settings.autoSave : true;

    // Löschen-bestätigen anwenden
    document.getElementById("confirmDeleteToggle").checked =
      settings.confirmDelete !== undefined ? settings.confirmDelete : true;

    console.log("Settings loaded:", settings);
  }
}

function resetSettings() {
  // Auf Standardwerte zurücksetzen
  document.getElementById("darkModeToggle").checked = false;
  document.getElementById("compactModeToggle").checked = false;
  document.getElementById("autoSaveToggle").checked = false;
  document.getElementById("confirmDeleteToggle").checked = true;

  // Einstellungen anwenden
  toggleDarkMode(false);
  toggleCompactMode(false);

  // In localStorage speichern
  saveSettings();

  console.log("Einstellungen auf Standard zurückgesetzt");
}

// Löschfunktion aktualisieren, um die Bestätigungseinstellung zu beachten
let noteToDelete = null; // Referenz zur zu löschenden Notiz speichern

function deleteNote(noteElement) {
  const confirmDelete = document.getElementById("confirmDeleteToggle").checked;
  const deleteModal = document.getElementById("deleteNoteModal");

  if (!confirmDelete) {
    // Wenn Bestätigung deaktiviert ist, sofort löschen
    noteElement.remove();
    console.log("Notiz gelöscht");
  } else {
    // Bestätigungsmodal anzeigen
    noteToDelete = noteElement;
    deleteModal.classList.add("show");
    document.body.classList.add("modal-open");
  }
}

// Löschbestätigung verarbeiten
function confirmDelete() {
  if (noteToDelete) {
    noteToDelete.remove();
    console.log("Notiz gelöscht");

    // Zurücksetzen und Modal schließen
    noteToDelete = null;
    document.getElementById("deleteNoteModal").classList.remove("show");
    document.body.classList.remove("modal-open");
  }
}
// Sucheleisten Funktionalität
document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.querySelector(".search-toggle");
  const searchInput = document.querySelector(".search-input");
  const searchIcon = document.querySelector(".search-icon");

  let isSearchOpen = false;

  // Suchleiste bei Icon-Klick umschalten
  searchToggle.addEventListener("click", function () {
    isSearchOpen = !isSearchOpen;

    if (isSearchOpen) {
      searchInput.classList.add("active");
      searchInput.focus();
      searchIcon.classList.toggle("rotate");
    } else {
      searchInput.classList.remove("active");
      searchInput.blur();
      searchIcon.classList.remove("rotate");
      searchInput.value = "";
    }
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".search-container") && isSearchOpen) {
      isSearchOpen = false;
      searchInput.classList.remove("active");
      searchInput.blur();
      searchIcon.classList.remove("rotate");
      searchInput.value = "";
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isSearchOpen) {
      isSearchOpen = false;
      searchInput.classList.remove("active");
      searchInput.blur();
      searchIcon.classList.remove("rotate");
      searchInput.value = "";
    }
  });

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    console.log("Suchbegriff:", searchTerm);

    filterNotes(searchTerm);
  });

  initModal();

  initExistingNotes();

  initSettings();

  // Event-Listener für Löschmodal initialisieren
  const confirmDeleteBtn = document.querySelector(".btn-confirm-delete");
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", confirmDelete);
  }
});
