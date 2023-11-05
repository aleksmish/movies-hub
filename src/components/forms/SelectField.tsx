import { Select } from 'antd';

type SelectFieldProps = {
  selectedOptions: Option[];
  options: Option[];
  onChange: (selectedOptions: Option[]) => void;
  displayName: string;
}

export type Option = {
  value: string | number;
  label: string;
}

const SelectField = ({options, selectedOptions, displayName, onChange}: SelectFieldProps) => {
  return (
    <div className='flex flex-col mt-4 mb-2'>
      <label className='mb-2'>{displayName}</label>
      <Select
        allowClear
        mode="multiple"
        showSearch
        style={{ width: 400 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={options}
        defaultValue={selectedOptions.map(selectedOption => (
          selectedOption.value
        ))}
      />
    </div>
  )
}

export default SelectField