import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { ConvertJob } from "@/abi";
import SortableFileRow from "./SortableFileRow";

type Props = {
  jobs: ConvertJob[];
  onRemove: (id: string) => void;
  onConvertOne: (id: string) => void;
  onReorder: (from: number, to: number) => void;
  disabled?: boolean;
};

export default function FileList({
  jobs,
  onRemove,
  onConvertOne,
  onReorder,
  disabled = false,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!jobs.length) return null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = jobs.findIndex((j) => j.id === active.id);
    const newIndex = jobs.findIndex((j) => j.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    onReorder(oldIndex, newIndex);
  };

  const ids = jobs.map((j) => j.id);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="space-y-2.5">
          {jobs.map((job) => (
            <SortableFileRow
              key={job.id}
              job={job}
              onRemove={onRemove}
              onConvertOne={onConvertOne}
              disabled={disabled || job.status === "processing"}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}