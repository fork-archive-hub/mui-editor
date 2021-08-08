import { CircularProgress, IconButton } from '@material-ui/core';
import { Photo } from '@material-ui/icons';
import { Editor } from '@tiptap/react';
import React from 'react';

export interface ImageProps {
  uploading: boolean;
  onSelect: (file: File) => Promise<string>;
}

export default function MenuButtonImage(
  props: ImageProps & {
    editor: Editor | null;
  }
) {
  const onChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.editor || !evt.target.files) {
      return;
    }

    const src = await props.onSelect(evt.target.files[0]);
    props.editor.chain().focus().setImage({ src }).run();
  };

  return (
    <label>
      <input
        type="file"
        accept="image/webp,image/gif,image/png,image/jpeg"
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <IconButton disabled={!props.editor} size={'small'} component="span">
        {props.uploading ? (
          <CircularProgress size={18} color="inherit" />
        ) : (
          <Photo />
        )}
      </IconButton>
    </label>
  );
}
