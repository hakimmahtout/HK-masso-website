"use client";
import { Search } from "lucide-react";

import Button from "@/app/_ui/Button";

export default function EmptyState({ title, text, action, onAction }) {
  return (
    <div className="my-12 rounded-lg border border-dashed border-border p-10 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">
        <Search size={21} />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      {action && (
        <Button className="mt-5" variant="outline" onClick={onAction}>
          {action}
        </Button>
      )}
    </div>
  );
}
