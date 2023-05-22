import { get } from 'lodash';
import styled from 'styled-components';

export const ResetButton = styled.button(({ height, scale, $brandSettings }) => {
  const elementSide = height * scale;
  const selfSide = 20;

  return {
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
    borderRadius: '50%',
    width: selfSide,
    height: selfSide,
    fontSize: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: get($brandSettings, 'colors.modalViews.closeButtonColor'),
    color: get($brandSettings, 'colors.modalViews.closeButtonColor'),
    background: 'transparent',
    display: elementSide > selfSide ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
  };
});

export const SignatureImg = styled.img({
  maxWidth: '100%',
  height: '100%',
  margin: 'auto',
});

export const baseModalWidth = 600;

export const DialogNavigation = styled.div({
  display: 'flex',
  borderBottom: '1px solid #000000',
  padding: '0px 5px',
  width: baseModalWidth,

  '& button': {
    color: '#000000',
    borderRadius: 0,
    borderBottom: '3px solid transparent',

    '&[data-is-active="true"]': {
      borderColor: ({ $brandSettings }) =>
        get($brandSettings, 'colors.formControls.containedButton.backgroundColor'),
      fontWeight: 600,
    },

    '&[data-is-active="false"]': {
      opacity: 0.5,
    },
  },
});

export const DivPlaceholder = styled.div({
  textAlign: 'left',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  wordBreak: 'break-all',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: ({ scale }) => `${Math.floor(scale * 14)}px`,
});

export const DialogBottom = styled.div({
  padding: '0px 20px 20px 20px',

  '& > div': {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,

    '& button:not(:last-child)': {
      marginRight: 10,
    },
  },
});

export const dialogMainMargin = 20;

export const DialogMain = styled.div({
  position: 'relative',
  padding: `20px ${dialogMainMargin}px 10px ${dialogMainMargin}px`,
  minHeight: 300,
  flex: 1,

  '& button': {
    position: 'absolute',
    top: 25,
    left: 20,
  },

  '& canvas': {
    border: '1px solid #000000',
  },
});

export const SignatureInput = styled.input({
  marginTop: 10,
  width: '100%',
  height: 50,
  padding: '10px 20px',
  marginBottom: 10,
  fontSize: 24,
  fontFamily: ({ fontFamily }) => `${fontFamily} !important`,
  fontStyle: 'italic',
  boxSizing: 'border-box',
  border: '1px solid #000000',
});
