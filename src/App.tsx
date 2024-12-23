import React, { useState } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
}

const NoteApp = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [unsavedNote, setUnsavedNote] = useState('');
  const [unsavedTitle, setUnsavedTitle] = useState('');
  const [openedNote, setOpenedNote] = useState<Note | null>(null);

  const handleCreateNote = () => {
    setIsCreatingNote(true);
  };

  const handleSaveNote = () => {
    const newNote: Note = {
      id: notes.length + 1,
      title: unsavedTitle,
      content: unsavedNote,
    };
    setNotes([...notes, newNote]);
    setIsCreatingNote(false);
    setUnsavedNote('');
    setUnsavedTitle('');
  };

  const handleDiscardNote = () => {
    setIsCreatingNote(false);
    setUnsavedNote('');
    setUnsavedTitle('');
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
    setOpenedNote(null);
  };

  const handleOpenNote = (note: Note) => {
    setOpenedNote(note);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search notes"
          className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleCreateNote}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      {isCreatingNote && (
        <div className="mb-4">
          <input
            type="text"
            value={unsavedTitle}
            onChange={(e) => setUnsavedTitle(e.target.value)}
            placeholder="Note title (optional)"
            className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-2"
          />
          <textarea
            value={unsavedNote}
            onChange={(e) => setUnsavedNote(e.target.value)}
            placeholder="Type your note here"
            className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={handleSaveNote}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={handleDiscardNote}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Discard
            </button>
          </div>
        </div>
      )}
      {openedNote && (
        <div className="mb-4">
          {openedNote.title && (
            <h2 className="text-lg font-bold mb-1">{openedNote.title}</h2>
          )}
          <p className="mb-4">{openedNote.content}</p>
          <button
            onClick={() => handleDeleteNote(openedNote.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      )}
      <ul>
        {filteredNotes.map((note) => (
          <li key={note.id} className="mb-2">
            <button
              onClick={() => handleOpenNote(note)}
              className="w-full text-left bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
            >
              {note.title && (
                <h2 className="text-lg font-bold mb-1">{note.title}</h2>
              )}
              {note.content.substring(0, 100)}...
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteApp;