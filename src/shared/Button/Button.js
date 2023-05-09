import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';

import BrandSettingsContext from '../../contexts/brandSettings';

const ButtonStyled = styled.button({
  color: ({ variant, $brandSettings }) => {
    if (variant === 'text') {
      return get($brandSettings, 'colors.formControls.infoButton.textColor');
    }

    return get($brandSettings, 'colors.formControls.containedButton.textColor');
  },
  backgroundColor: ({ color, variant, disabled, $brandSettings }) => {
    if (variant === 'text') {
      return 'transparent';
    }

    if (disabled) {
      return get($brandSettings, 'colors.formControls.containedButton.disabledBackgroundColor');
    }

    if (color === 'secondary') {
      return get($brandSettings, 'colors.modalViews.closeButtonColor');
    }

    return get($brandSettings, 'colors.formControls.containedButton.backgroundColor');
  },
  fontWeight: 600,
  fontSize: 16,
  lineHeight: 1,
  borderRadius: 8,
  cursor: ({ disabled }) => (disabled ? 'default' : 'pointer'),
  pointerEvents: ({ disabled }) => (disabled ? 'none' : null),
  textTransform: 'capitalize',
  border: 'none',
  minWidth: ({ variant }) => (variant === 'text' ? 'auto' : '160px'),
  height: 46,
  padding: '0px 30px',

  '@media (max-width: 560px)': {
    minWidth: 'auto',
    padding: '0px 10px',
  },
});

const Button = props => {
  return (
    <BrandSettingsContext.Consumer>
      {brandSettings => <ButtonStyled {...props} $brandSettings={brandSettings} />}
    </BrandSettingsContext.Consumer>
  );
};

export default Button;
