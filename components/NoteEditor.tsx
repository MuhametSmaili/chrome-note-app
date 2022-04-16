import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorProps, EditorState, getDefaultKeyBinding, KeyBindingUtil, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const Editor = dynamic<EditorProps>(() => import('draft-js').then((mod) => mod.Editor), { ssr: false });

const NoteEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // For keyboard shortcuts
  const handleKeyCommand = (command: string, _: EditorState, __: number) => {
    const commandMap: Map<string, string> = new Map([
      ['strikethrough', 'STRIKETHROUGH'],
      ['ordered-list', 'ordered-list-item'],
      ['unordered-list', 'unordered-list-item'],
      ['blockquote', 'blockquote'],
    ]);

    const utilsFn = (command: string) =>
      command === 'strikethrough' ? RichUtils.toggleInlineStyle : RichUtils.toggleBlockType;

    // inline formatting key commands handles bold, italic, code, underline
    let newEditorState: EditorState | null = RichUtils.handleKeyCommand(editorState, command);

    const style = commandMap.get(command);

    if (!newEditorState && style) {
      newEditorState = utilsFn(command)(editorState, style);
    }

    if (newEditorState) {
      setEditorState(newEditorState);
      return 'handled';
    }

    return 'not-handled';
  };

  const keyBindingFunction = (event: React.KeyboardEvent) => {
    const keyMap: Map<number | string, string> = new Map([
      ['x', 'strikethrough'],
      ['7', 'ordered-list'],
      ['8', 'unordered-list'],
      ['9', 'blockquote'],
    ]);

    const key = keyMap.get(event.key);

    if (key && KeyBindingUtil.hasCommandModifier(event) && event.shiftKey) {
      return key;
    }

    return getDefaultKeyBinding(event);
  };

  return (
    <>
      <h1>Editor</h1>
      <div
        style={{
          border: '1px solid #ccc',
          padding: 10,
          maxHeight: 500,
          width: 'inherit',
          overflowY: 'auto',
        }}
      >
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFunction}
          onChange={setEditorState}
          placeholder="Note down your ideas..."
        />
      </div>
    </>
  );
};

export default NoteEditor;
