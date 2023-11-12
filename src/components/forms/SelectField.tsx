import { Select } from 'antd';
import { ReactElement } from 'react';

type SelectFieldProps = {
  selectedOptions: Option[];
  options: Option[];
  onChange?: (selectedOption: any) => void;
  onSearch?: (value: string) => void;
  optionRender?: (option: any) => ReactElement;
  onDeselect?: (value: any) => void;
  onClear?: () => void;
  onSelect?: (value: any) => void;
  displayName: string;
  loading?: boolean;
}

export type Option = {
  value: string | number;
  label: string;
}

const SelectField = ({options, selectedOptions, displayName, onChange, onSearch, onDeselect, onClear, onSelect, optionRender = undefined, loading = false}: SelectFieldProps) => {
  return (
    <div className='flex flex-col mt-4 mb-2'>
      <label className='mb-2'>{displayName}</label>
      <Select
        loading={loading}
        onSearch={onSearch}
        allowClear
        mode="multiple"
        showSearch
        style={{ width: 400 }}
        placeholder="Search to Select"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        optionRender={optionRender}
        optionLabelProp="label"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={options}
        defaultValue={selectedOptions.map(selectedOption => (
          selectedOption
        ))}
        onChange={onChange}
        onDeselect={onDeselect}
        onClear={onClear}
        onSelect={onSelect}
      />
    </div>
  )
}

export default SelectField