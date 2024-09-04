// src/pages/About.tsx

import React from "react";

const About: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">Sobre Nosotros</h1>
      
      {/* Introducción */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-sea-700 mb-4">
          ¡Bienvenido al mundo de amigurumis! Somos una pequeña empresa dedicada a la creación artesanal de amigurumis, esos adorables muñecos de crochet que han capturado corazones en todo el mundo.
        </p>
        <p className="text-sea-700 mb-4">
          Nuestra pasión por el arte del tejido y la costura nos impulsa a crear piezas únicas que no solo son juguetes, sino compañeros llenos de amor y personalidad. Cada amigurumi es hecho a mano con cuidado y atención al detalle, garantizando que cada uno tenga su propio carácter y encanto.
        </p>
      </div>

      {/* Misión, Visión y Valores */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Nuestra Misión</h2>
        <p className="text-sea-700 mb-4">
          Llevar sonrisas y alegría a personas de todas las edades a través de nuestros amigurumis, hechos con amor y dedicación.
        </p>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Nuestra Visión</h2>
        <p className="text-sea-700 mb-4">
          Ser reconocidos como una pyme líder en la creación de amigurumis personalizados, destacando por la calidad y originalidad de nuestros diseños.
        </p>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Nuestros Valores</h2>
        <ul className="list-disc list-inside text-sea-700">
          <li>Creatividad: Cada pieza es una obra de arte única.</li>
          <li>Calidad: Solo utilizamos materiales de alta calidad para asegurar la durabilidad y seguridad de nuestros amigurumis.</li>
          <li>Pasión: Amamos lo que hacemos y se refleja en cada punto de crochet.</li>
          <li>Compromiso: Nos comprometemos a ofrecer el mejor servicio a nuestros clientes, garantizando su satisfacción con cada compra.</li>
        </ul>
      </div>

      {/* Historia */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Nuestra Historia</h2>
        <p className="text-sea-700 mb-4">
          Todo comenzó con una simple afición por el crochet y un amor por los peluches. Lo que empezó como un hobby pronto se convirtió en una pasión, y así nació nuestra pyme. Desde nuestros humildes comienzos, hemos crecido gracias al apoyo de nuestros maravillosos clientes, quienes aprecian la calidez y dedicación que ponemos en cada amigurumi.
        </p>
        <p className="text-sea-700">
          Hoy en día, seguimos dedicándonos a crear amigurumis que no solo son adorables, sino que también llevan consigo el amor y la dedicación que ponemos en cada pieza. Estamos agradecidos por la oportunidad de compartir nuestro arte con el mundo y esperamos seguir creando pequeños amigos para muchos más hogares.
        </p>
      </div>
    </div>
  );
};

export default About;
