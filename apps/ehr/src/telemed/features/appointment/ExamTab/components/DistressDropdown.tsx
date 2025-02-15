import { FC } from 'react';
import { ControlledExamCheckboxDropdown, ExamCheckboxDropdownOptionType } from './ControlledExamCheckboxDropdown';
import { examObservationFieldsDetailsArray } from 'utils';

const options: ExamCheckboxDropdownOptionType[] = examObservationFieldsDetailsArray
  .filter((details) => details.card === 'general' && details.group === 'dropdown')
  .map((details) => ({ label: details.label, name: details.field }));

export const DistressDropdown: FC = () => {
  return (
    <ControlledExamCheckboxDropdown
      abnormal
      checkboxLabel="Distress"
      dropdownLabel="Distress degree"
      options={options}
    />
  );
};
