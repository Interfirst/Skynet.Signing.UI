import React, { memo, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { HelloSignTagType } from '../../constants/FormPreview.constants';
import BrandSettingsContext from '../../contexts/brandSettings';
import { getIsFieldChecked } from '../../utils/data';

import Signature from './Signature';
import { DivRoot, Input } from './SigningField.styled';

const SigningField = ({
  id,
  y,
  x,
  width,
  height,
  scale,
  value,
  setForm,
  validationError,
  focusedRequiredField,
  type,
  isRequired,
  signatureRelatedElementIds,
  groupIds,
  isLoading,
}) => {
  const ref = useRef();

  const isFocusedRequiredField = focusedRequiredField === id;

  const props = {
    height,
    isFocusedRequiredField,
    isRequired,
    scale,
    validationError,
    width,
    x,
    y,
  };

  useEffect(() => {
    if (isFocusedRequiredField) {
      ref.current?.scrollIntoView({ block: 'center' });
    }
  }, [isFocusedRequiredField]);

  const onTextChange = useCallback(
    e => setForm(prev => ({ ...prev, [id]: e.target.value })),
    [id, setForm],
  );

  const onCheckboxChange = useCallback(
    e =>
      setForm(prev => ({
        ...prev,
        [id]: getIsFieldChecked(e),
      })),
    [id, setForm],
  );

  const onRadioChange = useCallback(
    e => {
      const resetedFields = groupIds.reduce((acc, id) => {
        acc[id] = false;
        return acc;
      }, {});

      setForm(prev => ({
        ...prev,
        ...resetedFields,
        [id]: getIsFieldChecked(e),
      }));
    },
    [id, setForm, groupIds],
  );

  const renderField = ({ brandSettings }) => {
    switch (type) {
      case HelloSignTagType.TEXT_FIELD:
        return (
          <DivRoot $brandSettings={brandSettings} ref={ref} {...props}>
            <Input
              disabled={isLoading}
              name={id}
              type="text"
              value={value}
              onChange={onTextChange}
            />
          </DivRoot>
        );

      case HelloSignTagType.INITIAL:
      case HelloSignTagType.SIGNATURE:
        return (
          <Signature
            {...props}
            brandSettings={brandSettings}
            fieldRef={ref}
            isLoading={isLoading}
            name={id}
            setForm={setForm}
            signatureRelatedElementIds={signatureRelatedElementIds}
            type={type}
            value={value}
          />
        );

      case HelloSignTagType.CHECKBOX: {
        return (
          <DivRoot {...props} $brandSettings={brandSettings} ref={ref} type="box">
            <Input
              checked={value}
              disabled={isLoading}
              name={id}
              title={validationError}
              type="checkbox"
              onChange={onCheckboxChange}
            />
          </DivRoot>
        );
      }

      case HelloSignTagType.RADIO: {
        return (
          <DivRoot {...props} $brandSettings={brandSettings} ref={ref} type="box">
            <Input
              checked={value}
              disabled={isLoading}
              name={id}
              title={validationError}
              type="radio"
              onChange={onRadioChange}
            />
          </DivRoot>
        );
      }

      default:
        return null;
    }
  };

  return (
    <BrandSettingsContext.Consumer>
      {brandSettings => renderField({ brandSettings })}
    </BrandSettingsContext.Consumer>
  );
};

SigningField.propTypes = {
  groupIds: PropTypes.array.isRequired,
  signatureRelatedElementIds: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  scale: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  setForm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isRequired: PropTypes.bool.isRequired,
  validationError: PropTypes.bool,
  focusedRequiredField: PropTypes.string,
};

SigningField.defaultProps = {
  validationError: false,
  focusedRequiredField: null,
};

export default memo(SigningField);
