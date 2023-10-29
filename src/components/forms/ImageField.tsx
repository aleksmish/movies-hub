import { Button, Image, Input } from 'antd';
import { ChangeEvent, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { useFormikContext } from 'formik';

type ImageFieldProps = {
  displayName: string;
  fieldName: string;
  imageURL?: string;
}

const ImageField = (props: ImageFieldProps) => {
  const [imageBase64, setImageBase64] = useState('')
  const [imageURL, setImageURL] = useState(props.imageURL || "")
  const {values} = useFormikContext<any>()
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      if (file) {
        convertImageToBase64(file)
          .then((base64: string) => setImageBase64(base64))
          .catch(error => console.error(error));
        values[props.fieldName] = file;
        setImageURL("")
      } else {
        setImageBase64('');
      }
    }
  }

  const convertImageToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <div className='flex flex-col mt-4 mb-2'>
      <label className='mb-2' htmlFor={props.fieldName}>{props.displayName}</label>
      <Button className='max-w-[200px]' icon={<UploadOutlined />}><label className='mb-2' htmlFor={props.fieldName}>Upload an Image</label></Button>
      <Input type="file" accept=".jpg,.jpeg,.png" onChange={handleChange} name={props.fieldName} id={props.fieldName} className='hidden' />
      {imageBase64
        ?
        <div className='mt-4 max-w-[300px]'>
          <Image
            className=' rounded-md'
            width={300}
            src={imageBase64}
            alt="selected image"
          />
        </div>
        :
          null
      }
      {imageURL
        ?
        <div className='mt-4 max-w-[300px]'>
          <Image
            className=' rounded-md'
            width={300}
            src={imageURL}
            alt="selected image"
          />
        </div>
        :
          null
      }
    </div>
  )
}

export default ImageField