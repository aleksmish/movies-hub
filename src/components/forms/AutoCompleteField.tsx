import { AutoComplete, } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

type AutoCompleteFieldProps = {
  displayName: string;
  fieldName: string;
  options: DefaultOptionType[];
  onSearch: (query: string) => void;
  onSelect: (value: string | number) => void;
}

const AutoCompleteField = ({onSelect, onSearch, fieldName, displayName, options}: AutoCompleteFieldProps) => {
  return (
    <div className='flex flex-col mt-4 mb-2'>
      <label htmlFor={fieldName} className='mb-2'>{displayName}</label>
      <AutoComplete
        id={fieldName}
        options={options}
        style={{ width: 400 }}
        placeholder="input here"
        onSelect={(a, b) => console.log(a, b)}
        onSearch={onSearch}
      />
    </div>
  )
}

export default AutoCompleteField