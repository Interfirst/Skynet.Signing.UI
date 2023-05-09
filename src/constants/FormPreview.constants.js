export const HelloSignTagType = {
  TEXT_FIELD: 'text',
  CHECKBOX: 'check',
  RADIO: 'radio',
  DATE: 'date',
  TEXT_HANDWRITING: 'text-handwriting',
  INITIAL: 'initial',
  SIGNATURE: 'sig',
};

export const HelloSignSpecificTagType = {
  [HelloSignTagType.TEXT_FIELD]: 'Text',
  [HelloSignTagType.SIGNATURE]: 'Image',
  [HelloSignTagType.INITIAL]: 'Image',
  [HelloSignTagType.CHECKBOX]: 'Confirmed',
};

export const SignStatus = {
  SIGN: 'Sign',
  SIGNED: 'Signed',
  CANCEL: 'Cancel',
};

export const GroupRequireType = {
  ONLY_ONE: 'require_1',
  ONE_OR_MORE: 'require_1-ormore',
};

export const FieldStyle = {
  [HelloSignTagType.CHECKBOX]: {
    size: {
      height: 20,
      width: 20,
    },
  },
};

export const toastContainerStyle = {
  position: 'absolute',
  zIndex: 100000000,
};
