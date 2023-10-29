import { Button, ButtonProps as BaseButtonProps } from 'antd';

type ButtonProps = BaseButtonProps;

const CustomButton = (props: ButtonProps) => {
  return (
    <Button {...props}></Button>
  )
}

export default CustomButton