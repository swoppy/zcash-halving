import React from 'react';

type SimpleLinkProps = {
  to: string;
  target: string;
  text: string | React.ReactNode;
  className?: string;
};

export const SimpleLink = ({ to, target, text, className }: SimpleLinkProps) => {
  return (
    <a href={to} rel="noopener noreferrer" target={target} className={className}>
      {text}
    </a>
  );
};