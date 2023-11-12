import { Input } from "antd";
import { ErrorMessage, useFormikContext } from "formik";

type TextFieldProps = {
  displayName: string;
  fieldName: string;
};

const TextField = ({ displayName, fieldName }: TextFieldProps) => {
  const { handleChange, values, errors } = useFormikContext<any>();
  return (
    <div className="flex flex-col mt-4 mb-2">
      <label className="mb-2" htmlFor={fieldName}>
        {displayName}
      </label>
      <Input
        // status={errors[fieldName] ? "error" : undefined}
        type="text"
        name={fieldName}
        id={fieldName}
        value={values[fieldName]}
        onChange={handleChange}
      />
      <ErrorMessage
        name={fieldName}
        component="div"
        children={(error) => <div className="text-[#ff4d4f]">{error}</div>}
      />
    </div>
  );
};

export default TextField;
