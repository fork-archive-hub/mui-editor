import { IconButton } from '@material-ui/core';
import { Photo } from '@material-ui/icons';
import { Editor } from '@tiptap/react';
import React from 'react';

interface Props {
  editor: Editor | null;
  onSelected: (file: File) => Promise<string>;
}

export default function MenuButtonImage(props: Props) {
  const [uploading, setUploading] = React.useState(false);

  const onChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.editor || !evt.target.files) {
      return;
    }

    setUploading(true);

    try {
      const file = evt.target.files[0];
      const url = await props.onSelected(file);
      props.editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } finally {
      setUploading(false);
    }
  };

  return (
    <label>
      <input
        type="file"
        multiple={false}
        accept="image/webp,image/gif,image/png,image/jpeg"
        style={{ display: 'none' }}
        onChange={onChange}
      />

      <IconButton
        disabled={!props.editor || uploading}
        size={'small'}
        component="span"
      >
        <Photo />
      </IconButton>
    </label>
  );
}
