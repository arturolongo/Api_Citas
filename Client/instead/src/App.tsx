import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";
import "./App.css"

interface FormData {
  idCita: number; // Ahora definido como número
  NombrePaciente: string;
  Problema: string;
}

interface AgendaInfo {
  idServicio_Citas: number;
  descripcion: string;
}

export default function Home(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    idCita: 0, // Inicializado como número
    NombrePaciente: "",
    Problema: ""
  });

  const [socket, setSocket] = useState<Socket | null>(null);
  const [agendaInfo, setAgendaInfo] = useState<AgendaInfo | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("https://api-citasv2.onrender.com/citas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    console.log(result)
    
    toast.info('Processing pago, status: pending')
    console.log("se ha mandado un archivo")
  };

  useEffect(() => {
    console.log("Hola");
    
    if (socket) {
      const newSocket = io("https://ws-6g3l.onrender.com");
      newSocket.on("agenda", (agenda: AgendaInfo) => {
        console.log(agenda);
        toast.success('agenda');
        console.log("Se ha realizado el pago");
        setAgendaInfo(agenda); // Actualiza el estado de agendaInfo con los datos recibidos
      });
      setSocket(newSocket);
    }
    
    return () => {
      socket?.disconnect(); 
    };
  }, []);
  
  
  


  return (
    <main className="min-h-screen bg-gradient-to-r from-neutral-800 to-sky-800 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg flex flex-col min-w-[400px]"
      >
        <h1 className="text-3xl text-neutral-800 font-bold mb-4">Crear Cita</h1>
        <div className="mb-4">
          <label className="block text-neutral-800 font-semibold mb-2">
            ID Citas
          </label><br />
          <input
            type="number" // Cambiado a number
            name="idCita"
            value={formData.idCita}
            onChange={handleInputChange}
            className="bg-neutral-100 appearance-none border rounded w-full py-2 px-3 text-neutral-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-800 font-semibold mb-2">
            Nombre Paciente
          </label><br />
          <input
            type="text"
            name="NombrePaciente"
            value={formData.NombrePaciente}
            onChange={handleInputChange}
            className="bg-neutral-100 appearance-none border rounded w-full py-2 px-3 text-neutral-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-800 font-semibold mb-2">
            Problema
          </label><br />
          <textarea
            name="Problema"
            value={formData.Problema}
            onChange={handleInputChange}
            className="bg-neutral-100 appearance-none border rounded w-full py-2 px-3 text-neutral-800 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div><br />
        <button
          type="submit"
          className="bg-sky-800 p-2 text-white rounded font-semibold w-full"
        >
          Enviar
        </button>
        {agendaInfo && (
        <div>
          <h2>Pago Confirmado:</h2>
          <p>ID Pago: {agendaInfo.idServicio_Citas}</p>
          <p>PAGOID:{agendaInfo.descripcion}</p>
          
        </div>
      )}
      </form>
    </main>
  );
}