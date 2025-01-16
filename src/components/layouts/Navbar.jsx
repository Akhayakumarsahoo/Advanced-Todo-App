import {
  LayoutGrid,
  MoonStar,
  Rows4,
  Search,
  Sun,
  TableOfContents,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "@/app/layoutSlice";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import LeftSidebar from "../LeftSidebar";

function Navbar() {
  const isSidebarOpen = useSelector((state) => state.layout.isSidebarOpen);
  const dispatch = useDispatch();

  const handleSidebar = () => {
    dispatch(openSidebar(isSidebarOpen));
  };

  const [isGridLayout, setIsGridLayout] = useState(false);
  const toggleGridLayout = () => {
    setIsGridLayout(!isGridLayout);
  };

  // Light button handle
  const [themeMode, setThemeMode] = useState("light");
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  return (
    <nav className="h-16 pr-5 flex justify-between items-center sticky top-0 bg-white dark:bg-[#242424] z-10">
      <div className="flex items-center">
        {/* For large devices */}
        <Button
          variant="link"
          onClick={handleSidebar}
          className="cursor-pointer hidden lg:block"
        >
          <TableOfContents className="scale-125" />
        </Button>
        {/* For small devices */}
        <Sheet className="lg:hidden">
          <SheetTrigger asChild>
            <Button variant="link" size="icon" className="lg:hidden w-16">
              <TableOfContents className="scale-125" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <LeftSidebar />
          </SheetContent>
        </Sheet>
        <div className="text-xl text-green-800 font-bold">DoIt</div>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <Search className="h-5 w-5 mr-2 dark:text-white" />
        </div>
        <div
          className={`cursor-pointer h-8 w-8 dark:text-white rounded-full flex items-center justify-center`}
        >
          <input
            id="layoutBtn"
            type="checkbox"
            className="sr-only peer"
            onChange={toggleGridLayout}
            checked={isGridLayout}
          />
          <label htmlFor="layoutBtn" className="cursor-pointer">
            {isGridLayout ? (
              <LayoutGrid className="h-5 w-5" />
            ) : (
              <Rows4 className="h-5 w-5" />
            )}
          </label>
        </div>
        <div
          className={`cursor-pointer h-8 w-8 dark:text-white rounded-full flex items-center justify-center`}
        >
          <input
            id="themeBtn"
            type="checkbox"
            className="sr-only peer"
            onChange={toggleTheme}
            checked={themeMode === "dark"}
          />
          <label htmlFor="themeBtn" className="cursor-pointer">
            {themeMode === "dark" ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Sun className="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Turn on Light</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MoonStar className="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Turn off Light</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </label>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
