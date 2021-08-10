import { IconButton, CircularProgress } from '@material-ui/core';
import { Photo } from '@material-ui/icons';
import { Editor } from '@tiptap/react';
import React from 'react';

export interface ImageProps {
  uploading: boolean;
  onSelected: (file: File) => Promise<string>;
  onError: (error: Error) => void;
}

interface Props extends ImageProps {
  editor: Editor | null;
}

export default function MenuButtonImage(props: Props) {
  return (
    <label>
      <input
        type="file"
        multiple={false}
        accept="image/webp,image/gif,image/png,image/jpeg"
        style={{ display: 'none' }}
        onChange={evt => {
          if (!evt.target.files || evt.target.files.length !== 1) {
            return;
          }

          const file = evt.target.files[0];

          props
            .onSelected(file)
            .then(url => {
              if (url && props.editor) {
                props.editor
                  .chain()
                  .focus()
                  .setImage({ src: url, alt: file.name })
                  .run();
              }
            })
            .catch(props.onError);
        }}
      />

      <IconButton
        disabled={props.uploading || !props.editor}
        size={'small'}
        component="span"
      >
        {props.uploading ? <CircularProgress size={18} /> : <Photo />}
      </IconButton>
    </label>
  );
}
