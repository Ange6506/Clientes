import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    isActive: true,
  });

  const getCustomers = async () => {
    const response = await api.get("/customers");
    setCustomers(response.data);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleSubmit = async () => {

    const payload = {
      ...form,
      createdAt: new Date(),
    };

    if (editingId !== null) {

      await api.put(`/customers/${editingId}`, payload);

    } else {

      await api.post("/customers", payload);
    }

    setEditingId(null);

    setForm({
      fullName: "",
      email: "",
      phone: "",
      isActive: true,
    });

    getCustomers();
  };

  const handleEdit = (customer: any) => {

    setEditingId(customer.id);

    setForm({
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      isActive: customer.isActive,
    });
  };

  const handleDelete = async (id: number) => {

    await api.delete(`/customers/${id}`);

    getCustomers();
  };

  return (

    <div className="container">

      <div className="titulo">

        <h1>
          Administración de Clientes
        </h1>

        <p>
          Gestiona tus clientes fácilmente
        </p>

      </div>

      <div className="formulario">

        <h2>
          {editingId ? "Editar Cliente" : "Formulario de Cliente"}
        </h2>

        <div className="form-grid">

          <div className="campo">

            <label>
              Nombre Completo
            </label>

            <input
              type="text"
              value={form.fullName}
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
              placeholder="Ingresa el nombre completo"
            />

          </div>

          <div className="campo">

            <label>
              Correo Electrónico
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="Ingresa el correo"
            />

          </div>

          <div className="campo">

            <label>
              Número de Teléfono
            </label>

            <input
              type="text"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              placeholder="Ingresa el número"
            />

          </div>

          <div className="campo">

            <label>
              Estado
            </label>

            <select
              value={form.isActive ? "true" : "false"}
              onChange={(e) =>
                setForm({
                  ...form,
                  isActive: e.target.value === "true",
                })
              }
            >

              <option value="true">
                Activo
              </option>

              <option value="false">
                Inactivo
              </option>

            </select>

          </div>

        </div>

        <div className="botones">

          <button
            onClick={handleSubmit}
            className="btn-guardar"
          >

            {editingId ? "Actualizar Cliente" : "Guardar Cliente"}

          </button>

          <button
            onClick={() => {
              setEditingId(null);

              setForm({
                fullName: "",
                email: "",
                phone: "",
                isActive: true,
              });
            }}
            className="btn-limpiar"
          >

            Limpiar

          </button>

        </div>

      </div>

      <div className="tabla-container">

        <div className="tabla-header">

          <h2>
            Lista de Clientes
          </h2>

          <p>
            Clientes registrados en el sistema
          </p>

        </div>

        <div className="overflow">

          <table>

            <thead>

              <tr>

                <th>ID</th>

                <th>Nombre</th>

                <th>Correo</th>

                <th>Teléfono</th>

                <th>Estado</th>

                <th>Fecha Registro</th>

                <th>Acciones</th>

              </tr>

            </thead>

            <tbody>

              {customers.map((customer: any) => (

                <tr key={customer.id}>

                  <td>
                    {customer.id}
                  </td>

                  <td>
                    {customer.fullName}
                  </td>

                  <td>
                    {customer.email}
                  </td>

                  <td>
                    {customer.phone}
                  </td>

                  <td>

                    <span
                      className={
                        customer.isActive
                          ? "estado-activo"
                          : "estado-inactivo"
                      }
                    >

                      {customer.isActive ? "Activo" : "Inactivo"}

                    </span>

                  </td>

                  <td>

                    {customer.createdAt
                      ? new Date(customer.createdAt).toLocaleDateString()
                      : "Sin fecha"}

                  </td>

                  <td>

                    <div className="acciones">

                      <button
                        onClick={() => handleEdit(customer)}
                        className="btn-editar"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="btn-eliminar"
                      >
                        Eliminar
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Customers;