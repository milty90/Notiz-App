// Search functionality
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
      searchIcon.style.transform = "rotate(90deg)";
    } else {
      searchInput.classList.remove("active");
      searchInput.blur();
      searchIcon.style.transform = "rotate(0deg)";
      searchInput.value = "";
    }
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".search-container") && isSearchOpen) {
      isSearchOpen = false;
      searchInput.classList.remove("active");
      searchInput.blur();
      searchIcon.style.transform = "rotate(0deg)";
      searchInput.value = "";
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isSearchOpen) {
      isSearchOpen = false;
      searchInput.classList.remove("active");
      searchInput.blur();
      searchIcon.style.transform = "rotate(0deg)";
      searchInput.value = "";
    }
  });

  // Suchfunktion (kann erweitert werden)
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    console.log("Suchbegriff:", searchTerm);

    // Hier können Sie die Logik zum Filtern von Notizen hinzufügen
    // Zum Beispiel: Notizkarten basierend auf dem Suchbegriff ein-/ausblenden
    filterNotes(searchTerm);
  });

  initModal();

  initExistingNotes();

  initCalendar();

  initSettings();
});

// Initialize existing notes with edit/delete functionality
function initExistingNotes() {
  const existingNotes = document.querySelectorAll(".note-card");

  existingNotes.forEach((noteCard) => {
    const editBtn = noteCard.querySelector('img[alt="Edit"]');
    const deleteBtn = noteCard.querySelector(
      'img[alt="Settings"], img[alt="Delete"]'
    );

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

// Initialize modal functionality
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

  // Open ADD modal when add button clicked
  addNoteBtn.addEventListener("click", function () {
    addModal.classList.add("show");
    document.body.classList.add("modal-open");
  });

  // Close modal functions
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

  // Close ADD modal events
  closeAddModal.addEventListener("click", closeAddModalWindow);
  cancelAddBtn.addEventListener("click", closeAddModalWindow);

  // Close EDIT modal events
  closeEditModal.addEventListener("click", closeEditModalWindow);
  cancelEditBtn.addEventListener("click", closeEditModalWindow);

  // Close DELETE modal events
  closeDeleteModal.addEventListener("click", closeDeleteModalWindow);
  cancelDeleteBtn.addEventListener("click", closeDeleteModalWindow);

  // Close modals when clicking outside
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

  // Close modals on Escape key
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

  // Handle ADD form submission
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

// Function to filter notes based on search term
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

// Function to create new note
function createNewNote(title, content, color, priority) {
  const noteGrid = document.querySelector(".note-grid");
  const noteCard = document.createElement("div");

  // Add classes
  noteCard.classList.add("note-card");
  if (color !== "default") {
    noteCard.classList.add("colorful");
    noteCard.style.backgroundColor = color;
  }

  // Create priority icon HTML
  let priorityIcon = "";
  if (priority !== "none") {
    priorityIcon = `
      <img 
        src="icons/circle-${priority}.svg" 
        alt="Priority" 
        class="priority-icon ${color !== "default" ? "colorful" : ""}"
        style="width: 24px; height: 24px; margin: 0px 10px 5px 0px"
      />
    `;
  }

  // Get current date
  const currentDate = new Date().toLocaleDateString("de-DE");

  // Create note HTML
  noteCard.innerHTML = `
    <div class="card-header">
      <h2>${title}</h2>
      <div class="card-header-icons">
        ${priorityIcon}
        <img src="icons/pencil.svg" alt="Edit" class="nav-icon ${
          color !== "default" ? "colorful" : ""
        }" onclick="openEditModal(this.closest('.note-card'))" />
        <img src="icons/trash-repo.svg" alt="Delete" class="nav-icon ${
          color !== "default" ? "colorful" : ""
        }" onclick="deleteNote(this.closest('.note-card'))" />
      </div>
    </div>
    <p>${content}</p>
    <div class="card-footer">
      <span class="footer-date ${
        color !== "default" ? "colorful" : ""
      }">Zuletzt bearbeitet: ${currentDate}</span>
    </div>
  `;
  // Add to grid
  noteGrid.appendChild(noteCard);

  // Add hover effect
  noteCard.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
    this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
  });

  noteCard.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
  });

  console.log("Neue Notiz erstellt:", { title, content, color, priority });

  // Kalender aktualisieren, wenn sichtbar
  if (
    document.getElementById("calendar-section").classList.contains("visible")
  ) {
    generateCalendar(
      currentCalendarDate.getFullYear(),
      currentCalendarDate.getMonth()
    );
  }
}

// Function to update existing note
function updateNote(noteElement, title, content, color, priority) {
  // Update title
  noteElement.querySelector("h2").textContent = title;

  // Update content
  noteElement.querySelector("p").textContent = content;

  // Update color
  noteElement.classList.remove("colorful");
  noteElement.style.backgroundColor = "";

  if (color !== "default") {
    noteElement.classList.add("colorful");
    noteElement.style.backgroundColor = color;
  }

  // Update icons (colorful class)
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

  // Update priority icon
  const existingPriorityIcon = noteElement.querySelector(".priority-icon");
  if (existingPriorityIcon) {
    existingPriorityIcon.remove();
  }

  if (priority !== "none") {
    const cardHeaderIcons = noteElement.querySelector(".card-header-icons");
    const priorityIcon = document.createElement("img");
    priorityIcon.src = `icons/circle-${priority}.svg`;
    priorityIcon.alt = "Priority";
    priorityIcon.className = `priority-icon ${
      color !== "default" ? "colorful" : ""
    }`;
    priorityIcon.style.cssText =
      "width: 24px; height: 24px; margin: 0px 10px 5px 0px";

    // Insert before first edit icon
    const firstIcon = cardHeaderIcons.querySelector(".nav-icon");
    cardHeaderIcons.insertBefore(priorityIcon, firstIcon);
  }

  // Update date
  const currentDate = new Date().toLocaleDateString("de-DE");
  footerDate.textContent = `Zuletzt bearbeitet: ${currentDate}`;

  console.log("Note updated:", { title, content, color, priority });

  // Update calendar if it's visible
  if (
    document.getElementById("calendar-section").classList.contains("visible")
  ) {
    generateCalendar(
      currentCalendarDate.getFullYear(),
      currentCalendarDate.getMonth()
    );

    // Refresh selected date notes if a date is selected
    if (selectedDate) {
      showNotesForDate(selectedDate);
    }
  }
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
    const bgColor = noteElement.style.backgroundColor;
    if (bgColor.includes("131, 204, 22")) currentColor = "#83cc16d3";
    else if (bgColor.includes("250, 204, 21")) currentColor = "#facc15da";
    else if (bgColor.includes("225, 29, 68")) currentColor = "#e11d44d2";
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

// Function to delete a note
// Calendar functionality
// let currentCalendarDate = new Date();
// let selectedDate = null;

function initCalendar() {
  const calendarBtn = document.querySelector(".calendar-btn");
  const calendarSection = document.getElementById("calendar-section");
  const noteSection = document.getElementById("note-section");
  const lastEditedSection = document.getElementById("last-edited-section");

  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  // Toggle calendar view
  calendarBtn.addEventListener("click", function () {
    const isCalendarVisible = calendarSection.classList.contains("visible");

    if (isCalendarVisible) {
      // Hide calendar, show notes
      calendarSection.classList.remove("visible");
      calendarSection.classList.add("section-hidden");
      noteSection.classList.remove("section-hidden");
      noteSection.classList.add("visible");
      lastEditedSection.classList.remove("section-hidden");
      lastEditedSection.classList.add("visible");
    } else {
      // Show calendar, hide notes
      calendarSection.classList.remove("section-hidden");
      calendarSection.classList.add("visible");
      noteSection.classList.remove("visible");
      noteSection.classList.add("section-hidden");
      lastEditedSection.classList.remove("visible");
      lastEditedSection.classList.add("section-hidden");

      // Generate calendar for current month
      generateCalendar(
        currentCalendarDate.getFullYear(),
        currentCalendarDate.getMonth()
      );
    }
  });

  // Month navigation
  prevMonthBtn.addEventListener("click", function () {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    generateCalendar(
      currentCalendarDate.getFullYear(),
      currentCalendarDate.getMonth()
    );
  });

  nextMonthBtn.addEventListener("click", function () {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    generateCalendar(
      currentCalendarDate.getFullYear(),
      currentCalendarDate.getMonth()
    );
  });
}

// function generateCalendar(year, month) {
//   const calendarGrid = document.getElementById("calendarGrid");
//   const currentMonthSpan = document.getElementById("currentMonth");

//   const monthNames = [
//     "Januar",
//     "Februar",
//     "März",
//     "April",
//     "Mai",
//     "Juni",
//     "Juli",
//     "August",
//     "September",
//     "Oktober",
//     "November",
//     "Dezember",
//   ];

//   // Day names in German
//   const dayNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

//   // Update month display
//   currentMonthSpan.textContent = `${monthNames[month]} ${year}`;

//   // Clear calendar
//   calendarGrid.innerHTML = "";

//   // Add day headers
//   dayNames.forEach((day) => {
//     const dayHeader = document.createElement("div");
//     dayHeader.className = "calendar-day calendar-day-header";
//     dayHeader.textContent = day;
//     calendarGrid.appendChild(dayHeader);
//   });

//   // Get first day of month and number of days
//   const firstDay = new Date(year, month, 0);
//   const lastDay = new Date(year, month, 0);
//   const daysInMonth = lastDay.getDate();
//   const startDay = firstDay.getDay();

//   // Get notes data
//   const notesData = getNotesGroupedByDate();

//   // Add empty cells for days before the first day of the month
//   for (let i = 0; i < startDay; i++) {
//     const emptyDay = document.createElement("div");
//     emptyDay.className = "calendar-day other-month";
//     const prevMonth = new Date(year, month, 0);
//     const prevDay = prevMonth.getDate() - startDay;
//     emptyDay.textContent = prevDay;
//     calendarGrid.appendChild(emptyDay);
//   }

//   // Add days of the month
//   for (let day = 1; day <= daysInMonth; day++) {
//     const dayElement = document.createElement("div");
//     dayElement.className = "calendar-day";
//     dayElement.textContent = day;

//     const currentDate = new Date(year, month, day);
//     const dateKey = formatDateKey(currentDate);
//     const today = new Date();

//     // Check if it's today
//     if (currentDate.toDateString() === today.toDateString()) {
//       dayElement.classList.add("today");
//     }

//     // Check if this day has notes
//     if (notesData[dateKey] && notesData[dateKey].length > 0) {
//       dayElement.classList.add("has-notes");

//       // Add note count indicator
//       const noteCount = document.createElement("div");
//       noteCount.className = "note-count";
//       noteCount.textContent = notesData[dateKey].length;
//       dayElement.appendChild(noteCount);
//     }

//     // Add click event
//     dayElement.addEventListener("click", function () {
//       selectDate(currentDate);
//     });

//     calendarGrid.appendChild(dayElement);
//   }

//   // Add empty cells for days after the last day of the month
//   const remainingCells = 42 - (startDay + daysInMonth); // 6 rows * 7 days = 42
//   for (let i = 1; i <= remainingCells && i <= 14; i++) {
//     const emptyDay = document.createElement("div");
//     emptyDay.className = "calendar-day other-month";
//     emptyDay.textContent = i;
//     calendarGrid.appendChild(emptyDay);
//   }
// }

// function getNotesGroupedByDate() {
//   const notes = {};
//   const noteCards = document.querySelectorAll(".note-card");

//   noteCards.forEach((card) => {
//     const footerDate = card.querySelector(".footer-date");
//     if (footerDate) {
//       const dateText = footerDate.textContent;
//       const match = dateText.match(/(\d{2})\.(\d{2})\.(\d{4})/);

//       if (match) {
//         const [, day, month, year] = match;
//         const noteDate = new Date(year, month - 1, day);
//         const dateKey = formatDateKey(noteDate);

//         if (!notes[dateKey]) {
//           notes[dateKey] = [];
//         }

//         const title = card.querySelector("h2").textContent;
//         const content = card.querySelector("p").textContent;
//         const priorityIcon = card.querySelector(".priority-icon");
//         let priority = "none";

//         if (priorityIcon) {
//           const src = priorityIcon.src;
//           if (src.includes("red")) priority = "red";
//           else if (src.includes("yellow")) priority = "yellow";
//           else if (src.includes("green")) priority = "green";
//         }

//         notes[dateKey].push({
//           title,
//           content,
//           priority,
//           element: card,
//         });
//       }
//     }
//   });

//   return notes;
// }

// function formatDateKey(date) {
//   return `${date.getFullYear()}-${(date.getMonth() + 1)
//     .toString()
//     .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
// }

// function selectDate(date) {
//   selectedDate = date;

//   // Update selected day styling
//   document.querySelectorAll(".calendar-day").forEach((day) => {
//     day.classList.remove("selected");
//   });

//   const dayElements = document.querySelectorAll(".calendar-day");
//   dayElements.forEach((dayEl) => {
//     if (
//       dayEl.textContent == date.getDate() &&
//       !dayEl.classList.contains("other-month")
//     ) {
//       dayEl.classList.add("selected");
//     }
//   });

//   // Show notes for selected date
//   showNotesForDate(date);
// }

// function showNotesForDate(date) {
//   const selectedNotesContainer = document.getElementById("selectedDateNotes");
//   const dateKey = formatDateKey(date);
//   const notesData = getNotesGroupedByDate();
//   const notesForDate = notesData[dateKey] || [];

//   const dateString = date.toLocaleDateString("de-DE", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   if (notesForDate.length === 0) {
//     selectedNotesContainer.innerHTML = `
//       <p class="no-notes">Keine Notizen für ${dateString}</p>
//     `;
//   } else {
//     let notesHtml = `<h4 style="margin: 0 0 15px 0; color: #333;">${dateString}</h4>`;

//     notesForDate.forEach((note) => {
//       notesHtml += `
//         <div class="calendar-note-item priority-${note.priority}">
//           <div class="calendar-note-title">${note.title}</div>
//           <div class="calendar-note-content">${note.content}</div>
//         </div>
//       `;
//     });

//     selectedNotesContainer.innerHTML = notesHtml;
//   }
// }
// selectedNotesContainer.innerHTML = notesHtml;

// Settings functionality
function initSettings() {
  const settingsBtn = document.querySelector(".settings-btn");
  const settingsModal = document.getElementById("settingsModal");
  const closeSettingsModal = document.querySelector(".close-settings-modal");
  const cancelSettingsBtn = document.querySelector(".btn-cancel-settings");
  const resetSettingsBtn = document.querySelector(".btn-reset-settings");

  const darkModeToggle = document.getElementById("darkModeToggle");
  const compactModeToggle = document.getElementById("compactModeToggle");
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

  // Auto save toggle
  autoSaveToggle.addEventListener("change", function () {
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

function saveSettings() {
  const settings = {
    darkMode: document.getElementById("darkModeToggle").checked,
    compactMode: document.getElementById("compactModeToggle").checked,
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
    toggleCompactMode(settings.compactMode || false);

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
  document.getElementById("autoSaveToggle").checked = true;
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

    // Update calendar if it's visible
    if (
      document.getElementById("calendar-section").classList.contains("visible")
    ) {
      generateCalendar(
        currentCalendarDate.getFullYear(),
        currentCalendarDate.getMonth()
      );
    }
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

    // Update calendar if it's visible
    if (
      document.getElementById("calendar-section").classList.contains("visible")
    ) {
      generateCalendar(
        currentCalendarDate.getFullYear(),
        currentCalendarDate.getMonth()
      );
    }

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
