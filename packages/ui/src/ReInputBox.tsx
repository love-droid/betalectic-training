import { ReuseInput } from "@locoworks/reusejs-react-input";
import { ChangeEvent } from "react";

interface InputProps {
    type:string;
  classname?: string;
  placeholder?:string;
  value?:string;
  name?:string;
  checked?: boolean
  handleChange:(value: string) => void;
}

const ReuseInputBox = ({type,placeholder,value, classname,name ,handleChange,checked=false}: InputProps) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.value);
      };
  return <ReuseInput type={type} name={name} placeholder={placeholder} value={value} checked={checked} className={classname} onChange={handleInputChange}/>;
};

export default ReuseInputBox;