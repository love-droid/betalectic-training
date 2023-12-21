import {ReuseButton} from '@locoworks/reusejs-react-button'

interface ButtonProps {
  classname: string;
  text: string;
  handleSubmit: () => void;
}

function Button({ classname, text, handleSubmit }:ButtonProps){
  return (
    <ReuseButton className={classname} onClick={handleSubmit}>
      {text}
    </ReuseButton>
  );
}

export default Button;