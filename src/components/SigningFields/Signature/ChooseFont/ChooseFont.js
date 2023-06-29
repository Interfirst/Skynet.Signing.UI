import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import styled from 'styled-components';

import BrandSettingsContext from '../../../../contexts/brandSettings';
import Select from '../../../../shared/Select';
import { fonts } from '../Signature.constants';

const commonStyles = {
  control: styles => ({
    ...styles,
    display: 'inline-flex',
    border: 'none',
    background: 'transparent',
  }),
  menu: styles => ({
    ...styles,
    width: 200,
  }),
  option: styles => ({
    ...styles,
    textAlign: 'left',
  }),
};

const selectComponents = {
  IndicatorSeparator: () => null,
};

const OptionLabel = styled.span(({ $brandSettings }) => ({
  fontSize: 18,
  fontStyle: 'italic',
  fontFamily: ({ name }) => `${name} !important`,
  color: get($brandSettings, 'color.formControls.select.dropDownOptionColor'),

  '& span': {
    color: get($brandSettings, 'colors.formControls.select.dropDownFocusedCheckMarkColor'),
    opacity: ({ isMatched }) => (isMatched ? 1 : 0),
    display: 'inline-block',
    marginRight: 5,
  },
}));

const ChooseFont = ({
  tempSignatureFieldRef,
  tempSignatureFont,
  setTempSignatureFont,
  brandSettings,
}) => {
  const getOptionLabel = useCallback(
    ({ name }) => {
      const isMatched = tempSignatureFont.name === name;
      return (
        <OptionLabel $brandSettings={brandSettings} isMatched={isMatched} name={name}>
          <span>✓</span>
          {` ${tempSignatureFieldRef.current.value || name}`}
        </OptionLabel>
      );
    },
    [tempSignatureFont, tempSignatureFieldRef],
  );

  return (
    <Select
      brandSettings={brandSettings}
      className="choose-font-696"
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
  brandSettings: PropTypes.object.isRequired,
  tempSignatureFieldRef: PropTypes.object.isRequired,
  tempSignatureFont: PropTypes.object.isRequired,
  setTempSignatureFont: PropTypes.func.isRequired,
};

export default memo(ChooseFont);
