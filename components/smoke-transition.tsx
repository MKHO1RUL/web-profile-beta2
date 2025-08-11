'use client'

import { motion } from 'framer-motion'

export default function SmokeTransition() {
  return (
    <>
      {/* Container utama yang akan menjadi layar asap.
        Perhatikan properti `filter` di `className` dan animasi `scale` di `exit`.
      */}
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          // Animasikan `scale` pada filter untuk membuat distorsi lebih kuat saat keluar
          filter: 'url(#smoke-filter) blur(10px) saturate(0)',
          WebkitFilter: 'url(#smoke-filter) blur(10px) saturate(0)',
          transition: { duration: 1.5 } 
        }}
        className="fixed inset-0 z-50 bg-slate-900"
        style={{ filter: 'url(#smoke-filter) blur(0px)', WebkitFilter: 'url(#smoke-filter) blur(0px)' }} // Nilai awal filter
      >
        {/* Konten Anda tetap di tengah */}
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-orange-400 text-xl font-bold"
            >
              Entering the Hidden Leaf Village...
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Definisi Filter SVG. Ini tidak akan dirender secara visual,
        hanya digunakan sebagai definisi filter.
      */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="smoke-filter">
            {/* feTurbulence menciptakan noise. Menganimasikan baseFrequency
              membuat noise tampak "bergerak".
            */}
            <motion.feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.03" // Nilai awal frekuensi
              numOctaves="2"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01 0.03; 0.02 0.06; 0.01 0.03" // Membuat loop animasi halus
                dur="10s"
                repeatCount="indefinite"
              />
            </motion.feTurbulence>
            
            {/* feDisplacementMap menggunakan noise untuk mendistorsi gambar.
              Nilai `scale` mengontrol seberapa kuat distorsinya.
            */}
            <motion.feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="0" // Skala awal
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacement"
            >
              {/* Animasikan skala dari 0 ke nilai tinggi saat exit */}
               <animate
                attributeName="scale"
                values="0; 50; 0"
                dur="1.5s"
                begin="indefinite"
                fill="freeze"
                id="displace-anim"
              />
            </motion.feDisplacementMap>
          </filter>
        </defs>
      </svg>
    </>
  )
}
