import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Input,
  InputAdornment,
} from '@material-ui/core';
import { ClearTwoTone, InsertLink } from '@material-ui/icons';
import { Editor } from '@tiptap/react';
import * as React from 'react';

export default function MenuButtonLink(props: { editor: Editor | null }) {
  const [open, setOpen] = React.useState(false);
  const [href, setHref] = React.useState('');

  const onClose = () => setOpen(false);

  return (
    <>
      <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={onClose}>
        <form
          onSubmit={evt => {
            evt.preventDefault();
            evt.stopPropagation();
            setOpen(false);
            props.editor
              ?.chain()
              .focus()
              .extendMarkRange('link')
              .setLink({
                href,
              })
              .run();
          }}
        >
          <DialogContent>
            <Input
              type={'url'}
              value={href}
              fullWidth={true}
              required={true}
              onChange={evt => setHref(evt.target.value)}
              placeholder={'https://example.com/'}
              endAdornment={
                <InputAdornment position={'end'}>
                  <IconButton
                    color={'primary'}
                    disabled={!href}
                    onClick={() => setHref('')}
                  >
                    <ClearTwoTone />
                  </IconButton>
                </InputAdornment>
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button color={'primary'} type={'submit'}>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <IconButton
        size={'small'}
        disabled={!props.editor}
        color={props.editor?.isActive('link') ? 'primary' : 'default'}
        onClick={() => {
          if (props.editor) {
            setHref(props.editor.getAttributes('link').href ?? '');
            setOpen(true);
          }
        }}
      >
        <InsertLink />
      </IconButton>
    </>
  );
}
