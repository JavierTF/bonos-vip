"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    const adminId = uuidv4();
    await queryInterface.bulkInsert("Users", [
      {
        id: adminId,
        name: "Admin",
        lastName: "User",
        email: "admin@example.com",
        password:
          "$2a$10$HniiKFnQs7DBufgfR4ZSWOCB9PO7bWvt9GHaVJoAvs4l7DuivQlIu", // 'password123'
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        avatar: null,
      },
      {
        id: uuidv4(),
        name: "Normal",
        lastName: "User",
        email: "user@example.com",
        password:
          "$2a$10$.torAkwABb1lxKVmpJrbNu.10QT5yyujb6HevoZMcikwl4qrq2aCi", // 'User.2025'
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        avatar: null,
      },
    ]);

    await queryInterface.bulkInsert("Offers", [
      {
        id: uuidv4(),
        title: "Brunch Isla Baja para 2 con vistas de ensueño",
        shortDescription: "Experiencia gastronómica frente al mar",
        description:
          "Disfruta de un brunch completo para dos personas con vistas espectaculares al océano. Incluye selección de panes artesanales, embutidos selectos, huevos, café y cava.",
        images: ["/images/brunch-isla.jpeg"],
        category: "Restaurantes",
        placeName: "Restaurante Mirador de Garachico",
        location: JSON.stringify({ lat: 28.3717, lng: -16.5512 }),
        price: 60.0,
        discount: 42,
        userId: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: null,
      },
      {
        id: uuidv4(),
        title: "12 minutos + 2 vueltas de regalo en Karting Club Tenerife",
        shortDescription: "Adrenalina pura en el mejor circuito",
        description:
          "Siente la velocidad en el circuito de karts más moderno de la isla. Incluye equipo completo de seguridad y briefing con instructor.",
        images: ["/images/karting.jpeg"],
        category: "Ocio",
        placeName: "Karting Club Tenerife",
        location: JSON.stringify({ lat: 28.0489, lng: -16.5412 }),
        price: 10.0,
        discount: 20,
        userId: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: null,
      },
      {
        id: uuidv4(),
        title: "Circuito Termal Rock Spa de lujo + almuerzo buffet",
        shortDescription: "Relax total en un entorno único",
        description:
          "Acceso completo al circuito termal que incluye piscinas de hidromasaje, sauna, baño turco y zona de relajación. Completa la experiencia con un buffet de lujo.",
        images: ["/images/spa-rock.jpeg"],
        category: "Spa",
        placeName: "Hard Rock Hotel Tenerife",
        location: JSON.stringify({ lat: 28.1289, lng: -16.7777 }),
        price: 75.0,
        discount: 35,
        userId: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: null,
      },
      {
        id: uuidv4(),
        title: "Circuito Spa para 2 con opción de almuerzo buffet",
        shortDescription: "Escapada romántica de bienestar",
        description:
          "Disfruta de un circuito spa completo en pareja incluyendo jacuzzi, piscina climatizada y zona de relax. Opción de añadir buffet gourmet.",
        images: ["/images/spa-couple.webp"],
        category: "Spa",
        placeName: "Natural Spa Hotel Troya",
        location: JSON.stringify({ lat: 28.0567, lng: -16.7323 }),
        price: 34.0,
        discount: 15,
        userId: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: null,
      },
      {
        id: uuidv4(),
        title: "El Monasterio: Brunch épico Mirador para 2 con vistas",
        shortDescription: "Gastronomía en un entorno histórico",
        description:
          "Experiencia culinaria única en un edificio histórico con las mejores vistas. Incluye cava, selección de quesos locales y productos gourmet.",
        images: ["/images/monasterio.jpeg"],
        category: "Restaurantes",
        placeName: "El Monasterio",
        location: JSON.stringify({ lat: 28.4123, lng: -16.5481 }),
        price: 50.0,
        discount: 40,
        userId: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: null,
      },
      {
        id: uuidv4(),
        title: "Brunch sobre el mar para 2 frente a la montaña de El Médano",
        shortDescription: "Desayuno con vistas panorámicas",
        description:
          "Brunch gourmet con vistas al mar y a la montaña. Incluye bebidas premium, selección de panes recién horneados y productos locales.",
        images: ["/images/brunch-medano.jpeg"],
        category: "Restaurantes",
        placeName: "Hotel Médano",
        location: JSON.stringify({ lat: 28.0447, lng: -16.5359 }),
        price: 40.0,
        discount: 25,
        userId: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: null,
      },
      {
        id: uuidv4(),
        title: "Brunch Lido con vistas al mar para 2",
        shortDescription: "Experiencia gastronómica frente al océano",
        description:
          "Disfruta de un brunch de lujo con vistas panorámicas al océano. Incluye cava, zumos naturales y una amplia selección de platos gourmet.",
        images: ["/images/brunch-lido.jpeg"],
        category: "Restaurantes",
        placeName: "Lido San Telmo",
        location: JSON.stringify({ lat: 28.4804, lng: -16.3147 }),
        price: 40.0,
        discount: 20,
        userId: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: null,
      },
      {
        id: uuidv4(),
        title: "Excursión en Catamarán con almuerzo + bebidas ilimitadas",
        shortDescription: "Aventura marítima con todo incluido",
        description:
          "Navega por las costas de Tenerife en un lujoso catamarán. Incluye almuerzo, bebidas ilimitadas y parada para snorkel.",
        images: ["/images/catamaran.jpeg"],
        category: "Ocio",
        placeName: "Maxicat",
        location: JSON.stringify({ lat: 28.0798, lng: -16.7323 }),
        price: 45.0,
        discount: 47,
        userId: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: null,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Offers", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
