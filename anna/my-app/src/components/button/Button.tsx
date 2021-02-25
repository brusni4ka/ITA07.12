import React from 'react';
import classNames from 'classnames';
import './button.css';

interface IButtonProps {
  children: React.ReactNode,
  id?: string,
  className: string,
  href?: string,
  type?: "button" | "submit" | "reset",
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const Button: React.FC<IButtonProps> = (props) => {

  const { children, onClick, className, ...attrs } = props;

  const classes = classNames(
    'btn',
    className,    
  );

  const Tag = attrs.href ? 'a' : 'button';

  return (
    <Tag
      {...attrs}
      className={classes}
      onClick={(e: React.MouseEvent<HTMLButtonElement>): void => { e.preventDefault(); onClick(e) }}
    >{children}
    </Tag>
  );
}

export default Button;