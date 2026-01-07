"use client";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

export default function error() {
  return (
    <div>
      <ErrorMessage />
      <p>Could not fetch the list of notes. </p>
    </div>
  );
}
