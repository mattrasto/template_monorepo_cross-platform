import { ENVIRONMENT } from '@shared/environments.js';
import analyticsScripts from '@utils/analytics/embedScripts.js';

export const metaInfo = {
  title: 'Propheta',
  // Only prepend "Propheta - " if not already contained
  titleTemplate: (titleChunk) =>
    titleChunk.includes('Propheta') ? titleChunk : `Propheta - ${titleChunk}`,
  htmlAttrs: { lang: 'en', amp: true },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/static/img/favicon-16x16.png',
      sizes: '16x16'
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/static/img/favicon-64x64.png',
      sizes: '64x64'
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/static/img/favicon-32x32.png',
      sizes: '32x32'
    },
    {
      rel: 'stylesheet',
      href: 'https://api.mapbox.com/mapbox-gl-js/v1.4.1/mapbox-gl.css'
    }
  ],
  meta: [
    { vmid: 'og:title', property: 'og:title', content: 'Propheta' },
    {
      vmid: 'description',
      property: 'description',
      content:
        'All your homebuilding decisions in one place — from design to move in.'
    },
    {
      vmid: 'og:description',
      property: 'og:description',
      content:
        'All your homebuilding decisions in one place — from design to move in.'
    },
    {
      vmid: 'og:image',
      property: 'og:image',
      content: 'https://propheta.com/static/img/landing/landing_preview.png'
    },
    {
      vmid: 'og:image:url',
      property: 'og:image:url',
      content: 'https://propheta.com/static/img/landing/landing_preview.png'
    },
    {
      vmid: 'og:image:secure_url',
      property: 'og:image:secure_url',
      content: 'https://propheta.com/static/img/landing/landing_preview.png'
    },
    {
      vmid: 'og:image:type',
      property: 'og:image:type',
      content: 'image/png'
    },
    {
      vmid: 'og:image:width',
      property: 'og:image:width',
      content: '1200'
    }, // This may throw off OG crawlers if image dimensions change
    {
      vmid: 'og:image:height',
      property: 'og:image:height',
      content: '665'
    }, // This may throw off OG crawlers if image dimensions change
    {
      vmid: 'twitter:image:alt',
      property: 'twitter:image:alt',
      content: 'Some magic'
    },
    {
      vmid: 'twitter:card',
      property: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      vmid: 'og:url',
      property: 'og:url',
      content: 'https://propheta.io'
    },
    {
      vmid: 'og:site_name',
      property: 'og:site_name',
      content: 'Propheta'
    },
    {
      vmid: 'twitter:site',
      property: 'twitter:site',
      content: '@propheta'
    }
  ],
  ...analyticsScripts[ENVIRONMENT]
};
