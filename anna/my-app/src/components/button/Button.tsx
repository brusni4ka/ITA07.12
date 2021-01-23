import React from 'react';
import classNames from 'classnames';
import './button.css';

interface IButtonProps {
  children: React.ReactNode,
  className: string,
  active: boolean,
  href?: string,
  type?: "button" | "submit" | "reset" | undefined,
  onClick: Function
}

const Button: React.FC<IButtonProps> = (props) => {

  const { children, onClick, className, active, ...attrs } = props;

  const classes = classNames(
    'btn',
    className,
    { active },
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