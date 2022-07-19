import { Editor } from '@tiptap/react';
import { getFromStorage, emptyNote, setStorage } from '@utils/storage';
import { Button } from '@components/Elements';
import { Note } from '@utils/types/Note';
import { useTab } from '../../../../provider/tabContext';
import Save from '@icons/Save.svg';

export const SaveNote = ({ editor, currentNote }: { editor: Editor; currentNote?: Note }) => {
  const { dispatch } = useTab();
  const saveNoteHandler = async () => {
    if (editor.getText().trim() === '') {
      return;
    }
    const notes = await getFromStorage('notes');

    if (currentNote && currentNote.id && notes) {
      // update note
      const findNoteIndex = notes.findIndex((note) => note.id === currentNote.id);
      notes.splice(findNoteIndex, 1, { ...currentNote, noteContent: editor.getJSON() });
      setStorage({ notes, currentNote: emptyNote });
      editor.commands.clearContent();
    } else {
      // create new note
      createNewNoteHandler(notes);
    }
    dispatch({ type: 'TAB_HANDLER', payload: 1 }); // go to notes folder
  };

  const createNewNoteHandler = (notes?: Note[]) => {
    const newNote = {
      id: Date.now() + (notes?.length || 0),
      isFavorite: false,
      noteContent: editor.getJSON(),
      title: 'Default',
    };

    if (!notes) {
      notes = [];
    }
    notes.push(newNote);

    setStorage({ notes, currentNote: emptyNote });
    editor.commands.clearContent();
  };

  return (
    <Button variant="inverse" size="sm" onClick={saveNoteHandler}>
      <Save />
    </Button>
  );
};
