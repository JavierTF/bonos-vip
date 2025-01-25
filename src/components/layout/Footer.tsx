'use client';

import React from 'react';

interface FooterSectionProps {
  title: string;
  links?: Array<{ text: string; url: string; }>;
  content?: string;
}

const FooterSection = React.memo(({ title, links, content }: FooterSectionProps) => (
  <div className="flex-1 min-w-[200px]">
    <h3 className="font-bold text-white mb-4">{title}</h3>
    {links && (
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} className="text-white hover:text-red-600">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    )}
    {content && <p className="text-sm text-white">{content}</p>}
  </div>
));

FooterSection.displayName = 'FooterSection';

const Footer = () => {
  const sections: FooterSectionProps[] = [
    {
      title: 'Sobre nosotros',
      links: [
        { text: '¿Cómo funciona BonosVip?', url: '#' },
        { text: 'Aviso legal', url: '#' },
        { text: '¡Promociona tu negocio!', url: '#' },
        { text: 'Uso de cookies', url: '#' },
        { text: 'Política de Privacidad', url: '#' },
        { text: 'Condiciones Generales', url: '#' },
        { text: 'Bolsa de empleo', url: '#' },
      ]
    },
    {
      title: 'Mi cuenta',
      links: [
        { text: 'Mis BonosVip', url: '#' },
        { text: 'Mis datos personales', url: '#' },
        { text: 'Mis créditos', url: '#' }
      ]
    },
    {
      title: 'Ofertas',
      links: [
        { text: 'Novedades', url: '#' },
        { text: 'Restaurantes', url: '#' },
        { text: 'Ocio', url: '#' },
        { text: 'Bienestar', url: '#' },
        { text: 'Hoteles', url: '#' },
        { text: 'Tarjeta regalo BonosVip', url: '#' }
      ]
    },
    {
      title: 'Contáctanos',
      content: 'Horario de lunes a viernes de 9:00h a 14:30h, excepto festivos.'
    }
  ];

  return (
    <footer className="bg-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-wrap gap-8">
          {sections.map((section, index) => (
            <FooterSection key={index} {...section} />
          ))}
        </div>
        <div className="mt-8 text-center text-white text-sm">
          2025 © bonosvip.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;