type Props = {
  message: string;
};

export default function ErrorBanner({ message }: Props) {
  return (
    <div className="glass-soft rounded-2xl p-4 border border-red-400/20 text-red-300/90 text-sm">
      {message}
    </div>
  );
}