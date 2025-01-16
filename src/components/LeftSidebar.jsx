import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  ListTodo,
  Star,
  Clock,
  UserSquare2,
  Plus,
  LogOut,
  Info,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/authSlice";

const LeftSidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const completedTasks = tasks.filter((task) => task.isDone).length;
  const pendingTasks = tasks.length - completedTasks;
  const totalTasks = tasks.length;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full h-[95vh] bg-card flex flex-col dark:bg-[#2C2C2C] border-none">
      <div className="p-4 border-b">
        <div className="flex flex-col items-center gap-3 dark:text-white">
          <Avatar className="h-28 w-28">
            <AvatarImage src="person.jpeg" className="object-cover" />
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Hey,{user ? user : "ABCD"}</h3>
            <Button variant="link" onClick={handleLogout}>
              <LogOut className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-[#EEF6EF] px-2 pb-10 lg:p-10 dark:bg-[#2C2C2C]">
        <nav className="space-y-2 bg-white dark:text-white dark:bg-[#232323]">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-[#EEF6EF] hover:text-green-800"
          >
            <ListTodo className="mr-2 h-4 w-4" />
            All Tasks
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-[#EEF6EF] hover:text-green-800"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Today
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-[#EEF6EF] hover:text-green-800"
          >
            <Star className="mr-2 h-4 w-4" />
            Important
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-[#EEF6EF] hover:text-green-800"
          >
            <Clock className="mr-2 h-4 w-4" />
            Planned
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-[#EEF6EF] hover:text-green-800"
          >
            <UserSquare2 className="mr-2 h-4 w-4" />
            Assigned to me
          </Button>
        </nav>

        <div className="mt-6">
          <Button
            className="w-full justify-start dark:bg-[#232323] dark:text-white"
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add list
          </Button>
        </div>

        <div className="mt-8 bg-white dark:bg-[#232323] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium dark:text-white">All Tasks</div>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Info className="h-4 w-4 dark:text-white" />
            </Button>
          </div>
          <div className="text-3xl font-bold dark:text-white mb-6">
            {totalTasks}
          </div>

          <div className="relative w-28 lg:w-48 h-28 lg:h-48 mx-auto">
            <svg
              viewBox="0 0 100 100"
              className="transform -rotate-90 w-full h-full"
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="transparent"
                strokeWidth="12"
              />

              {/* Completed tasks segment */}
              {completedTasks > 0 && (
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#1a4d1a"
                  strokeWidth="12"
                  strokeDasharray={`${
                    (completedTasks / totalTasks) * 251.2
                  } 251.2`}
                  strokeDashoffset="0"
                />
              )}

              {/* Pending tasks segment */}
              {pendingTasks > 0 && (
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="12"
                  strokeDasharray={`${
                    (pendingTasks / totalTasks) * 251.2
                  } 251.2`}
                  strokeDashoffset={`${-(completedTasks / totalTasks) * 251.2}`}
                />
              )}
            </svg>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 dark:text-white">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1a4d1a]" />
              <span className="text-sm text-muted-foreground">Done</span>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default LeftSidebar;
