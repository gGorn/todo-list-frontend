import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UpdateTask = ({ show, setShow, task, setTask }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(task?.text || "");
  }, [task]);

  const handleUpdateTask = () => {
    if (!input.trim()) return;
    setTask(task.id, input.trim());
    setInput("");
    setShow(false);
  };

  return (
    <>
      <Dialog open={show} onOpenChange={setShow}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <Input
              placeholder="Add a task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdateTask();
              }}
              className="flex-1"
            />
            <Button onClick={handleUpdateTask}>Enter</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateTask;
