import { Input } from 'antd'
import { ErrorMessage, useFormikContext } from 'formik'

type TextFieldProps = {
  displayName: string;
  fieldName: string;
}

const TextField = ({displayName, fieldName}: TextFieldProps) => {
  const {handleChange} = useFormikContext<any>();
  return (
    <>
    <label className="mb-2" htmlFor={fieldName}>
      {displayName}
    </label>
    <Input type="text" name={fieldName} id={fieldName} onChange={handleChange} />
    <ErrorMessage
      name={fieldName}
      component="div"
      children={(error) => <div className="text-[#ff4d4f]">{error}</div>}
    />
    </>
  )
}

export default TextField