import { useState } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@/components/Dialog';

import { Button } from '../Button';

export const EnableNotifications = () => {
  const [open, setOpen] = useState(false);
  const [showEnableNotifications, setEnableNotifications] = useState(
    window.Notification && window.Notification.permission !== 'granted',
  );

  const enableNotifications = () => {
    setOpen(false);
    if (window.Notification.permission !== 'granted') {
      Notification.requestPermission().then((res) => {
        if (res === 'granted') {
          setEnableNotifications(false);
        }
      });
    }
  };

  return (
    <>
      {showEnableNotifications && (
        <Button
          size="small"
          variant="contained"
          color="info"
          onClick={() => setOpen(true)}
        >
          Receber notificações
        </Button>
      )}
      <Dialog show={open} closeDialog={() => setOpen(false)}>
        <DialogTitle>Ativar Notificações</DialogTitle>
        <DialogContent>
          {window.Notification && window.Notification.permission === 'denied'
            ? 'As notificações estão desabilitadas, clique no icone de cadeado ou exclamação ao lado da URL do site para ativar'
            : 'Deseja ativar as notificações para a área de trabalho?'}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="danger"
            onClick={() => setOpen(false)}
          >
            Fechar
          </Button>
          {window.Notification &&
            window.Notification.permission !== 'denied' && (
              <Button
                variant="contained"
                color="confirm"
                onClick={enableNotifications}
              >
                Ativar
              </Button>
            )}
        </DialogActions>
      </Dialog>
    </>
  );
};
