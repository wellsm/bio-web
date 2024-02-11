import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
  DraggableProvided,
  DroppableProvided,
  Direction,
  TypeId,
  DropResult,
} from "@hello-pangea/dnd";

import "@/app/css/draggable.css";

interface DraggableListProps<T> {
  droppableId: string;
  data: T[];
  onDragEnd?: OnDragEndResponder;
  onReorder?: (items: T[]) => void;
  renderItem: (item: T, provided?: DraggableProvided) => JSX.Element;
  direction?: Direction;
  type?: TypeId;
  active?: boolean;
}

export const DraggableList = <T extends { id: number }>({
  droppableId,
  data,
  onDragEnd,
  renderItem,
  onReorder,
  direction = "horizontal",
  type = "list",
  active = true,
}: DraggableListProps<T>) => {
  const onDefaultDragEnd: OnDragEndResponder = (result: DropResult) => {
    if (!result.destination || !onReorder) {
      return;
    }

    onReorder(reorder(data, result.source.index, result.destination.index));
  };

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
  }

  return active ? (
    <DragDropContext onDragEnd={onDragEnd ?? onDefaultDragEnd}>
      <Droppable droppableId={droppableId} type={type} direction={direction}>
        {(provided: DroppableProvided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {data.map((item, index) => (
              <Draggable
                key={item.id}
                index={index}
                draggableId={String(item.id)}
              >
                {(provided: DraggableProvided) => renderItem(item, provided)}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : (
    <>
      {data.map((item) => renderItem(item))}
    </>
  );
};
