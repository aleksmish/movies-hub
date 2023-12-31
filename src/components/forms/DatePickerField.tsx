import { DatePicker } from 'antd';
import { ErrorMessage, useFormikContext } from 'formik';

type DatePickerProps = {
  displayName: string;
  fieldName: string;
}

const DatePickerField = ({displayName, fieldName}: DatePickerProps) => {
  const {values} = useFormikContext<any>();
  return (
    <div className='flex flex-col mt-4 mb-2'>
      <label className="mb-2" htmlFor={fieldName}>
        {displayName}
      </label>
      <DatePicker
        className="mb-0"
        id={fieldName}
        name={fieldName}
        defaultValue={values[fieldName]}
        onChange={(date, dateString) => {
          values[fieldName] = date?.format("MM-DD-YYYY")
        }}
        format={"D MMMM YYYY"}
        placeholder=""
      />
      <ErrorMessage
        name={fieldName}
        component="div"
        children={(error) => <div className="text-[#ff4d4f]">{error}</div>}
      />
    </div>
  )
}

export default DatePickerField