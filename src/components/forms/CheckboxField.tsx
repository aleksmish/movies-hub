import { Checkbox } from 'antd';
import { ErrorMessage, useFormikContext } from 'formik';

type CheckboxFieldProps = {
  displayName: string;
  fieldName: string;
}

const CheckboxField = ({displayName, fieldName}: CheckboxFieldProps) => {
  const {handleChange} = useFormikContext<any>()
  return (
    <div className='mt-4 mb-2 flex flex-col'>
      <Checkbox className="text-[16px]" name={fieldName} id={fieldName} onChange={handleChange}>{displayName}</Checkbox>
      <ErrorMessage
        name={fieldName}
        component="div"
        children={(error) => <div className="text-[#ff4d4f]">{error}</div>}
      />
    </div>
  )
}

export default CheckboxField