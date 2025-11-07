"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [todoList, setTodoList] = useState([]);

  const [groupedTodos, setGroupedTodos] = useState([]);

  useEffect(() => {
    const grouped = Object.values(
      todoList.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = {
            title: item.category,
            values: [],
          };
        }

        acc[item.category].values.push(item);
        return acc;
      }, {})
    );

    setGroupedTodos(grouped); // reduce bittikten SONRA state'i güncelle
  }, [todoList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const category = formData.get("category");
    const uuid = crypto.randomUUID();

    setTodoList((prev) => [
      ...prev,
      { id: uuid, task: title, completed: false, category: category },
    ]);

    e.target.reset();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
      >
        <h2 className="pb-3 text-2xl font-bold">Add To Do</h2>
        <span className="flex items-center justify-center gap-3">
          <Input type="text" name="title" placeholder="Title" className="p-5" />
          <Input type="text" name="category" placeholder="Todo Category" className="p-5" />
          <Button type="submit" variant="outline" className="cursor-pointer p-5">Submit</Button>
        </span>
      </form>
      <pre>
        {JSON.stringify(todoList, null, 2)}
      </pre>
    </div>
  );
}
