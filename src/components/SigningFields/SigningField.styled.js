import { get } from 'lodash';
import styled from 'styled-components';

import { FieldStyle, HelloSignTagType } from '../../constants/FormPreview.constants';

export const DivRoot = styled.div({
  position: 'absolute',
  lineHeight: 1,
  color: '#000000',
  display: 'flex',
  top: ({ y, scale }) => `${scale * y}px`,
  left: ({ x, scale }) => `${scale * x}px`,
  width: ({ width, scale, type }) => {
    if (type === 'box') {
      return `${scale * FieldStyle[HelloSignTagType.CHECKBOX].size.width}px`;
    }

    return `${scale * width}px`;
  },
  height: ({ height, scale, type }) => {
    if (type === 'box') {
      return `${scale * FieldStyle[HelloSignTagType.CHECKBOX].size.height}px`;
    }

    return `${scale * height}px`;
  },
  fontSize: ({ height, scale }) => `${Math.floor(0.7 * scale * height)}px`,
  borderColor: ({ validationError, $brandSettings }) =>
    get(
      $brandSettings,
      validationError
        ? 'colors.formControls.textField.borderErrorColor'
        : 'colors.formControls.textField.borderDefaultColor',
    ),
  borderStyle: ({ isFocusedRequiredField }) => (isFocusedRequiredField ? 'solid' : 'dashed'),
  borderWidth: ({ scale }) => `${scale * 1}px`,
  zIndex: 1,

  '&::after': {
    content: '"*"',
    position: 'absolute',
    top: ({ scale }) => `${-scale * 5}px`,
    left: ({ scale }) => `${-scale * 10}px`,
    color: ({ $brandSettings }) =>
      get($brandSettings, 'colors.formControls.textField.leftIconErrorColor'),
    fontSize: ({ scale }) => `${Math.floor(scale * 16)}px`,
    display: ({ isRequired }) => (isRequired ? 'block' : 'none'),
  },
});

export const Input = styled.input({
  position: 'absolute',
  background: 'transparent',
  border: 'none',
  width: '100%',
  height: '100%',
  outline: 'none',
  fontSize: 'inherit',
  margin: 0,
});

export const Group = styled.div({
  position: 'absolute',
  top: ({ scale, margin, y1 }) => `${scale * y1 - margin}px`,
  left: ({ scale, margin, x1 }) => `${scale * x1 - margin}px`,
  width: ({ scale, margin, x1, x2 }) => `${scale * (x2 - x1) + 2 * margin}px`,
  height: ({ scale, margin, y1, y2 }) => `${scale * (y2 - y1) + 2 * margin}px`,
  borderColor: ({ validationError, $brandSettings }) =>
    get(
      $brandSettings,
      validationError
        ? 'colors.formControls.textField.borderErrorColor'
        : 'colors.formControls.textField.borderDefaultColor',
    ),
  borderStyle: ({ isFocusedRequiredField }) => (isFocusedRequiredField ? 'solid' : 'dashed'),
  borderWidth: ({ scale }) => `${scale * 1}px`,
  zIndex: 1,

  '&::after': {
    content: '"*"',
    position: 'absolute',
    top: ({ scale }) => `${-scale * 5}px`,
    left: ({ scale }) => `${-scale * 10}px`,
    color: ({ $brandSettings }) => $brandSettings.colors.formControls.textField.leftIconErrorColor,
    fontSize: ({ scale }) => `${Math.floor(scale * 16)}px`,
  },
});
