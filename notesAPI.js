let demoNotes = [
  {
    id: 1762349350,
    title: "Einkaufsliste",
    content: "Milch, Brot, Eier, Butter, Käse",
    color: "#83cc16d3",
    priority: "yellow",
    createdAt: Date.now() - 1000000,
    updatedAt: Date.now() - 1000000,
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
    updatedAt: Date.now() - 2000000,
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
    updatedAt: Date.now() - 3000000,
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
    updatedAt: Date.now() - 4000000,
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
    updatedAt: Date.now() - 5000000,
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
    updatedAt: Date.now() - 6000000,
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
    updatedAt: Date.now() - 7000000,
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
    updatedAt: Date.now() - 8000000,
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
    updatedAt: Date.now() - 9000000,
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
    updatedAt: Date.now() - 10000000,
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
    updatedAt: Date.now() - 11000000,
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
    updatedAt: Date.now() - 12000000,
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
    updatedAt: Date.now() - 13000000,
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
    updatedAt: Date.now() - 14000000,
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
    updatedAt: Date.now() - 15000000,
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
    updatedAt: Date.now() - 16000000,
    archived: false,
    archivedAt: null,
  },
];

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

function deletefromStorage(noteInd) {
  if (noteInd > -1 && noteArray[noteInd]) {
    noteArray.splice(noteInd, 1);
    setArrayInStorage();
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

function findNoteIndex(noteElement) {
  const noteId = parseInt(noteElement.dataset.noteId);
  if (noteId) {
    const index = noteArray.findIndex((note) => note.id === noteId);
    if (index !== -1) return index;
  }

  return Array.from(noteElement.parentNode.children).indexOf(noteElement);
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

function filteredNotesByDate() {
  if (isNoteGridFiltered) {
    const sortedNotes = [...noteArray].sort(
      (a, b) => b.createdAt - a.createdAt && b.updatedAt - a.updatedAt
    );
    domCache.noteGrid.innerHTML = "";
    sortedNotes.forEach((note) => {
      if (!note.archived) {
        noteCard(note.title, note.content, note.color, note.priority, note.id);
      }
    });
  } else {
    const archivedNotes = [...noteArray].sort(
      (a, b) => b.archivedAt - a.archivedAt
    );
    domCache.archiveGrid.innerHTML = "";
    archivedNotes.forEach((note) => {
      if (note.archived == true) {
        createArchivedNoteCard(note);
      }
      console.log("Sorted Notes by Date:", archivedNotes);
    });
  }
}

function filteredNotesByColor() {
  const sortedNotes = [...noteArray].sort((a, b) => {
    const getColorOrder = (note) => {
      const isColorMatch =
        domCache.priorityColorMap[note.color] === note.priority;

      if (note.color === "#e11d44d2" && isColorMatch) return 1;
      if (note.color === "#e11d44d2") return 2;
      if (note.color === "#facc15da" && isColorMatch) return 3;
      if (note.color === "#facc15da") return 4;
      if (note.color === "#83cc16d3" && isColorMatch) return 5;
      if (note.color === "#83cc16d3") return 6;
      return 7;
    };

    return getColorOrder(a) - getColorOrder(b);
  });

  if (isNoteGridFiltered) {
    domCache.noteGrid.innerHTML = "";
    sortedNotes.forEach((note) => {
      if (!note.archived) {
        noteCard(note.title, note.content, note.color, note.priority, note.id);
      }
    });
  } else {
    domCache.archiveGrid.innerHTML = "";
    sortedNotes.forEach((note) => {
      if (note.archived) {
        createArchivedNoteCard(note);
      }
    });
  }
  console.log("Sorted Notes by Color:", sortedNotes);
}

function filteredNotesByPriority() {
  const sortedNotes = [...noteArray].sort((a, b) => {
    const getPriorityOrder = (note) => {
      const isBackgroundMatch = domCache.colorMap[note.color] === note.color;
      const isColorMatch =
        domCache.priorityColorMap[note.color] === note.priority;

      if (note.priority === "red" && isColorMatch) return 1;
      if (note.priority === "red") return 2;
      if (note.priority === "yellow" && isColorMatch) return 3;
      if (note.priority === "yellow") return 4;
      if (note.priority === "green" && isColorMatch) return 5;
      if (note.priority === "green") return 6;
      return 7;
    };

    return getPriorityOrder(a) - getPriorityOrder(b);
  });

  if (isNoteGridFiltered) {
    domCache.noteGrid.innerHTML = "";
    sortedNotes.forEach((note) => {
      if (!note.archived) {
        noteCard(note.title, note.content, note.color, note.priority, note.id);
      }
    });
  } else {
    domCache.archiveGrid.innerHTML = "";
    sortedNotes.forEach((note) => {
      if (note.archived) {
        createArchivedNoteCard(note);
      }
    });
  }
}
