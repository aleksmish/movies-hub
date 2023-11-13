import { Space, Spin } from 'antd';

type SpinProps = {
  className?: string;
}

const CustomSpin = ({className}: SpinProps) => (
  <Space className={className} direction="vertical" style={{ width: '100%' }}>
    <Spin tip="Loading" size="default">
      <div className="content" />
    </Spin>
  </Space>
);

export default CustomSpin;