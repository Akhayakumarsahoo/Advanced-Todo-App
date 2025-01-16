import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import TaskInput from "./TaskInput";
import { useSelector, useDispatch } from "react-redux";
import { markAsDone, selectTask } from "../../app/taskSlice";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import ActionPanel from "../ActionPanel";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const incompleteTasks = tasks
    .filter((task) => !task.isDone)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const completedTasks = tasks
    .filter((task) => task.isDone)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="flex-1 flex flex-col h-[95vh] dark:bg-[#2c2c2c]">
      <TaskInput />

      <ScrollArea className="flex-1 py-4">
        <div className="space-y-2 pb-28">
          {/* Incomplete tasks */}
          {incompleteTasks.map((task) => (
            <EachTask
              key={task.id}
              task={task}
              onMobileSelect={() => setIsSheetOpen(true)}
            />
          ))}

          <p className="flex items-center dark:text-white px-2">
            Completed <ChevronDown />
          </p>

          {/* Completed tasks */}
          {completedTasks.map((task) => (
            <EachTask
              key={task.id}
              task={task}
              onMobileSelect={() => setIsSheetOpen(true)}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Mobile Action Panel Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-[80%] sm:w-[440px] p-0 border-l dark:border-gray-800"
        >
          <ActionPanel onClose={() => setIsSheetOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

const EachTask = ({ task, onMobileSelect }) => {
  const selectedTaskId = useSelector((state) => state.tasks.selectTask);
  const dispatch = useDispatch();

  const handleMAD = (e) => {
    dispatch(markAsDone(task.id));
  };

  const handleSelectTask = () => {
    dispatch(selectTask(task.id));
    // Only trigger sheet open on mobile
    if (window.innerWidth < 1024) {
      onMobileSelect();
    }
  };

  return (
    <div
      onClick={handleSelectTask}
      className={`flex rounded-none items-center gap-2 p-2 border-b hover:bg-accent group pl-5 pr-10 dark:bg-[#2C2C2C] dark:text-white hover:bg-[#EEF6EF] hover:dark:bg-[#2F3630] cursor-pointer ${
        selectedTaskId === task.id ? "bg-[#EEF6EF] dark:bg-[#2F3630]" : ""
      }`}
    >
      <Checkbox
        checked={task.isDone}
        onCheckedChange={handleMAD}
        onClick={(e) => e.stopPropagation()}
        className=""
      />
      <span
        className={`flex-1 ${
          task.isDone ? "line-through text-muted-foreground" : ""
        }`}
      >
        {task.task}
      </span>
      <Button
        variant="link"
        size="icon"
        className={
          task.priority === "High"
            ? "text-red-500 dark:text-red-500"
            : task.priority === "Medium"
            ? "text-yellow-500 dark:text-yellow-500"
            : task.priority === "Low"
            ? "text-green-500 dark:text-green-500"
            : ""
        }
      >
        {task.priority}
      </Button>
    </div>
  );
};

export default TaskList;
