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
});

// Initialize vorhandene Notizen
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

// Initialize modal Funktionalität
function initModal() {
  const addNoteBtn = document.querySelector(".add-note-btn");
  const addModal = document.getElementById("addNoteModal");
  const editModal = document.getElementById("editNoteModal");
  const deleteModal = document.getElementById("deleteNoteModal");

  const closeAddModal = document.querySelector(".close-modal");
  const closeEditModal = document.querySelector(".close-edit-modal");
  const closeDeleteModal = document.querySelector(".close-delete-modal");

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

  // schließe ADD modal events
  closeAddModal.addEventListener("click", closeAddModalWindow);
  cancelAddBtn.addEventListener("click", closeAddModalWindow);

  // schließe EDIT modal events
  closeEditModal.addEventListener("click", closeEditModalWindow);
  cancelEditBtn.addEventListener("click", closeEditModalWindow);

  // schließe DELETE modal events
  closeDeleteModal.addEventListener("click", closeDeleteModalWindow);
  cancelDeleteBtn.addEventListener("click", closeDeleteModalWindow);

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

    // Update note
    const currentNote = editModal.currentNoteElement;
    if (currentNote) {
      updateNote(currentNote, title, content, color, priority);
    }

    // Close modal
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
  // Hintergrundfarbe setzen
  if (color !== "default") {
    noteCard.classList.add("colorful");
    const colorMap = {
      "#83cc16d3": "color-green",
      "#facc15da": "color-yellow",
      "#e11d44d2": "color-red",
    };
    if (colorMap[color]) {
      noteCard.classList.add(colorMap[color]);
    }
  }

  // Prioritätsicon hinzufügen
  if (priority !== "none") {
    priorityIcon.src = `icons/${priority}.svg`;
    priorityIcon.alt = "Priority";
    priorityIcon.classList.add("priority-icon");
  }

  // Aktuelles Datum abrufen
  const currentDate = new Date().toLocaleString("de-DE");

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
  dateElem.textContent = `Erstellt am: ${currentDate}`;

  footer.appendChild(dateElem);

  // ---- Card zusammenfügen ----
  noteCard.append(header, contentElem, footer);
  // Notizkarte zum Grid hinzufügen
  noteGrid.appendChild(noteCard);

  console.log("Neue Notiz erstellt:", { title, content, color, priority });
}

// Funktion zum Aktualisieren einer vorhandenen Notiz
function updateNote(noteElement, title, content, color, priority) {
  // Update title
  noteElement.querySelector("h2").textContent = title;

  // Update content
  noteElement.querySelector("p").textContent = content;

  // Update color
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

  // Update nav icon colors
  const icons = noteElement.querySelectorAll(".nav-icon");
  icons.forEach((icon) => {
    if (color !== "default") {
      icon.classList.add("colorful");
    } else {
      icon.classList.remove("colorful");
    }
  });

  // Update footer date class
  const footerDate = noteElement.querySelector(".footer-date");
  if (color !== "default") {
    footerDate.classList.add("colorful");
  } else {
    footerDate.classList.remove("colorful");
  }

  // Update priority
  const existingPriorityIcon = noteElement.querySelector(".priority-icon");
  if (existingPriorityIcon) {
    existingPriorityIcon.remove();
  }

  if (priority !== "none") {
    const cardHeaderIcons = noteElement.querySelector(".card-header-icons");
    const priorityIcon = document.createElement("img");
    priorityIcon.src = `icons/${priority}.svg`;
    priorityIcon.alt = "Priority";
    priorityIcon.className = `priority-icon ${
      color !== "default" ? "colorful" : ""
    }`;

    // Füge das Prioritäts-Icon am Anfang der Icon-Leiste hinzu
    const firstIcon = cardHeaderIcons.querySelector(".nav-icon");
    cardHeaderIcons.insertBefore(priorityIcon, firstIcon);
  }

  // Update date
  const currentDate = new Date().toLocaleTimeString("de-DE");
  footerDate.textContent = `Zuletzt aktualisiert: ${currentDate}`;

  // LOG für Debugging
  console.log("Notiz erstellt:", { title, content, color, priority });

  // Update calendar if it's visible
  // if (
  //   document.getElementById("calendar-section").classList.contains("visible")
  // ) {
  //   generateCalendar(
  //     currentCalendarDate.getFullYear(),
  //     currentCalendarDate.getMonth()
  //   );

  //   // Datum aktualisieren
  //   if (selectedDate) {
  //     showNotesForDate(selectedDate);
  //   }
  // }
}

// Function to open edit modal
function openEditModal(noteElement) {
  const editModal = document.getElementById("editNoteModal");

  // Get current note data
  const title = noteElement.querySelector("h2").textContent;
  const content = noteElement.querySelector("p").textContent;

  // Get current color
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

  // Get current priority
  let currentPriority = "none";
  const priorityIcon = noteElement.querySelector(".priority-icon");
  if (priorityIcon) {
    const src = priorityIcon.src;
    if (src.includes("green")) currentPriority = "green";
    else if (src.includes("yellow")) currentPriority = "yellow";
    else if (src.includes("red")) currentPriority = "red";
  }

  // Fill form with current data
  document.getElementById("editNoteTitle").value = title;
  document.getElementById("editNoteContent").value = content;
  document.querySelector(
    `input[name="editNoteColor"][value="${currentColor}"]`
  ).checked = true;
  document.getElementById("editNotePriority").value = currentPriority;

  // Store reference to current note
  editModal.dataset.currentNote =
    noteElement.dataset.noteId ||
    Array.from(noteElement.parentNode.children).indexOf(noteElement);
  editModal.currentNoteElement = noteElement;

  // Show edit modal
  editModal.classList.add("show");
  document.body.classList.add("modal-open");
}

//selectedNotesContainer.innerHTML = notesHtml;

// Settings functionality
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

  // Load saved settings
  loadSettings();

  // Open settings modal
  settingsBtn.addEventListener("click", function () {
    settingsModal.classList.add("show");
    document.body.classList.add("modal-open");
  });

  // Close settings modal functions
  function closeSettingsModalWindow() {
    settingsModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  // Close settings modal events
  closeSettingsModal.addEventListener("click", closeSettingsModalWindow);
  cancelSettingsBtn.addEventListener("click", closeSettingsModalWindow);

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === settingsModal) {
      closeSettingsModalWindow();
    }
  });

  // Close modal on Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && settingsModal.classList.contains("show")) {
      closeSettingsModalWindow();
    }
  });

  // Dark mode toggle
  darkModeToggle.addEventListener("change", function () {
    toggleDarkMode(this.checked);
    saveSettings();
  });

  // Compact mode toggle
  compactModeToggle.addEventListener("change", function () {
    toggleCompactMode(this.checked);
    saveSettings();
  });
  // Menu bar toggle
  menuBarToggle.addEventListener("change", function () {
    toggleMenuBar(this.checked);
    saveSettings();
  });

  // Confirm delete toggle
  confirmDeleteToggle.addEventListener("change", function () {
    saveSettings();
  });

  // Reset settings
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

    // Apply dark mode
    document.getElementById("darkModeToggle").checked =
      settings.darkMode || false;
    toggleDarkMode(settings.darkMode || false);

    // Apply compact mode
    document.getElementById("compactModeToggle").checked =
      settings.compactMode || false;
    console.log("Compact mode toggle:", settings.compactMode || false);
    toggleCompactMode(settings.compactMode || false);

    // Apply menu bar
    document.getElementById("menuBarToggle").checked =
      settings.menuBar || false;
    console.log("Menu bar toggle:", settings.menuBar || false);
    toggleMenuBar(settings.menuBar || false);

    // Apply auto save
    document.getElementById("autoSaveToggle").checked =
      settings.autoSave !== undefined ? settings.autoSave : true;

    // Apply confirm delete
    document.getElementById("confirmDeleteToggle").checked =
      settings.confirmDelete !== undefined ? settings.confirmDelete : true;

    console.log("Settings loaded:", settings);
  }
}

function resetSettings() {
  // Reset to default values
  document.getElementById("darkModeToggle").checked = false;
  document.getElementById("compactModeToggle").checked = false;
  document.getElementById("autoSaveToggle").checked = false;
  document.getElementById("confirmDeleteToggle").checked = true;

  // Apply settings
  toggleDarkMode(false);
  toggleCompactMode(false);

  // Save to localStorage
  saveSettings();

  console.log("Settings reset to defaults");
}

// Update delete function to respect confirm delete setting
let noteToDelete = null; // Store reference to note being deleted

function deleteNote(noteElement) {
  const confirmDelete = document.getElementById("confirmDeleteToggle").checked;
  const deleteModal = document.getElementById("deleteNoteModal");

  if (!confirmDelete) {
    // If confirmation is disabled, delete immediately
    noteElement.remove();
    console.log("Note deleted");
  } else {
    // Show confirmation modal
    noteToDelete = noteElement;
    deleteModal.classList.add("show");
    document.body.classList.add("modal-open");
  }
}

// Handle delete confirmation
function confirmDelete() {
  if (noteToDelete) {
    noteToDelete.remove();
    console.log("Note deleted");

    // Reset and close modal
    noteToDelete = null;
    document.getElementById("deleteNoteModal").classList.remove("show");
    document.body.classList.remove("modal-open");
  }
}

// Initialize delete modal event listener
document.addEventListener("DOMContentLoaded", function () {
  const confirmDeleteBtn = document.querySelector(".btn-confirm-delete");
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", confirmDelete);
  }
});
