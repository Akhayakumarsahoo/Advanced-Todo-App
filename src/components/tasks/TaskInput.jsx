import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../app/taskSlice";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Bell, Calendar, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { nanoid } from "@reduxjs/toolkit";
import { Label } from "../ui/label";
export default function TaskInput() {
  let [newTask, setNewTask] = useState({
    id: nanoid(),
    task: "",
    isDone: false,
    priority: "Low",
    createdAt: new Date().toISOString(),
  });
  let dispatch = useDispatch();

  function handleAddTask(e) {
    e.preventDefault();
    if (newTask.task.length === 0) return;
    dispatch(addTask(newTask));
    setNewTask({ ...newTask, task: "" });
  }
  return (
    <div className="p-4 bg-gradient-to-t from-[#3579371A] to-[#D0FFD21A] dark:bg-[#2F3630] ">
      <Input
        placeholder="Add A Task"
        value={newTask.task}
        onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
        className="bg-transparent dark:bg-transparent border-none text-lg placeholder:text-muted-foreground focus-visible:ring-transparent pl-2 mb-2"
      />
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center lg:gap-8">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4 text-muted-foreground dark:text-white" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RotateCcw className="h-4 w-4 text-muted-foreground dark:text-white" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Calendar className="h-4 w-4 text-muted-foreground dark:text-white" />
          </Button>
          <div className="flex items-center gap-1">
            <Label htmlFor="priority" className="dark:text-white">
              Priority:{" "}
            </Label>
            <Select
              id="priority"
              defaultValue={newTask.priority}
              onValueChange={(value) =>
                setNewTask({ ...newTask, priority: value })
              }
            >
              <SelectTrigger
                variant="link"
                className={`bg-transparent dark:bg-transparent ${
                  newTask.priority === "High"
                    ? "text-red-500"
                    : newTask.priority === "Medium"
                    ? "text-yellow-500"
                    : newTask.priority === "Low"
                    ? "text-green-500"
                    : ""
                }`}
              >
                <SelectValue
                  className="bg-transparent dark:bg-transparent"
                  placeholder={newTask.priority}
                />
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
          </div>
        </div>
        <Button
          onClick={handleAddTask}
          className="bg-[#35793729] dark:bg-[#357937E0] dark:text-white hover:bg-[#35793729] focus-visible:ring-transparent text-green-800 rounded text-xs px-4 h-7"
        >
          ADD TASK
        </Button>
      </div>
    </div>
  );
}
