import { IconButton } from '@material-ui/core';
import { ChainedCommands, Editor } from '@tiptap/react';
import * as React from 'react';

export default function MenuButton(props: {
  editor: Editor | null;
  name: string;
  attributes?: any;
  children: React.ReactNode;
  onClick: (commands: ChainedCommands) => ChainedCommands;
}) {
  return (
    <IconButton
      size={'small'}
      color={
        props.name && props.editor?.isActive(props.name, props.attributes)
          ? 'primary'
          : 'default'
      }
      onClick={() => {
        if (props.editor) {
          props.onClick(props.editor.chain().focus()).run();
        }
      }}
    >
      {props.children}
    </IconButton>
  );
}
