import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import Spinner from 'src/components/shared/Spinner';
import LaunchAccountModal from './LaunchAccountModal';

export default function NewLogin() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    !isLoading && setOpen(false);
  };
  const loader = () => isLoading && <Spinner />;

  return (
    <div>
      <button type='button' onClick={handleOpen}>
        Add New Account
      </button>
      <Modal
        className='modal'
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <div className='modal-form'>
          <LaunchAccountModal isLoading={isLoading} setIsLoading={setIsLoading} />
          {loader()}
        </div>
      </Modal>
    </div>
  );
}
