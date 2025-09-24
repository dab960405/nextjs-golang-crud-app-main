"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { siteConfig } from "../../config/site";
import SignOutButton from "../../components/signout-button/page";
import EditUserForm from "../../components/edit-user-form";

export default function DashboardPage() {
  const { data: session } = useSession();  // ✅ obtener sesión en el cliente
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  // Obtener usuarios
  const getUsers = async () => {
    if (!session?.user?.token) return; // si no hay sesión -> no llama backend
    try {
      const res = await fetch(`${siteConfig.localApi}/users`, {
        headers: { Authorization: `Bearer ${session.user.token}` },
        cache: "no-store",
      });
      const data = await res.json();
      setUsers(data?.data?.items || []);
    } catch (err) {
      console.error("Error al traer usuarios", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener usuario por ID
  const getUserById = async (id: number) => {
    if (!session?.user?.token) return;
    try {
      const res = await fetch(`${siteConfig.localApi}/user/${id}`, {
        headers: { Authorization: `Bearer ${session.user.token}` },
      });
      const data = await res.json();
      alert("Usuario encontrado:\n" + JSON.stringify(data));
    } catch (err) {
      console.error("Error al traer usuario", err);
    }
  };

  // Eliminar usuario
  const deleteUser = async (id: number) => {
    if (!session?.user?.token) return;
    try {
      await fetch(`${siteConfig.localApi}/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.user.token}` },
      });
      alert(`Usuario con ID ${id} eliminado`);
      getUsers();
    } catch (err) {
      console.error("Error al eliminar", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [session]); // 👈 importante: cuando tengamos token, carga usuarios

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      {/* Navbar */}
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <nav>
            <SignOutButton
              className="absolute left-5 top-5 bg-teal-500 hover:bg-teal-700 text-white font-bold rounded-sm min-w-[70px] text-center"
            />
          </nav>
        </div>
      </header>

      <h1 className="mb-3 font-bold text-xl">All Users</h1>

      {/* Botón para añadir usuario */}
      <div className="w-full flex flex-row gap-5">
        <Link
          className="bg-teal-500 flex text-white font-bold flex-row p-3 mt-2 mb-2 rounded-lg w-40 text-center justify-center"
          href="/auth/signup"
          passHref
        >
          Add User
        </Link>
      </div>

      {/* Lista con CRUD */}
      <ul className="w-full grid grid-cols-1 gap-2 md:grid-cols-2">
        {users.map((item: any) => (
          <li
            key={item.id}
            className="w-full mx-auto p-6 bg-teal-500 text-white rounded-md"
          >
            <p>
              <strong>{item.username}</strong> - {item.email}
            </p>
            <p>
              {item.name} | {item.city}, {item.country}
            </p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => getUserById(item.id)}
                className="bg-blue-500 px-3 py-1 rounded"
              >
                Ver
              </button>
              <button
                onClick={() => setEditingUser(item)}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => deleteUser(item.id)}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de Edición */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Editar Usuario</h2>
            <EditUserForm
              user={editingUser}
              onCancel={() => setEditingUser(null)}
              onUpdated={() => {
                setEditingUser(null);
                getUsers();
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}