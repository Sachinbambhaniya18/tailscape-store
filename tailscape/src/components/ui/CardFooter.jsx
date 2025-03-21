import React from 'react';
import PropTypes from 'prop-types';

export function CardFooter({ children }) {
  return <div className="p-4 border-t">{children}</div>;
}

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
};
