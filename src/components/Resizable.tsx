import './Resizable.css';
import { ResizableBox } from "react-resizable";

interface ResizableProp {
  direction: 'vertical' | 'horizontal';
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProp> = ({ direction, children }) => {
  return(
    <ResizableBox height={300} width={Infinity} resizeHandles={['s']}>
        {children}
    </ResizableBox>
  );
}

export default Resizable;