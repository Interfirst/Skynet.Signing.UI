import styled from 'styled-components';

export const DivRoot = styled.div({
  margin: '10px 30px',
});

export const DivPage = styled.div({
  position: 'relative',
  marginBottom: 10,

  '& canvas': {
    border: '1px solid #000000',
  },
});
