import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Wrapper = styled.label({
  position: 'relative',

  '& input': {
    position: 'absolute',
    opacity: 0,
  },

  '& span': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    fontSize: 'inherit',
    textAlign: 'center',
    padding: 4,
    borderRadius: '50%',
    color: ({ checked }) => (checked ? '#000000' : 'transparent'),
    border: ({ type }) => (type === 'radio' ? '1px solid #000000' : undefined),

    '@media (max-width: 560px)': {
      padding: 2,
    },
  },
});

// Supported in Safari
const BoxInput = ({ value, disabled, id, onChange, type, validationError }) => {
  return (
    <Wrapper checked={value} type={type}>
      <input checked={value} disabled={disabled} name={id} type={type} onChange={onChange} />
      <span title={validationError}>{type === 'radio' ? '●' : '✓'}</span>
    </Wrapper>
  );
};

BoxInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  validationError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

BoxInput.defaultProps = {
  disabled: false,
};

export default memo(BoxInput);
