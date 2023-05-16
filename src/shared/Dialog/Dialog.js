import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Blanket, Content, DivRoot, Header } from './Dialog.styled';
import Button from '../Button';

const Dialog = ({ isOpened, onClose, children, header, brandSettings }) => {
  if (!isOpened) {
    return null;
  }

  return (
    <DivRoot>
      <Blanket onClick={onClose} />

      <Content $brandSettings={brandSettings}>
        <Header>
          {header}

          <Button variant="text" type="button" onClick={onClose}>
            ✕
          </Button>
        </Header>

        {children}
      </Content>
    </DivRoot>
  );
};

Dialog.propTypes = {
  brandSettings: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  header: PropTypes.string.isRequired,
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(Dialog);
