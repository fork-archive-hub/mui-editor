import {
  Card,
  CardProps,
  Divider,
  LinearProgress,
  Snackbar,
  useTheme,
} from '@material-ui/core';
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
  initialContent?: string;
  editorRef?: React.MutableRefObject<Editor | undefined>;
  onChange: (value: string) => void;
  image?: ImageProps;
}

export { Editor, EditorOptions } from '@tiptap/core';

export default function TextEditor(props: Props) {
  const theme = useTheme();
  const [error, setError] = React.useState('');

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
    content: props.initialContent || '',
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
      <Toolbar editor={editor} setError={setError} image={props.image} />
      {props.image?.uploading ? (
        <LinearProgress style={{ height: 2 }} />
      ) : (
        <Divider style={{ height: 2 }} />
      )}
      <div
        style={{
          padding: theme.spacing(1, 2),
          backgroundColor: theme.palette.background.default,
          position: 'relative',
        }}
      >
        {error && (
          <Snackbar
            open={Boolean(error)}
            autoHideDuration={5000}
            onClose={() => setError('')}
            style={{ position: 'absolute', top: 0, right: 0 }}
            message={error}
          />
        )}
        <EditorContent
          editor={editor}
          style={{ ...theme.typography.body1, minHeight: 64 }}
        />
      </div>
    </Card>
  );
}
