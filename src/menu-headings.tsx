import { Select } from '@material-ui/core';
import { HeadingOptions } from '@tiptap/extension-heading';
import { Editor } from '@tiptap/react';
import React from 'react';

export default function MenuHeadings(props: {
  editor: Editor | null;
  levels: HeadingOptions['levels'];
}) {
  const value = props.levels.find(level =>
    props.editor?.isActive('heading', { level })
  );

  return (
    <Select
      value={value ?? ''}
      native={true}
      style={{ width: 108 }}
      onChange={evt => {
        if (!props.editor) {
          return;
        }

        if (evt.target.value) {
          const level = parseInt(evt.target.value as string);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          props.editor.chain().focus().setHeading({ level }).run();
        } else if (value) {
          props.editor
            .chain()
            .focus()
            .toggleHeading({
              level: value,
            })
            .run();
        }
      }}
    >
      <option value="">Normal</option>
      {props.levels.map(level => (
        <option key={level} value={level}>
          Heading {level}
        </option>
      ))}
    </Select>
  );
}
