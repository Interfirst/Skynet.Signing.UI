import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import styled from 'styled-components';

import BrandSettingsContext from '../../../../contexts/brandSettings';
import Select from '../../../../shared/Select';
import { fonts } from '../Signature.constants';

const commonStyles = {
  control: styles => ({ ...styles, display: 'inline-flex', border: 'none' }),
};

const selectComponents = {
  IndicatorSeparator: () => null,
};

const OptionLabel = styled.span({
  fontSize: 18,
  fontStyle: 'italic',
  fontFamily: ({ name }) => `${name} !important`,
  color: ({ colors }) => get(colors, 'formControls.select.dropDownOptionColor'),

  '& span': {
    color: ({ colors }) => get(colors, 'formControls.select.dropDownFocusedCheckMarkColor'),
    opacity: ({ isMatched }) => (isMatched ? 1 : 0),
    display: 'inline-block',
    marginRight: 5,
  },
});

const ChooseFont = ({ tempSignatureFieldRef, tempSignatureFont, setTempSignatureFont }) => {
  const getOptionLabel = useCallback(
    ({ name }) => {
      const isMatched = tempSignatureFont.name === name;
      return (
        <BrandSettingsContext.Consumer>
          {({ colors }) => (
            <OptionLabel colors={colors} isMatched={isMatched} name={name}>
              <span>✓</span>
              {` ${tempSignatureFieldRef.current.value || name}`}
            </OptionLabel>
          )}
        </BrandSettingsContext.Consumer>
      );
    },
    [tempSignatureFont, tempSignatureFieldRef],
  );

  return (
    <Select
      components={selectComponents}
      getOptionLabel={getOptionLabel}
      isSearchable={false}
      options={fonts}
      placeholder="Choose Font"
      styles={commonStyles}
      value={null}
      onChange={setTempSignatureFont}
    />
  );
};

ChooseFont.propTypes = {
  tempSignatureFieldRef: PropTypes.object.isRequired,
  tempSignatureFont: PropTypes.object.isRequired,
  setTempSignatureFont: PropTypes.func.isRequired,
};

export default memo(ChooseFont);
