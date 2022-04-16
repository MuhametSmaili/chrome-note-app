import { EditorState, RichUtils } from 'draft-js';

const inlineStyleButtons = [
  {
    value: 'Bold',
    style: 'BOLD',
  },

  {
    value: 'Italic',
    style: 'ITALIC',
  },

  {
    value: 'Underline',
    style: 'UNDERLINE',
  },

  {
    value: 'Strikethrough',
    style: 'STRIKETHROUGH',
  },

  {
    value: 'Code',
    style: 'CODE',
  },
];

const blockTypeButtons = [
  {
    value: 'Heading One',
    block: 'header-one',
  },

  {
    value: 'Heading Two',
    block: 'header-two',
  },

  {
    value: 'Heading Three',
    block: 'header-three',
  },

  {
    value: 'Blockquote',
    block: 'blockquote',
  },

  {
    value: 'Unordered List',
    block: 'unordered-list-item',
  },

  {
    value: 'Ordered List',
    block: 'ordered-list-item',
  },
];

type ToolBarProps = {
  setEditorState: (fn: (prevState: EditorState) => EditorState) => void;
};

const ToolBar = ({ setEditorState }: ToolBarProps) => {
  const toggleBlockType = (event: React.MouseEvent) => {
    event.preventDefault();
    const block = event.currentTarget.getAttribute('data-block');
    console.log('TOGGLE BLOCK TYPE :: ', { block });
    if (!block) return;
    setEditorState((prevState: EditorState) => {
      return RichUtils.toggleBlockType(prevState, block);
    });
  };

  const toggleInlineStyle = (event: React.MouseEvent) => {
    event.preventDefault();
    const style = event.currentTarget.getAttribute('data-style');
    if (!style) return;
    setEditorState((prevState: EditorState) => {
      return RichUtils.toggleInlineStyle(prevState, style);
    });
  };
  return (
    <div>
      <div className="block-style-options">
        Block Types:
        {blockTypeButtons.map(({ block, value }) => {
          return <input type="button" key={block} value={value} data-block={block} onClick={toggleBlockType} />;
        })}
      </div>
      <div className="inline-style-options">
        Inline Styles:
        {inlineStyleButtons.map(({ value, style }) => {
          return <input type="button" key={style} value={value} data-style={style} onClick={toggleInlineStyle} />;
        })}
      </div>
    </div>
  );
};

export default ToolBar;
