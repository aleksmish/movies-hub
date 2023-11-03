import { Checkbox } from 'antd';
import { useFormikContext } from 'formik';

type CheckboxFieldProps = {
  displayName: string;
  fieldName: string;
}

const CheckboxField = ({displayName, fieldName}: CheckboxFieldProps) => {
  const {values} = useFormikContext<any>()
  return (
    <div className='mt-4 mb-2 flex flex-col'>
      <Checkbox className="text-[16px]" name={fieldName} id={fieldName}>{displayName}</Checkbox>
    </div>
  )
}

export default CheckboxField