"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Item } from "@/components/ui/item";

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
    const category = formData.get("category").toLocaleLowerCase();
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
      <div className="grid grid-cols-3 gap-5 mt-12 items-start">
        {
          groupedTodos.map((group, key) => {
            return (
              <Card key={key}>
                <CardHeader className="font-bold text-lg capitalize">{group.title}</CardHeader>
                <Separator />
                <CardContent className="overflow-auto flex flex-col gap-4">
                  {group.values.map((todo, todoKey) => {
                    return (
                      <Item
                        className="m-0 p-2 bg-accent cursor-pointer transition-colors hover:bg-accent/80 rounded-md"
                        key={todoKey}
                      >
                        <span className="text-base line-through decoration-2 decoration-neutral-400 text-neutral-400">
                          {todo.task + "\n"}
                        </span>
                      </Item>
                    )
                  })}
                </CardContent>
              </Card>
            )
          })
        }
      </div>
      <pre>
        {JSON.stringify(groupedTodos, null, 2)}
      </pre>
    </div>
  );
}
