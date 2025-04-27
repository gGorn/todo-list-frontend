import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import UpdateTask from "@/components/modal/UpdateTask";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({});
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  // Fetch tasks from cookies when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (!input.trim()) return;
    setTasks((prev) => [
      {
        id: Date.now(),
        text: input.trim(),
        completed: false,
      },
      ...prev,
    ]);
    setInput("");
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id, newText) => {
    if (!newText) return;
    if (newText.trim() === "") return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: newText.trim() } : task
      )
    );
  };
  const handleClickEditTask = (task) => {
    setTask(task);
    setShow(true);
  };
  const completedCount = tasks.filter((t) => t.completed).length;
  const uncompletedCount = tasks.length - completedCount;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-center w-96">To Do List</h1>

      <div className="flex gap-2">
        <Input
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
          className="flex-1"
        />
        <Button onClick={handleAddTask}>Add</Button>
      </div>

      <h2 className="text-xl font-semibold">Task List</h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleToggleComplete(task.id)}
              />
              <span
                className={`${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.text}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleClickEditTask(task)}
                className="bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={task.completed}
              >
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Separator />
      <UpdateTask
        show={show}
        setShow={setShow}
        task={task}
        setTask={handleEditTask}
      />
      <div className="text-center text-sm">
        Completed: {completedCount} | Uncompleted: {uncompletedCount}
      </div>
    </div>
  );
}
