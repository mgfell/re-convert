type Props = {
  progress: number;
};

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="w-full">
      <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full bg-white/70 transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}