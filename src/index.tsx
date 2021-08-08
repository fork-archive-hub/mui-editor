import { Card, useTheme } from '@material-ui/core';
import { Editor } from '@tiptap/core';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

import { ImageProps } from './menu-button-image';
import Toolbar from './toolbar';

interface Props {
  initialContent: string;
  image: false | ImageProps;
  onChange: (value: string) => void;
  onCreate?: (editor: Editor) => void;
}

export default function TextEditor(props: Props) {
  const theme = useTheme();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      Link.configure({
        openOnClick: false,
        linkOnPaste: true
      })
    ],
    content: props.initialContent,
    onCreate(params) {
      if (props.onCreate) {
        props.onCreate(params.editor);
      }
    },
    onUpdate(params) {
      props.onChange(params.editor.getHTML());
    }
  });

  return (
    <Card variant={'outlined'}>
      <Toolbar editor={editor} image={props.image} />
      <div
        style={{
          borderTop: `1px solid ${theme.palette.divider}`,
          padding: theme.spacing(1, 2),
          backgroundColor: theme.palette.background.default
        }}
      >
        <EditorContent editor={editor} style={theme.typography.body1} />
      </div>
    </Card>
  );
}
