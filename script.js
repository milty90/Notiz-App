let noteArray = [];
let noteToDelete = null;
let noteToArchive = null;
let currentView = "note";

const domCache = {
  noteGrid: null,
  archiveGrid: null,
  lastEditedGrid: null,

  noteSection: null,
  archiveSection: null,

  archiveBtn: null,
  notesBtn: null,
  searchToggle: null,
  searchInput: null,
  searchIcon: null,

  addModal: null,
  editModal: null,
  deleteModal: null,
  infoModal: null,
  settingsModal: null,

  addNoteBtn: null,
  infoBtn: null,
  settingsBtn: null,

  colorMap: {
    "#83cc16d3": "color-green",
    "#facc15da": "color-yellow",
    "#e11d44d2": "color-red",
  },

  priorityColorMap: {
    "#83cc16d3": "green",
    "#facc15da": "yellow",
    "#e11d44d2": "red",
  },

  init() {
    this.noteGrid = document.querySelector(".note-grid");
    this.archiveGrid = document.querySelector(".archive-grid");
    this.lastEditedGrid = document.querySelector(".last-edited-grid");

    this.noteSection = document.getElementById("note-section");
    this.archiveSection = document.getElementById("archive-section");

    this.archiveBtn = document.querySelector(".archive-btn");
    this.notesBtn = document.querySelector(".notes-btn");
    this.searchToggle = document.querySelector(".search-toggle");
    this.searchInput = document.querySelector(".search-input");
    this.searchIcon = document.querySelector(".search-icon");

    this.addModal = document.getElementById("addNoteModal");
    this.editModal = document.getElementById("editNoteModal");
    this.deleteModal = document.getElementById("deleteNoteModal");
    this.infoModal = document.getElementById("infoModal");
    this.settingsModal = document.getElementById("settingsModal");

    this.addNoteBtn = document.querySelector(".add-note-btn");
    this.infoBtn = document.querySelector(".info-btn");
    this.settingsBtn = document.querySelector(".settings-btn");
  },
};

let demoNotes = [
  {
    id: 1762349350,
    title: "Einkaufsliste",
    content: "Milch, Brot, Eier, Butter, Käse",
    color: "#83cc16d3",
    priority: "yellow",
    createdAt: Date.now() - 1000000,
    updatedAt: Date.now() - 500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349351,
    title: "Projektideen",
    content: "Notiz-App, Wetter-App, ToDo-Liste",
    color: "#facc15da",
    priority: "green",
    createdAt: Date.now() - 2000000,
    updatedAt: Date.now() - 1500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349352,
    title: "Reiseplanung",
    content: "Flüge buchen, Hotel reservieren",
    color: "#e11d44d2",
    priority: "green",
    createdAt: Date.now() - 3000000,
    updatedAt: Date.now() - 2500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349353,
    title: "Fitness Ziele",
    content: "3x die Woche ins Fitnessstudio, gesunde Ernährung",
    color: "#83cc16d3",
    priority: "yellow",
    createdAt: Date.now() - 4000000,
    updatedAt: Date.now() - 3500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349354,
    title: "Lernziele",
    content: "JavaScript, TypeScript, Webentwicklung",
    color: "#facc15da",
    priority: "yellow",
    createdAt: Date.now() - 5000000,
    updatedAt: Date.now() - 4500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349355,
    title: "Bücherliste",
    content: "Clean Code",
    color: "#e11d44d2",
    priority: "red",
    createdAt: Date.now() - 6000000,
    updatedAt: Date.now() - 5500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349356,
    title: "Urlaubsplanung",
    content: "Reiseziele, Budget, Aktivitäten",
    color: "default",
    priority: "green",
    createdAt: Date.now() - 7000000,
    updatedAt: Date.now() - 6500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349357,
    title: "Hausarbeiten",
    content: "Küche putzen, Staubsaugen, Wäsche waschen",
    color: "#facc15da",
    priority: "yellow",
    createdAt: Date.now() - 8000000,
    updatedAt: Date.now() - 7500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349358,
    title: "Geburtstagsgeschenke",
    content: "Geschenkideen für Familie und Freunde",
    color: "#e11d44d2",
    priority: "yellow",
    createdAt: Date.now() - 9000000,
    updatedAt: Date.now() - 8500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349359,
    title: "Wochenplan",
    content: "Montag: Einkaufen, Dienstag: Sport, Mittwoch: Kochen",
    color: "default",
    priority: "red",
    createdAt: Date.now() - 10000000,
    updatedAt: Date.now() - 9500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349360,
    title: "Meditationsübungen",
    content: "Täglich 10 Minuten Achtsamkeitspraxis",
    color: "default",
    priority: "none",
    createdAt: Date.now() - 11000000,
    updatedAt: Date.now() - 10500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349361,
    title: "Sprachlernziele",
    content: "Täglich 15 Minuten Vokabeln lernen",
    color: "#83cc16d3",
    priority: "green",
    createdAt: Date.now() - 12000000,
    updatedAt: Date.now() - 11500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349362,
    title: "Gartenarbeit",
    content: "Pflanzen gießen, Rasen mähen",
    color: "#e11d44d2",
    priority: "none",
    createdAt: Date.now() - 13000000,
    updatedAt: Date.now() - 12500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349363,
    title: "Musikplaylist",
    content: "Meine Lieblingssongs für gute Laune",
    color: "#facc15da",
    priority: "yellow",
    createdAt: Date.now() - 14000000,
    updatedAt: Date.now() - 13500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349364,
    title: "Film- und Serienliste",
    content: "Must-Watch Filme und Serien",
    color: "default",
    priority: "none",
    createdAt: Date.now() - 15000000,
    updatedAt: Date.now() - 14500000,
    archived: false,
    archivedAt: null,
  },
  {
    id: 1762349365,
    title: "Hobbyideen",
    content: "Fotografie, Malen, Kochen",
    color: "#83cc16d3",
    priority: "green",
    createdAt: Date.now() - 16000000,
    updatedAt: Date.now() - 15500000,
    archived: false,
    archivedAt: null,
  },
];

// Zuletzt bearbeitet Sektion
function updateLastEditedSection() {
  domCache.lastEditedGrid.innerHTML = "";

  // Notizen nach updatedAt sortieren (neueste zuerst)
  const sortedNotes = [...noteArray].sort((a, b) => b.updatedAt - a.updatedAt);

  // Nur die ersten 4 Notizen anzeigen
  const recentNotes = sortedNotes.slice(0, 4);

  recentNotes.forEach((note) => {
    if (!note.archived) {
      createLastEditedNoteCard(note);
    }
  });
}
function createLastEditedNoteCard(note) {
  const noteCard = document.createElement("div");
  noteCard.classList.add("note-card");
  noteCard.dataset.noteId = note.id;
  noteCard.id = `recent-${note.id}`;

  // Hintergrundfarbe setzen
  if (note.color !== "default") {
    noteCard.classList.add("colorful");
    if (domCache.colorMap[note.color]) {
      noteCard.classList.add(domCache.colorMap[note.color]);
    }
  }

  const header = document.createElement("div");
  header.classList.add("card-header");

  const titleElem = document.createElement("h2");
  titleElem.textContent = note.title;

  const iconsDiv = document.createElement("div");
  iconsDiv.classList.add("card-header-icons");

  // Prioritäts-Icon
  if (note.priority !== "none") {
    const priorityIcon = document.createElement("img");
    const selectedColorName = domCache.priorityColorMap[note.color];
    const isColorAndPriorityMatch =
      selectedColorName && selectedColorName === note.priority;

    if (isColorAndPriorityMatch) {
      priorityIcon.src = `icons/clock.svg`;
    } else {
      priorityIcon.src = `icons/${note.priority}.svg`;
    }

    priorityIcon.alt = "Priority";
    priorityIcon.classList.add("priority-icon");
    if (note.color !== "default") priorityIcon.classList.add("colorful");
    iconsDiv.appendChild(priorityIcon);
  }

  const editIcon = document.createElement("img");
  editIcon.id = `editNote`;
  editIcon.src = "icons/pencil.svg";
  editIcon.alt = "Edit";
  editIcon.classList.add("nav-icon");
  if (note.color !== "default") editIcon.classList.add("colorful");
  editIcon.addEventListener("click", () => {
    // Zuerst in aktiven Notizen suchen
    let originalNoteCard = document.querySelector(`#note-${note.id}`);
    // Falls nicht gefunden, in archivierten Notizen suchen
    if (!originalNoteCard) {
      originalNoteCard = document.querySelector(`#archived-${note.id}`);
    }
    // Falls immer noch nicht gefunden, das "recent" Element verwenden
    if (!originalNoteCard) {
      originalNoteCard = document.querySelector(`#recent-${note.id}`);
    }
    if (originalNoteCard) {
      openEditModal(originalNoteCard);
    }
  });

  const deleteIcon = document.createElement("img");
  deleteIcon.id = `deleteNote`;
  deleteIcon.src = "icons/trash-repo.svg";
  deleteIcon.alt = "Delete";
  deleteIcon.classList.add("nav-icon");
  if (note.color !== "default") deleteIcon.classList.add("colorful");
  deleteIcon.addEventListener("click", () => {
    // Zuerst in aktiven Notizen suchen
    let originalNoteCard = document.querySelector(`#note-${note.id}`);
    // Falls nicht gefunden, in archivierten Notizen suchen
    if (!originalNoteCard) {
      originalNoteCard = document.querySelector(`#archived-${note.id}`);
    }
    // Falls immer noch nicht gefunden, in "Zuletzt bearbeitet" suchen
    if (!originalNoteCard) {
      originalNoteCard = document.querySelector(`#recent-${note.id}`);
    }
    if (originalNoteCard) {
      deleteNote(originalNoteCard);
    }
  });

  iconsDiv.append(editIcon, deleteIcon);
  header.append(titleElem, iconsDiv);

  const contentElem = document.createElement("p");
  contentElem.textContent =
    note.content.length > 50
      ? note.content.substring(0, 50) + "..."
      : note.content;

  const footer = document.createElement("div");
  footer.classList.add("card-footer");

  const dateElem = document.createElement("span");
  dateElem.classList.add("footer-date");
  if (note.color !== "default") dateElem.classList.add("colorful");

  const updateDate = new Date(note.updatedAt);
  const formattedDate = updateDate.toLocaleDateString("de-DE");
  const formattedTime = updateDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Zeige "Zuletzt bearbeitet" nur wenn es sich vom Erstellungsdatum unterscheidet
  if (note.updatedAt !== note.createdAt) {
    dateElem.textContent = `Zuletzt bearbeitet: ${formattedTime}, ${formattedDate}`;
  } else {
    const createdDate = new Date(note.createdAt);
    const createdFormattedDate = createdDate.toLocaleDateString("de-DE");
    const createdFormattedTime = createdDate.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    dateElem.textContent = `Erstellt am: ${createdFormattedTime}, ${createdFormattedDate}`;
  }

  footer.appendChild(dateElem);

  noteCard.append(header, contentElem, footer);
  domCache.lastEditedGrid.appendChild(noteCard);
}

function createArchivedNoteCard(note) {
  const noteCard = document.createElement("div");
  noteCard.classList.add("note-card");
  noteCard.classList.add("archived");
  noteCard.dataset.noteId = note.id;
  noteCard.id = `archived-${note.id}`;

  // Hintergrundfarbe setzen
  if (note.color !== "default") {
    noteCard.classList.add("colorful");
    if (domCache.colorMap[note.color]) {
      noteCard.classList.add(domCache.colorMap[note.color]);
    }
  }

  const header = document.createElement("div");
  header.classList.add("card-header");

  const titleElem = document.createElement("h2");
  titleElem.textContent = note.title;

  const iconsDiv = document.createElement("div");
  iconsDiv.classList.add("card-header-icons");

  // Prioritäts-Icon
  if (note.priority !== "none") {
    const priorityIcon = document.createElement("img");
    const selectedColorName = domCache.priorityColorMap[note.color];
    const isColorAndPriorityMatch =
      selectedColorName && selectedColorName === note.priority;

    if (isColorAndPriorityMatch) {
      priorityIcon.src = `icons/clock.svg`;
    } else {
      priorityIcon.src = `icons/${note.priority}.svg`;
    }

    priorityIcon.alt = "Priority";
    priorityIcon.classList.add("priority-icon");
    if (note.color !== "default") priorityIcon.classList.add("colorful");
    iconsDiv.appendChild(priorityIcon);
  }

  const editIcon = document.createElement("img");
  editIcon.id = `editNote`;
  editIcon.src = "icons/pencil.svg";
  editIcon.alt = "Edit";
  editIcon.classList.add("nav-icon");
  if (note.color !== "default") editIcon.classList.add("colorful");
  editIcon.addEventListener("click", () => {
    openEditModal(noteCard);
  });

  const deleteIcon = document.createElement("img");
  deleteIcon.id = `deleteNote`;
  deleteIcon.src = "icons/trash-repo.svg";
  deleteIcon.alt = "Delete";
  deleteIcon.classList.add("nav-icon");
  if (note.color !== "default") deleteIcon.classList.add("colorful");
  deleteIcon.addEventListener("click", () => {
    deleteNote(noteCard);
  });

  iconsDiv.append(editIcon, deleteIcon);
  header.append(titleElem, iconsDiv);

  const contentElem = document.createElement("p");
  contentElem.textContent =
    note.content.length > 50
      ? note.content.substring(0, 50) + "..."
      : note.content;

  const footer = document.createElement("div");
  footer.classList.add("card-footer");

  const dateElem = document.createElement("span");
  dateElem.classList.add("footer-date");
  if (note.color !== "default") dateElem.classList.add("colorful");

  const updateDate = new Date(note.updatedAt);
  const formattedDate = updateDate.toLocaleDateString("de-DE");
  const formattedTime = updateDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Zeige Archivierungsdatum für archivierte Notizen
  if (note.archivedAt) {
    const archivedDate = new Date(note.archivedAt);
    const archivedFormattedDate = archivedDate.toLocaleDateString("de-DE");
    const archivedFormattedTime = archivedDate.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    dateElem.textContent = `Archiviert am: ${archivedFormattedTime}, ${archivedFormattedDate}`;
  } else {
    // Zeige letztes Update-Datum
    dateElem.textContent = `Zuletzt bearbeitet: ${formattedTime}, ${formattedDate}`;
  }

  footer.appendChild(dateElem);

  noteCard.append(header, contentElem, footer);
  domCache.archiveGrid.appendChild(noteCard);
}

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

function initArchivedNotes() {
  const existingArchivedNotes = document.querySelectorAll(
    ".archive-grid .note-card"
  );

  existingArchivedNotes.forEach((archiveCard) => {
    const editBtn = archiveCard.querySelector("#editNote");
    const deleteBtn = archiveCard.querySelector("#deleteNote");

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

function initModal() {
  const addNoteForm = document.getElementById("addNoteForm");
  const editNoteForm = document.getElementById("editNoteForm");

  const closeAddModal = document.querySelector(".close-modal");
  const closeEditModal = document.querySelector(".close-edit-modal");
  const closeDeleteModal = document.querySelector(".close-delete-modal");
  const closeInfoModal = document.querySelector(".close-info-modal");

  const cancelAddBtn = document.querySelector(".btn-cancel");
  const cancelEditBtn = document.querySelector(".btn-cancel-edit");
  const cancelDeleteBtn = document.querySelector(".btn-cancel-delete");

  const demoNotesBtn = document.querySelector("#demoNotesBtn");
  const archiveButton = document.querySelector(".btn-archive-delete");

  // Öffne das ADD-Modal, wenn die Schaltfläche "Hinzufügen" geklickt wird
  domCache.addNoteBtn.addEventListener("click", function () {
    domCache.addModal.classList.add("show");
    document.body.classList.add("modal-open");
  });

  // Öffne das INFO-Modal, wenn die Schaltfläche "Info" geklickt wird
  domCache.infoBtn.addEventListener("click", function () {
    domCache.infoModal.classList.add("show");
    document.body.classList.add("modal-open");
  });

  // Schließe Modal-Funktionen
  function closeAddModalWindow() {
    domCache.addModal.classList.remove("show");
    document.body.classList.remove("modal-open");
    addNoteForm.reset();
  }

  function closeEditModalWindow() {
    domCache.editModal.classList.remove("show");
    document.body.classList.remove("modal-open");
    editNoteForm.reset();
  }

  function closeDeleteModalWindow() {
    domCache.deleteModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  function closeInfoModalWindow() {
    domCache.infoModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  // Schließe Modal Events

  closeAddModal.addEventListener("click", closeAddModalWindow);
  cancelAddBtn.addEventListener("click", closeAddModalWindow);

  closeEditModal.addEventListener("click", closeEditModalWindow);
  cancelEditBtn.addEventListener("click", closeEditModalWindow);

  closeDeleteModal.addEventListener("click", closeDeleteModalWindow);
  cancelDeleteBtn.addEventListener("click", closeDeleteModalWindow);

  closeInfoModal.addEventListener("click", closeInfoModalWindow);

  // Schließe Modals wenn außerhalb des Modals geklickt wird
  window.addEventListener("click", function (event) {
    if (event.target === domCache.addModal) {
      closeAddModalWindow();
    }
    if (event.target === domCache.editModal) {
      closeEditModalWindow();
    }
    if (event.target === domCache.deleteModal) {
      closeDeleteModalWindow();
    }
    if (event.target === domCache.infoModal) {
      closeInfoModalWindow();
    }
  });

  // Schließe Modals bei Escape-Taste
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (domCache.addModal.classList.contains("show")) {
        closeAddModalWindow();
      }
      if (domCache.editModal.classList.contains("show")) {
        closeEditModalWindow();
      }
      if (domCache.deleteModal.classList.contains("show")) {
        closeDeleteModalWindow();
      }
      if (domCache.infoModal.classList.contains("show")) {
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
    event.preventDefault();

    const title = document.getElementById("editNoteTitle").value;
    const content = document.getElementById("editNoteContent").value;
    const color = document.querySelector(
      'input[name="editNoteColor"]:checked'
    ).value;
    const priority = document.getElementById("editNotePriority").value;

    // Notiz aktualisieren
    const currentNote = domCache.editModal.currentNoteElement;
    if (currentNote) {
      updateNote(currentNote, title, content, color, priority);
    }

    // Modal schließen
    domCache.editModal.classList.remove("show");
    document.body.classList.remove("modal-open");
    editNoteForm.reset();
  });
  demoNotesBtn.addEventListener("click", function () {
    getDemoNotes();
    closeInfoModalWindow();
  });
  archiveButton.addEventListener("click", function () {
    try {
      archiveNote(noteToDelete);
    } catch (error) {
      console.error("Fehler beim Archivieren der Notiz:", error);
    }
    initArchivedNotes();
    toggleMainView();
    closeDeleteModalWindow();
  });
}

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

function createNewNote(title, content, color, priority) {
  const noteId = Date.now();
  noteCard(title, content, color, priority, noteId);

  noteArray.push({
    id: noteId,
    title: title,
    content: content,
    color: color,
    priority: priority,
    createdAt: noteId,
    updatedAt: noteId,
    archived: false,
    archivedAt: null,
  });

  setArrayInStorage();
  updateLastEditedSection();
}

function updateNote(noteElement, title, content, color, priority) {
  noteElement.querySelector("h2").textContent = title;
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
    if (domCache.colorMap[color]) {
      noteElement.classList.add(domCache.colorMap[color]);
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

    const selectedColorName = domCache.priorityColorMap[color];
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
  const formatedTime = currentDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  footerDate.textContent = `Zuletzt aktualisiert: ${formatedTime}  ${formatedDate}`;

  // Notiz im Array aktualisieren

  const noteId = parseInt(noteElement.dataset.noteId);
  const noteIndex = noteArray.findIndex((note) => note.id === noteId);

  if (noteIndex > -1 && noteIndex < noteArray.length && noteArray[noteIndex]) {
    noteArray[noteIndex].title = title;
    noteArray[noteIndex].content = content;
    noteArray[noteIndex].color = color;
    noteArray[noteIndex].priority = priority;
    noteArray[noteIndex].updatedAt = Date.now();
  }

  setArrayInStorage();
  updateLastEditedSection();
}

// Funktion zum Öffnen des Bearbeitungsmodals
function openEditModal(noteElement) {
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
  domCache.editModal.dataset.currentNote =
    noteElement.dataset.noteId ||
    Array.from(noteElement.parentNode.children).indexOf(noteElement);
  domCache.editModal.currentNoteElement = noteElement;

  // Bearbeitungsmodal anzeigen
  domCache.editModal.classList.add("show");
  document.body.classList.add("modal-open");
}

function initSettings() {
  const closeSettingsModal = document.querySelector(".close-settings-modal");
  const cancelSettingsBtn = document.querySelector(".btn-cancel-settings");
  const resetSettingsBtn = document.querySelector(".btn-reset-settings");

  const darkModeToggle = document.getElementById("darkModeToggle");
  const compactModeToggle = document.getElementById("compactModeToggle");
  const menuBarToggle = document.getElementById("menuBarToggle");
  const confirmDeleteToggle = document.getElementById("confirmDeleteToggle");

  loadSettings();

  domCache.settingsBtn.addEventListener("click", function () {
    domCache.settingsModal.classList.add("show");
    document.body.classList.add("modal-open");
  });

  function closeSettingsModalWindow() {
    domCache.settingsModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  closeSettingsModal.addEventListener("click", closeSettingsModalWindow);
  cancelSettingsBtn.addEventListener("click", closeSettingsModalWindow);

  window.addEventListener("click", function (event) {
    if (event.target === domCache.settingsModal) {
      closeSettingsModalWindow();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      domCache.settingsModal.classList.contains("show")
    ) {
      closeSettingsModalWindow();
    }
  });

  darkModeToggle.addEventListener("change", function () {
    toggleDarkMode(this.checked);
    saveSettings();
  });

  compactModeToggle.addEventListener("change", function () {
    toggleCompactMode(this.checked);
    saveSettings();
  });

  menuBarToggle.addEventListener("change", function () {
    toggleMenuBar(this.checked);
    saveSettings();
  });

  confirmDeleteToggle.addEventListener("change", function () {
    saveSettings();
  });

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
  if (enabled) {
    document.body.classList.add("compact-mode");
  } else {
    document.body.classList.remove("compact-mode");
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

function toggleMainView() {
  if (currentView === "note") {
    currentView = "archive";
    showArchivedNotes();
    updateNavbarState("archive");
  } else {
    currentView = "note";
    showActiveNotes();
    updateNavbarState("note");
  }
}

function saveSettings() {
  try {
    const settings = {
      darkMode: document.getElementById("darkModeToggle").checked,
      compactMode: document.getElementById("compactModeToggle").checked,
      menuBar: document.getElementById("menuBarToggle").checked,
      confirmDelete: document.getElementById("confirmDeleteToggle").checked,
    };
    localStorage.setItem("notizAppSettings", JSON.stringify(settings));
  } catch (error) {
    console.error(error);
  }
}

function loadSettings() {
  const savedSettings = localStorage.getItem("notizAppSettings");

  if (savedSettings) {
    try {
      const settings = JSON.parse(savedSettings);

      // Dunkelmodus anwenden
      document.getElementById("darkModeToggle").checked =
        settings.darkMode || false;
      toggleDarkMode(settings.darkMode || false);

      // Kompaktmodus anwenden
      document.getElementById("compactModeToggle").checked =
        settings.compactMode || false;
      toggleCompactMode(settings.compactMode || false);

      // Menüleiste anwenden
      document.getElementById("menuBarToggle").checked =
        settings.menuBar || false;
      toggleMenuBar(settings.menuBar || false);

      // Löschen-bestätigen anwenden
      document.getElementById("confirmDeleteToggle").checked =
        settings.confirmDelete !== undefined ? settings.confirmDelete : true;
    } catch (error) {
      console.error(
        "Fehler beim Parsen der gespeicherten Einstellungen:",
        error
      );
    }
  }
}

function resetSettings() {
  // Auf Standardwerte zurücksetzen
  document.getElementById("darkModeToggle").checked = false;
  document.getElementById("compactModeToggle").checked = false;
  document.getElementById("menuBarToggle").checked = false;
  document.getElementById("confirmDeleteToggle").checked = true;

  // Einstellungen anwenden
  toggleDarkMode(false);
  toggleCompactMode(false);
  toggleMenuBar(false);

  // In localStorage speichern
  saveSettings();

  console.log("Einstellungen auf Standard zurückgesetzt");
}

function noteCard(title, content, color, priority, noteId = null) {
  const noteCard = document.createElement("div");

  // ID für die Notiz festlegen
  const id = noteId || Date.now();
  noteCard.id = `note-${id}`;
  noteCard.dataset.noteId = id;

  const priorityIcon = document.createElement("img");
  noteCard.classList.add("note-card");

  // Hintergrundfarbe setzen
  if (color !== "default") {
    noteCard.classList.add("colorful");
    if (domCache.colorMap[color]) {
      noteCard.classList.add(domCache.colorMap[color]);
    }
  }
  // Prioritätsicon hinzufügen
  // Prüfen ob Farbe und Priorität übereinstimmen (z.B. grüne Farbe + grüne Priorität)
  const selectedColorName = domCache.priorityColorMap[color];
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

  const note = noteArray.find((n) => n.id === id);
  const createdDate = note ? new Date(note.createdAt) : new Date();
  const formatedDate = createdDate.toLocaleDateString("de-DE");
  const formatedTime = createdDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const header = document.createElement("div");
  header.classList.add("card-header");

  const titleElem = document.createElement("h2");
  titleElem.textContent = title;

  const iconsDiv = document.createElement("div");
  iconsDiv.classList.add("card-header-icons");

  // PRIORITY icon (wenn priority gesetzt ist)
  if (priority !== "none") {
    iconsDiv.appendChild(priorityIcon);
  }

  const editIcon = document.createElement("img");
  editIcon.id = `editNote`;
  editIcon.src = "icons/pencil.svg";
  editIcon.alt = "Edit";
  editIcon.classList.add("nav-icon");
  if (color !== "default") editIcon.classList.add("colorful");
  editIcon.addEventListener("click", () => {
    openEditModal(noteCard);
  });

  const deleteIcon = document.createElement("img");
  deleteIcon.id = `deleteNote`;
  deleteIcon.src = "icons/trash-repo.svg";
  deleteIcon.alt = "Delete";
  deleteIcon.classList.add("nav-icon");
  if (color !== "default") deleteIcon.classList.add("colorful");
  deleteIcon.addEventListener("click", () => {
    deleteNote(noteCard);
  });

  iconsDiv.append(editIcon, deleteIcon);

  header.append(titleElem, iconsDiv);

  const contentElem = document.createElement("p");
  contentElem.textContent = content;

  const footer = document.createElement("div");
  footer.classList.add("card-footer");

  const dateElem = document.createElement("span");
  dateElem.classList.add("footer-date");
  if (color !== "default") dateElem.classList.add("colorful");
  dateElem.textContent = `Erstellt am: ${formatedTime},  ${formatedDate}`;

  footer.appendChild(dateElem);

  noteCard.append(header, contentElem, footer);
  domCache.noteGrid.appendChild(noteCard);
}

function deleteNote(noteElement) {
  const confirmDelete = document.getElementById("confirmDeleteToggle").checked;
  const deleteModal = document.getElementById("deleteNoteModal");

  if (!confirmDelete) {
    // Wenn Bestätigung deaktiviert ist, sofort löschen
    const noteIndex = findNoteIndex(noteElement);
    noteElement.remove();
    deletefromStorage(noteIndex);
    updateLastEditedSection();
  } else {
    // Bestätigungsmodal anzeigen
    noteToDelete = noteElement;
    deleteModal.classList.add("show");
    document.body.classList.add("modal-open");
  }
}

function findNoteIndex(noteElement) {
  const noteId = parseInt(noteElement.dataset.noteId);
  if (noteId) {
    const index = noteArray.findIndex((note) => note.id === noteId);
    if (index !== -1) return index;
  }

  return Array.from(noteElement.parentNode.children).indexOf(noteElement);
}

function archiveNote(noteElement) {
  const noteIndex = findNoteIndex(noteElement);

  if (noteIndex > -1 && noteArray[noteIndex]) {
    noteArray[noteIndex].archived = true;
    noteArray[noteIndex].archivedAt = Date.now();

    noteElement.remove();
    setArrayInStorage();
    updateLastEditedSection();

    console.log("Notiz archiviert");
  }
}

function confirmDelete() {
  if (noteToDelete) {
    // Index der Notiz im Array finden vor dem Entfernen
    const noteIndex = findNoteIndex(noteToDelete);

    noteToDelete.remove();
    console.log("Notiz gelöscht");

    deletefromStorage(noteIndex);

    // Zurücksetzen und Modal schließen
    noteToDelete = null;
    document.getElementById("deleteNoteModal").classList.remove("show");
    document.body.classList.remove("modal-open");

    updateLastEditedSection();
  }
}

function deletefromStorage(noteInd) {
  if (noteInd > -1 && noteArray[noteInd]) {
    noteArray.splice(noteInd, 1);
    setArrayInStorage();
  }
}

function setArrayInStorage() {
  try {
    localStorage.setItem("notes", JSON.stringify(noteArray));
  } catch (error) {
    console.error(error);
  }
}

function loadNotesFromStorage() {
  const savedNotes = localStorage.getItem("notes");

  if (savedNotes) {
    noteArray = JSON.parse(savedNotes);
    noteArray
      .filter((note) => !note.archived)
      .forEach((note) => {
        noteCard(note.title, note.content, note.color, note.priority, note.id);
      });

    updateLastEditedSection();
  }
}

function getDemoNotes() {
  try {
    const existingSettings = localStorage.getItem("notizAppSettings");

    localStorage.setItem("notes", JSON.stringify(demoNotes));

    if (existingSettings) {
      localStorage.setItem("notizAppSettings", existingSettings);
    }

    // Aktualisiere die Anzeige
    noteArray = [];
    if (domCache.noteGrid) {
      domCache.noteGrid.innerHTML = "";
    }
    loadNotesFromStorage();
  } catch (error) {
    console.error(error);
  }
}

function showActiveNotes() {
  domCache.noteSection.style.display = "block";
  domCache.archiveSection.style.display = "none";
  domCache.noteGrid.innerHTML = "";

  noteArray
    .filter((note) => !note.archived)
    .forEach((note) =>
      noteCard(note.title, note.content, note.color, note.priority, note.id)
    );

  updateLastEditedSection();
}

function showArchivedNotes() {
  domCache.noteSection.style.display = "none";
  domCache.archiveSection.style.display = "block";
  domCache.archiveGrid.innerHTML = "";

  noteArray
    .filter((note) => note.archived)
    .forEach((note) => createArchivedNoteCard(note));
}

function updateNavbarState(view) {
  if (view === "archive") {
    domCache.archiveBtn.classList.add("active");
    domCache.notesBtn.classList.remove("active");
  } else {
    domCache.notesBtn.classList.add("active");
    domCache.archiveBtn.classList.remove("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  domCache.init();

  let isSearchOpen = false;

  domCache.notesBtn.addEventListener("click", function () {
    currentView = "note";
    showActiveNotes();
    updateNavbarState("note");
  });

  domCache.archiveBtn.addEventListener("click", function () {
    currentView = "archive";
    showArchivedNotes();
    updateNavbarState("archive");
  });

  // Suchleiste bei Icon-Klick umschalten
  domCache.searchToggle.addEventListener("click", function () {
    isSearchOpen = !isSearchOpen;

    if (isSearchOpen) {
      domCache.searchInput.classList.add("active");
      domCache.searchInput.focus();
      domCache.searchIcon.classList.toggle("rotate");
    } else {
      domCache.searchInput.classList.remove("active");
      domCache.searchInput.blur();
      domCache.searchIcon.classList.remove("rotate");
      domCache.searchInput.value = "";
    }
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".search-container") && isSearchOpen) {
      isSearchOpen = false;
      domCache.searchInput.classList.remove("active");
      domCache.searchInput.blur();
      domCache.searchIcon.classList.remove("rotate");
      domCache.searchInput.value = "";
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isSearchOpen) {
      isSearchOpen = false;
      domCache.searchInput.classList.remove("active");
      domCache.searchInput.blur();
      domCache.searchIcon.classList.remove("rotate");
      domCache.searchInput.value = "";
    }
  });

  domCache.searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    console.log("Suchbegriff:", searchTerm);

    filterNotes(searchTerm);
  });

  domCache.archiveSection.style.display = "none";

  initModal();

  initSettings();

  currentView = "note";

  loadNotesFromStorage();
  updateNavbarState("note");

  initExistingNotes();

  initArchivedNotes();

  // Event-Listener für Löschmodal initialisieren
  const confirmDeleteBtn = document.querySelector(".btn-confirm-delete");
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", confirmDelete);
  }
});
