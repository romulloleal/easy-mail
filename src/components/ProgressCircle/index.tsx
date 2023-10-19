interface ProgresCircleProps {
  progress: number;
  remain: number;
}

const ProgressCircle = ({ progress, remain }: ProgresCircleProps) => {
  const size = 28;
  const trackWidth = 2;
  const indicatorWidth = 2;

  const center = size / 2;
  const radius =
    center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * ((100 - progress) / 100);

  return (
    <div className="flex items-center justify-center">
      <svg className={`h-7 w-7 rotate-[-90deg]`}>
        <circle
          className="stroke-gray-300"
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          strokeWidth={trackWidth}
        />
        <circle
          className="stroke-info"
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          strokeWidth={indicatorWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <span className="absolute text-xs">{remain}</span>
    </div>
  );
};

export default ProgressCircle;
