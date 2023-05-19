import { get } from 'lodash';
import styled from 'styled-components';

export const DivRoot = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
});

export const Content = styled.div({
  position: 'relative',
  zIndex: 1002,
  overflow: 'hidden',
  background: ({ $brandSettings }) => get($brandSettings, 'colors.modalViews.backgroundColor'),
  minWidth: 400,
  minHeight: 200,
  borderRadius: 5,
});

export const Blanket = styled.div({
  position: 'absolute',
  zIndex: 1001,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.4)',
});

export const Header = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  boxSizing: 'border-box',
  minHeight: 64,
  alignItems: 'center',
  padding: '10px 20px',
  fontWeight: 700,
  fontSize: 16,

  '& button': {
    fontSize: 16,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 10,
    color: ({ $brandSettings }) => get($brandSettings, 'colors.modalViews.closeButtonColor'),
  },
});
