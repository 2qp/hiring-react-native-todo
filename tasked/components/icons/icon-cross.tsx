import Svg, { Path } from "react-native-svg";

import type { NumberProp, SvgProps } from "react-native-svg";

type CrossProps = SvgProps & {
  size?: NumberProp;
  color?: string;
};

const Cross: React.FC<CrossProps> = ({
  size = 48,
  color = "#51ACB4",
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12a1.5 1.5 0 011.5 1.5v9h9a1.5 1.5 0 010 3h-9v9a1.5 1.5 0 01-3 0v-9h-9a1.5 1.5 0 010-3h9v-9A1.5 1.5 0 0124 12z"
        fill={color}
      />
    </Svg>
  );
};

export default Cross;
