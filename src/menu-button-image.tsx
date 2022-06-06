import { IconButton } from '@mui/material';
import { Photo } from '@mui/icons-material';
import type { Editor } from '@tiptap/react';
import * as React from 'react';

export interface ImageProps {
  uploading: boolean;
  onSelected: (file: File) => Promise<string>;
}

interface Props extends ImageProps {
  editor: Editor | null;
  setError: (err: string) => void;
}

export default function MenuButtonImage(props: Props) {
  return (
    <label>
      <input
        type="file"
        multiple={false}
        accept="image/webp,image/gif,image/png,image/jpeg"
        style={{ display: 'none' }}
        onChange={async evt => {
          if (!evt.target.files || evt.target.files.length !== 1) {
            return;
          }

          const file = evt.target.files[0];
          try {
            const url = await props.onSelected(file);
            if (props.editor) {
              props.editor
                .chain()
                .focus()
                .setImage({ src: url, alt: file.name })
                .run();
            }
          } catch (err) {
            props.setError(`Fail to upload ${file.name}`);
          } finally {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            evt.target.value = null;
          }
        }}
      />

      <IconButton
        disabled={props.uploading || !props.editor}
        size={'small'}
        component="span"
      >
        <Photo />
      </IconButton>
    </label>
  );
}
