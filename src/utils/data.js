import {
  FieldStyle,
  GroupRequireType,
  HelloSignSpecificTagType,
  HelloSignTagType,
} from '../constants/FormPreview.constants';

export const getExtendedSignatureDataByPage = ({ data, pageNumber }) =>
  data.reduce(
    (acc, element) => {
      const { id, tag } = element;
      const { location } = tag;
      const { coordinate } = location;

      // Gather all signature info from all pages
      if ([HelloSignTagType.INITIAL, HelloSignTagType.SIGNATURE].includes(tag.type.name)) {
        acc.signatureRelatedElementIds.push(id);
      }

      if (pageNumber !== location.pageNumber) {
        return acc;
      }

      if ([HelloSignTagType.CHECKBOX, HelloSignTagType.RADIO].includes(tag.type.name)) {
        const { group } = tag.type;

        if (group) {
          // x1,x2,y1,y2 - extreme points of area that include fields related to this group. below you see calculations
          const initialValues = {
            x1: coordinate.x,
            y1: coordinate.y,
            x2: coordinate.x + FieldStyle[HelloSignTagType.CHECKBOX].size.width,
            y2: coordinate.y + FieldStyle[HelloSignTagType.CHECKBOX].size.height,
            ids: [],
          };

          acc.groupedElements[group] = acc.groupedElements[group] || initialValues;

          acc.groupedElements[group] = {
            x1: Math.min(acc.groupedElements[group].x1, initialValues.x1),
            y1: Math.min(acc.groupedElements[group].y1, initialValues.y1),
            x2: Math.max(acc.groupedElements[group].x2, initialValues.x2),
            y2: Math.max(acc.groupedElements[group].y2, initialValues.y2),
            ids: [...acc.groupedElements[group].ids, id],
            location,
          };
        }
      }

      acc.pageElements.push(element);

      return acc;
    },
    { signatureRelatedElementIds: [], groupedElements: {}, pageElements: [] },
  );

export const validateFormFields = ({ elements, form }) =>
  elements.reduce((acc, { id, tag }) => {
    const value = form[id];
    const { name, rule, group } = tag.type;

    if (group && [HelloSignTagType.CHECKBOX, HelloSignTagType.RADIO].includes(name)) {
      const groupElements = elements.filter(({ tag }) => tag.type.group === group);
      const numberOfCheckedElements = groupElements.filter(({ id }) => form[id]).length;

      const isOnlyOneOfGroupChecked = numberOfCheckedElements === 1;
      const isOneOrMoreOfGroupChecked = numberOfCheckedElements >= 1;

      if (rule === GroupRequireType.ONLY_ONE && !isOnlyOneOfGroupChecked) {
        groupElements.forEach(({ id }) => {
          acc[id] = 'Only one required';
        });
      }

      if (rule === GroupRequireType.ONE_OR_MORE && !isOneOrMoreOfGroupChecked) {
        groupElements.forEach(({ id }) => {
          acc[id] = 'One or more required';
        });
      }

      return acc;
    }

    if (tag.isRequired && !value) {
      acc[id] = true;
    }

    return acc;
  }, {});

export const getInitialFormValues = elements =>
  elements.reduce((acc, { id, tag }) => {
    const { checkedByDefault } = tag.type;

    if (checkedByDefault) {
      acc[id] = checkedByDefault;
    }

    return acc;
  }, {});

export const getSignatureSubmitData = ({ elements, form }) =>
  elements.reduce((acc, { id, tag }) => {
    const value = form[id];

    if (value) {
      acc.push({
        type: HelloSignSpecificTagType[tag.type.name],
        tagId: id,
        value,
      });
    }

    return acc;
  }, []);

export const getIsFieldChecked = e => ['true', true].includes(e.target.checked);
