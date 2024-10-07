import React, { ReactNode } from 'react';
import { Card as WindmillCard, CardBody } from '@windmill/react-ui';

interface CardProps {
  title: string;
  value: string | number;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, children: icon }) => {
  return (
    <WindmillCard>
      <CardBody className="flex items-center p-6">
        {icon}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{value}</p>
        </div>
      </CardBody>
    </WindmillCard>
  );
};

export default Card;
