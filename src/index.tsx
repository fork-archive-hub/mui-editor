import { Card, useTheme, CardProps } from '@material-ui/core';
import { Editor } from '@tiptap/core';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import { ImageProps } from './menu-button-image';

import Toolbar from './toolbar';

interface Props extends Pick<CardProps, 'className' | 'style' | 'variant'> {
  initialContent: string;
  onChange: (value: string) => void;
  editorRef?: React.MutableRefObject<Editor>;
  image?: ImageProps;
}

export { Editor, EditorOptions } from '@tiptap/core';

export default function TextEditor(props: Props) {
  const theme = useTheme();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
      }),
    ],
    content: props.initialContent,
    onCreate(params) {
      if (props.editorRef) {
        props.editorRef.current = params.editor;
      }
    },
    onUpdate(params) {
      props.onChange(params.editor.getHTML());
    },
  });

  return (
    <Card
      variant={props.variant}
      className={props.className}
      style={props.style}
    >
      <Toolbar editor={editor} image={props.image} />
      <div
        style={{
          borderTop: `1px solid ${theme.palette.divider}`,
          padding: theme.spacing(1, 2),
          backgroundColor: theme.palette.background.default,
        }}
      >
        <EditorContent
          editor={editor}
          style={{ ...theme.typography.body1, minHeight: 64 }}
        />
      </div>
    </Card>
  );
}
