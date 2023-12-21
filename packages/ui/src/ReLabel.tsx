interface LabelProps {
    classname?: string;
    text: string;
  }
  
  function Label ({ text,classname }:LabelProps) {
    return (
      <label className={classname}>
        {text}
      </label>
    );
  }

  export default Label;