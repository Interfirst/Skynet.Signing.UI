import React, { memo, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { SignStatus } from 'constants/FormPreview.constants';

import Select from 'shared/Select';

const PreviewAsAutocomplete = ({
  isLoading,
  signatures,
  setViewer,
  viewer,
  setForm,
  brandSettings,
}) => {
  const viewersOptions = useMemo(
    () =>
      signatures.reduce((acc, { id, status }) => {
        if (status.type !== SignStatus.SIGNED) {
          acc.push({ label: id.signer.name, value: id.signer.name });
        }

        return acc;
      }, []),
    [signatures],
  );

  useEffect(() => {
    if (!isEmpty(viewersOptions)) {
      setViewer(viewersOptions[0]);
    }
  }, [viewersOptions, setViewer]);

  const onChangeViewer = useCallback(
    viewer => {
      setViewer(viewer);
      setForm({});
    },
    [setForm, setViewer],
  );

  return (
    <Select
      brandSettings={brandSettings}
      disabled={isLoading}
      name="viewer"
      options={viewersOptions}
      value={viewer}
      onChange={onChangeViewer}
    />
  );
};

PreviewAsAutocomplete.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setForm: PropTypes.func.isRequired,
  setViewer: PropTypes.func.isRequired,
  brandSettings: PropTypes.object,
  signatures: PropTypes.array,
  viewer: PropTypes.object,
};

PreviewAsAutocomplete.defaultProps = {
  signatures: [],
  viewer: null,
  brandSettings: null,
};

export default memo(PreviewAsAutocomplete);
