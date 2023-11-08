import { Card } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useFormikContext } from 'formik';
import Markdown from 'react-markdown';

type MarkdownFieldProps = {
  displayName: string;
  fieldName: string;
}

const MarkdownField = ({displayName, fieldName}: MarkdownFieldProps) => {
  const {values, handleChange} = useFormikContext<any>();
  return (
    <div className='flex flex-row content-center gap-5 mt-4 mb-2'>
      <div className='w-[calc(50%-20px)]'>
        <label htmlFor={fieldName}>{displayName}</label>
        <div>
          <TextArea className='w-full' onChange={handleChange} name={fieldName} id={fieldName} value={values[fieldName]} />
        </div>
      </div>
      <div className='w-[calc(50%-20px)]'>
        <label htmlFor='preview'>{displayName} (preview):</label>
        <div>
          <Markdown>{values[fieldName]}</Markdown>
        </div>
      </div>
    </div>
  )
}

export default MarkdownField