import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import BrandSettingsContext from 'contexts/brandSettings';

import { getExtendedSignatureDataByPage } from 'utils/data';

import SigningField from './SigningField';
import { Group } from './SigningField.styled';

const SigningFields = ({
  pageNumber,
  scale,
  form,
  setForm,
  validationErrors,
  focusedRequiredField,
  data,
  isLoading,
}) => {
  const { signatureRelatedElementIds, groupedElements, pageElements } = useMemo(
    () => getExtendedSignatureDataByPage({ data, pageNumber }),
    [data, pageNumber],
  );

  const renderedGroupedElements = useMemo(
    () =>
      Object.values(groupedElements).map(({ ids, location, ...position }, index) => (
        <BrandSettingsContext.Consumer key={index}>
          {brandSettings => (
            <Group
              {...position}
              $brandSettings={brandSettings}
              isFocusedRequiredField={ids.includes(focusedRequiredField)}
              margin={10}
              scale={scale}
              validationError={ids.some(id => validationErrors[id])}
            />
          )}
        </BrandSettingsContext.Consumer>
      )),
    [focusedRequiredField, groupedElements, scale, validationErrors],
  );

  const renderedSigningFields = useMemo(
    () =>
      pageElements.map(({ id, tag }) => (
        <SigningField
          {...tag.location.coordinate}
          {...tag.location.size}
          focusedRequiredField={focusedRequiredField}
          groupIds={groupedElements[tag.type.group]?.ids}
          id={id}
          isLoading={isLoading}
          isRequired={tag.isRequired}
          key={id}
          scale={scale}
          setForm={setForm}
          signatureRelatedElementIds={signatureRelatedElementIds}
          type={tag.type.name}
          validationError={validationErrors[id]}
          value={form[id]}
        />
      )),
    [
      pageElements,
      focusedRequiredField,
      form,
      groupedElements,
      scale,
      setForm,
      signatureRelatedElementIds,
      validationErrors,
      isLoading,
    ],
  );

  if (isEmpty(data)) {
    return null;
  }

  return (
    <div>
      {renderedGroupedElements}
      {renderedSigningFields}
    </div>
  );
};

SigningFields.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  pageNumber: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired,
  focusedRequiredField: PropTypes.string,
};

SigningFields.defaultProps = {
  focusedRequiredField: null,
};

export default memo(SigningFields);
