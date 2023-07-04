import React, { memo, useMemo } from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const classNamePrefix = 'reactSelectPrefix';

const Select = ({
  styles,
  components,
  getOptionLabel,
  isSearchable,
  placeholder,
  brandSettings,
  disabled,
  options,
  name,
  value,
  onChange,
  className,
}) => {
  const commonStyles = useMemo(() => {
    const {
      borderDefaultColor,
      borderHoverColor,
      dropDownOptionColor,
      dropDownBackgroundColor,
      hoverTextColor,
    } = get(brandSettings, 'colors.formControls.select', {});

    return {
      control: styles => ({
        ...styles,
        width: 260,
        marginLeft: 10,
        border: `1px solid ${borderDefaultColor}`,
        background: dropDownBackgroundColor,
        borderRadius: 2,
        height: 46,
        padding: '0px 10px',
        boxShadow: 'none',
        cursor: 'pointer',

        '&:focus, &:active, &:hover': {
          boxShadow: 'none',
          border: `1px solid ${borderHoverColor}`,
        },
      }),
      placeholder: styles => ({
        ...styles,
        color: get(brandSettings, 'colors.formControls.textField.placeholderColor'),
        fontWeight: 600,
      }),
      option: styles => ({
        ...styles,
        color: dropDownOptionColor,
        backgroundColor: dropDownBackgroundColor,
        cursor: 'pointer',

        '&:hover': {
          color: hoverTextColor,
        },
      }),
      indicatorsContainer: () => ({
        [`.${classNamePrefix}`]: {
          '&__dropdown-indicator': {
            padding: 0,
          },
        },
      }),
      indicatorSeparator: styles => ({
        ...styles,
        display: 'none',
      }),
      ...styles,
    };
  }, [brandSettings, styles]);

  return (
    <ReactSelect
      className={className}
      classNamePrefix={classNamePrefix}
      components={components}
      disabled={disabled}
      getOptionLabel={getOptionLabel}
      isSearchable={isSearchable}
      name={name}
      options={options}
      placeholder={placeholder}
      styles={commonStyles}
      value={value}
      onChange={onChange}
    />
  );
};

Select.propTypes = {
  disabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  brandSettings: PropTypes.object,
  components: PropTypes.object,
  getOptionLabel: PropTypes.func,
  isSearchable: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  styles: PropTypes.object,
};

Select.defaultProps = {
  styles: {},
  components: undefined,
  getOptionLabel: undefined,
  isSearchable: false,
  placeholder: undefined,
  brandSettings: undefined,
  className: '',
};

export default memo(Select);
