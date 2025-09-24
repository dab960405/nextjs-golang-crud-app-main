"use client";
import React, { useState } from "react";
import { siteConfig } from "../config/site";
import { useSession } from "next-auth/react";

export default function EditUserForm({ user, onCancel, onUpdated }: { user: any; onCancel: () => void; onUpdated: () => void }) {
  const { data: session } = useSession();
  const [form, setForm] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${siteConfig.localApi}/user/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("✅ Usuario actualizado");
      onUpdated();
    } else {
      alert("⛔ Error: " + JSON.stringify(data));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="border p-2" />
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2" />
      <input name="date" type="date" value={form.date?.slice(0,10)} onChange={handleChange} className="border p-2" />
      <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2" />
      <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="border p-2" />
      <input name="password" type="password" value={form.password || ""} onChange={handleChange} placeholder="New password" className="border p-2" />

      <div className="flex gap-2 mt-3">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
      </div>
    </form>
  );
}