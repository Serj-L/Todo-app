import { FC } from 'react';

interface CheckIconProps {
  width?: number,
  height?: number,
  strokeWidth?: number,
  color?: string;
}

const CheckIcon: FC<CheckIconProps> = ({
  width = 11,
  height = 9,
  strokeWidth = 2,
  color = 'none',

}) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <path
          fill={color}
          stroke="#FFF"
          strokeWidth={strokeWidth}
          d="M1 4.304L3.696 7l6-6"
        />
      </svg>
    </>
  );
};

export default CheckIcon;
