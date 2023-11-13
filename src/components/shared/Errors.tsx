import { Alert } from 'antd'

type ErrorsProps = {
  errors?: string[];
}

const Errors = ({errors}: ErrorsProps) => {
  return (
    <div className='mt-4 mb-2'>
      {errors?.map((error, index) => (
        <Alert
          key={index}
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      ))}
    </div>
  )
}

export default Errors