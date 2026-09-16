import type { ConvertJob } from "../types/converter";
import FileRow from "./FileRow";

type Props = {
  jobs: ConvertJob[];
  onRemove: (id: string) => void;
  onConvertOne: (id: string) => void;
};

export default function FileList({ jobs, onRemove, onConvertOne }: Props) {
  if (!jobs.length) return null;

  return (
    <div className="space-y-2.5">
      {jobs.map((job) => (
        <FileRow
          key={job.id}
          job={job}
          onRemove={onRemove}
          onConvertOne={onConvertOne}
        />
      ))}
    </div>
  );
}