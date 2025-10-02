// Array local con habitaciones (podés editar/expandir libremente)
const servicios = [
  {
    id: 1,
    titulo: "Habitación Simple",
    imagen: "simple.png",    
    camas: "1 cama de 2 plazas",
    capacidad: 2,
    precio: 45_000,
    amenities: ["Wi-Fi", "TV 32\"", "Aire acondicionado"],
  },
  {
    id: 2,
    titulo: "Habitación Doble",
    imagen: "doble.png",
    camas: "2 camas de 2 plazas",
    capacidad: 4,
    precio: 50_000,
    amenities: ["Wi-Fi", "TV 40\"", "Heladera", "Cocina"],
  },
  {
    id: 3,
    titulo: "Suite Deluxe",
    imagen: "suite.jpg",
    camas: "1 cama king",
    capacidad: 3,
    precio: 100_000,
    amenities: ["Wi-Fi", "Smart TV", "Hidromasaje", "Balcón"],
  },
];

export default servicios;
