let notes = [];
const notesContainer = document.getElementById("notesContainer");
const addNoteBtn = document.getElementById("addNoteBtn");
const searchInput = document.getElementById("searchInput");

addNoteBtn.addEventListener("click", () => {
  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();

  if (title && content) {
    const note = { id: Date.now(), title, content };
    notes.push(note);
    renderNotes(notes);
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
  }
});

function renderNotes(noteList) {
  notesContainer.innerHTML = "";
  noteList.forEach(note => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button class="edit-btn" onclick="editNote(${note.id})">Edit</button>
      <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
    `;

    notesContainer.appendChild(noteDiv);
  });
}

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  renderNotes(notes);
}

function editNote(id) {
  const note = notes.find(note => note.id === id);
  if (note) {
    document.getElementById("noteTitle").value = note.title;
    document.getElementById("noteContent").value = note.content;
    deleteNote(id); // remove old note, re-add after editing
  }
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(query) ||
    note.content.toLowerCase().includes(query)
  );
  renderNotes(filteredNotes);
});
