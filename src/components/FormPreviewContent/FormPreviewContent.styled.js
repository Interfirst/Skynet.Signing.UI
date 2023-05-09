import { get } from 'lodash';
import styled from 'styled-components';

export const DivRoot = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  background: '#ffffff',
  color: '#000000',

  '& *': {
    fontFamily: 'Overpass, Arial, sans-serif',
    boxSizing: 'border-box',
  },
});

export const DivTop = styled.div({
  '& > div': {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 16px 0px 16px',
  },
});

export const DivBottom = styled.div({
  overflow: 'auto',
});

export const Badge = styled.span({
  position: 'relative',
  marginRight: 30,
  color: '#000000',

  '&::after': {
    content: ({ num }) => `"${num}"`,
    position: 'absolute',
    top: -5,
    right: -20,
    borderRadius: 50,
    background: ({ $brandSettings }) => get($brandSettings, 'colors.common.primary.main'),
    color: ({ $brandSettings }) => get($brandSettings, 'colors.common.primary.accent'),
    fontSize: 13,
    width: 18,
    height: 18,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const ProgressBar = styled.div({
  textAlign: 'center',
  padding: 10,
});
