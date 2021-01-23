import React from 'react';
import classNames from 'classnames';
import './container.css';

interface IContainerProps  {
  children: React.ReactNode,
  className?: string,
}

const Container: React.FC<IContainerProps> = (props) => {

  const { children, className } = props;

  const classes = classNames(
    'container',
    className
  ) 

  return (
    <div  className={classes}>
      {children}
    </div>
  );
}

export default Container;