import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Bell,
  Calendar,
  RotateCcw,
  FileText,
  X,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTaskPriority,
  deleteTask,
  markAsDone,
  selectTask,
} from "../app/taskSlice";
import { Select, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import moment from "moment";

const ActionPanel = () => {
  const selectedTaskId = useSelector((state) => state.tasks.selectTask);
  const selectedTask = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === selectedTaskId)
  );
  const dispatch = useDispatch();
  // Mark as done
  const handleMAD = (id) => {
    dispatch(markAsDone(id));
  };
  // Select task
  const handleSelectTask = () => {
    dispatch(selectTask(null));
  };
  const handlePriorityChange = (priority) => {
    dispatch(changeTaskPriority({ id: selectedTask.id, priority }));
  };

  // Delete task
  const handleDeleteTask = () => {
    dispatch(deleteTask(selectedTask.id));
    dispatch(selectTask(null));
  };

  return (
    <div className="relative w-full h-[95vh] pt-6 bg-[#EEF6EF] dark:bg-[#2C2C2C] dark:text-white ">
      <ScrollArea className="h-full p-4">
        {selectedTask && (
          <div className="space-y-4">
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none border-b border-neutral-300"
            >
              <Checkbox
                checked={selectedTask.isDone}
                onCheckedChange={() => handleMAD(selectedTask.id)}
                className="mr-2 h-4 w-4"
              />
              <span
                className={`flex-1 cursor-pointer ${
                  selectedTask.isDone
                    ? "line-through text-muted-foreground"
                    : ""
                }`}
              >
                {selectedTask.task}
              </span>
              <Select
                defaultValue={selectedTask.priority}
                onValueChange={handlePriorityChange}
              >
                <SelectTrigger
                  className={`flex justify-center items-center space-x-1 ${
                    selectedTask.priority === "High"
                      ? "text-red-500"
                      : selectedTask.priority === "Medium"
                      ? "text-yellow-500"
                      : selectedTask.priority === "Low"
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder={selectedTask.priority} />
                  <ChevronDown />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low" className="text-green-500">
                    Low
                  </SelectItem>
                  <SelectItem value="Medium" className="text-yellow-500">
                    Medium
                  </SelectItem>
                  <SelectItem value="High" className="text-red-500">
                    High
                  </SelectItem>
                </SelectContent>
              </Select>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start rounded-none border-b-neutral-300  border-b border-neutral-300"
            >
              <Plus className="mr-2 h-4 w-4 " />
              Add Step
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start rounded-none border-b-neutral-300  border-b border-neutral-300"
            >
              <Bell className="mr-2 h-4 w-4" />
              Set Reminder
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start rounded-none border-b-neutral-300  border-b border-neutral-300"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Add Due Date
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start rounded-none border-b-neutral-300 border-b border-neutral-300 "
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Repeat
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start rounded-none border-b border-neutral-300"
            >
              <FileText className="mr-2 h-4 w-4" />
              Add Notes
            </Button>
          </div>
        )}
      </ScrollArea>
      <footer className="absolute bottom-10 border-t border-neutral-300 w-full  p-4 bg-muted/20 flex justify-between">
        <Button
          className="hidden lg:block"
          variant="link"
          onClick={handleSelectTask}
        >
          <X className="scale-125" />
        </Button>
        <div className="flex items-center text-xs text-muted-foreground">
          Created{"  "}
          {moment(selectTask.createdAt).fromNow()}
        </div>
        <Button variant="link" onClick={handleDeleteTask}>
          <Trash2 className=" scale-125" />
        </Button>
      </footer>
    </div>
  );
};

export default ActionPanel;
