import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ConvertJob } from "@/abi";
import FileRow from "./FileRow";

type Props = {
  job: ConvertJob;
  onRemove: (id: string) => void;
  onConvertOne: (id: string) => void;
  disabled: boolean;
};

export default function SortableFileRow({
  job,
  onRemove,
  onConvertOne,
  disabled,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.85 : 1,
  } as const;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? "cursor-grabbing" : ""}`}
    >
      <div
        {...attributes}
        {...listeners}
        className={`
          absolute top-3.5 left-1.5 z-10 p-1.5 rounded-lg
          text-white/25 hover:text-white/60 hover:bg-white/[0.05]
          transition cursor-grab active:cursor-grabbing
          ${disabled ? "pointer-events-none opacity-30" : ""}
        `}
        aria-label="Drag to reorder"
      >
        <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
          <circle cx="3" cy="3" r="1.2" />
          <circle cx="9" cy="3" r="1.2" />
          <circle cx="3" cy="7" r="1.2" />
          <circle cx="9" cy="7" r="1.2" />
          <circle cx="3" cy="11" r="1.2" />
          <circle cx="9" cy="11" r="1.2" />
        </svg>
      </div>

      <div className="pl-5">
        <FileRow
          job={job}
          onRemove={onRemove}
          onConvertOne={onConvertOne}
        />
      </div>
    </div>
  );
}