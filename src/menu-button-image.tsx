import { IconButton } from '@material-ui/core';
import { Photo } from '@material-ui/icons';
import { Editor } from '@tiptap/react';
import React from 'react';

export interface ImageProps {
  uploading: boolean;
  onSelected: (file: File) => Promise<string>;
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
          if (evt.target.files) {
            const file = evt.target.files[0];
            return props
              .onSelected(file)
              .then(url =>
                props.editor
                  ?.chain()
                  .focus()
                  .setImage({ src: url, alt: file.name })
                  .run()
              );
          }
        }}
      />

      <IconButton
        disabled={!props.editor || props.uploading}
        size={'small'}
        component="span"
      >
        <Photo />
      </IconButton>
    </label>
  );
}
