import { memo, useRef } from "react";
import { StyleSheet } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useTodos } from "../hooks/use-todos";
import { TodoItem } from "./todo-item";
import { RightAction } from "./todo-right-action";

import type { JSX } from "react";
import type { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import type { SharedValue } from "react-native-reanimated";
import type { Todo } from "../todo.types";

type TodoItemSwipeableProps = {
  todo: Todo;
};

type TodoItemSwipeableType = (props: TodoItemSwipeableProps) => JSX.Element;

const TodoItemSwipeable: TodoItemSwipeableType = ({ todo }) => {
  //

  const swipeableRef = useRef<SwipeableMethods>(null);

  const { remove } = useTodos()[1];

  const handleOnDelete = () => {
    remove(todo.id);
  };

  const RightActionWrapper = (
    progress: SharedValue<number>,
    drag: SharedValue<number>,
    swipeable: SwipeableMethods
  ) => (
    <RightAction
      drag={drag}
      onDelete={handleOnDelete}
      progress={progress}
      swipeable={swipeable}
    />
  );

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      containerStyle={styles.swipeable}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={RightActionWrapper}
      overshootRight={false}
    >
      <TodoItem todo={todo} />
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  swipeable: {
    backgroundColor: "#fff",
    paddingVertical: 0,
  },
});

const MemoizedTodoItemSwipeable = memo(TodoItemSwipeable);

export { MemoizedTodoItemSwipeable as TodoItemSwipeable };
export type { TodoItemSwipeableProps, TodoItemSwipeableType };

