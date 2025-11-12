import Svg, { Path } from "react-native-svg";

import type { JSX } from "react";
import type { NumberProp, SvgProps } from "react-native-svg";

type CheckmarkProps = SvgProps & {
  size?: NumberProp;
  color?: string;
};

type CheckmarkType = (props: CheckmarkProps) => JSX.Element;

const Checkmark: CheckmarkType = ({
  size = 15,
  color = "#51ACB4",
  ...props
}) => {
  //

  const width = size;
  const height = Number(size) * (11 / 15);

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 15 11"
      fill="none"
      {...props}
    >
      <Path
        d="M1.5 5.333l3.833 3.834L13 1.5"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export { Checkmark };
export type { CheckmarkProps, CheckmarkType };
