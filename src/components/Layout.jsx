import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import TaskList from "./tasks/TaskList";
import LeftSidebar from "./LeftSidebar";
import ActionPanel from "./ActionPanel";

import { useSelector } from "react-redux";

export default function Layout() {
  const selectedTask = useSelector((state) => state.tasks.selectTask);
  const isSidebarOpen = useSelector((state) => state.layout.isSidebarOpen);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[92vh] max-w-md border md:min-w-[100vw] border-none rounded-none"
    >
      {isSidebarOpen && (
        <ResizablePanel className="hidden lg:block" defaultSize={25}>
          <LeftSidebar />
        </ResizablePanel>
      )}

      <ResizablePanel
        defaultSize={isSidebarOpen ? (selectedTask ? 50 : 75) : 100}
      >
        <TaskList />
      </ResizablePanel>

      {selectedTask && (
        <ResizablePanel className="hidden lg:block" defaultSize={25}>
          <ActionPanel />
        </ResizablePanel>
      )}
    </ResizablePanelGroup>
  );
}
