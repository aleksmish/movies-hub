import { Select } from 'antd';

type SelectRecordsPerPageProps = {
  onChange: (recordsPerPage: number) => void;
}

const SelectRecordsPerPage = ({onChange}: SelectRecordsPerPageProps) => {
  return (
    <div className="mt-4 mv-2 w-[150px]">
      <label>Records per Page</label>
      <Select
        className='mt-2'
        defaultValue={10}
        onChange={onChange}
        options={[
          { value: 10, label: 10 },
          { value: 30, label: 30 },
          { value: 50, label: 50 },
          { value: 70, label: 70 },
          { value: 100, label: 100 },
        ]}
      />
    </div>
  )
}

export default SelectRecordsPerPage