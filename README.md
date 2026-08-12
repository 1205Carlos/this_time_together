# Esta vez, juntos ♡

Proyecto web romántico, mobile-first, construido para contar una historia y terminar con la pregunta "¿Quieres ser mi novia?".

## Cómo usarlo

1. Abre `index.html` directamente en tu navegador para verlo.
2. Sustituye las imágenes de la carpeta `assets/` usando exactamente estos nombres:
   - `abril-2024.jpg`
   - `julio-01.jpg`
   - `julio-02.jpg`
   - `julio-03.jpg`
   - `picnic-preparando.jpg`
   - `picnic-tabla-quesos.jpg`
   - `picnic-01.jpg`
   - `picnic-02.jpg`
   - `picnic-03.jpg`
   - `cuatro-01.jpg`
   - `cuatro-02.jpg`
   - `cuatro-03.jpg`
   - `cuatro-04.jpg`
   - `agosto-02.jpg`
   - `post-discusion-01.jpg`
   - `post-discusion-02.jpg`
   - `estado-07-agosto.jpg`

Si falta alguna, la página muestra un placeholder automático.

## Música de fondo

La página está preparada para reproducir `Vínculo` de Enjambre como música de fondo.

Coloca tu archivo legalmente obtenido en:

`assets/audio/vinculo.mp3`

La música:
- inicia al pulsar `Comenzar ♡`;
- entra con fade-in;
- puede pausarse/reanudarse desde el botón flotante `♫`;
- baja de volumen al llegar a `¿Quieres ser mi novia?`;
- recupera el volumen normal si se pulsa `Sí, quiero`.

El volumen se controla en `script.js` mediante:
- `MUSIC_VOLUME_NORMAL`
- `MUSIC_VOLUME_LOW`


## Publicación

Opciones sencillas:
- GitHub Pages
- Netlify
- Vercel

No requiere backend ni instalación de dependencias.

## Personalización rápida

La paleta está al principio de `styles.css`, dentro de `:root`.

Colores actuales:
- Verde bosque: `#283618`
- Verde olivo: `#556B2F`
- Olivo suave: `#7A8450`
- Marfil: `#F7F3E8`
- Arena: `#E8DFCC`
- Terracota: `#B76E4B`
- Dorado apagado: `#C6A15B`

## Nota sobre las fotos de menores

Antes de publicar la web en una URL pública, considera si quieres que las fotos de los niños estén accesibles para cualquiera con el enlace. Una alternativa es publicar temporalmente la página o protegerla mediante una plataforma que permita acceso restringido.
