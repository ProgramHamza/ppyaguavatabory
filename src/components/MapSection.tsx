import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const MapSection = () => {
  return (
    <section className="relative z-10 py-24 lg:py-32" id="mapa">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            Kde nás nájdete
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            Žellova 6, Bratislava.
          </h2>
          <p className="mt-4 text-lg text-white/45">
            Moderné priestory v centre Bratislavy s ľahkým prístupom MHD aj
            autom.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel relative overflow-hidden rounded-3xl"
        >
          <div className="relative h-[480px] w-full overflow-hidden rounded-3xl">
            <iframe
              title="Mapa – Žellova 6, Bratislava"
              src="https://www.openstreetmap.org/export/embed.html?bbox=17.120%2C48.142%2C17.150%2C48.158&amp;marker=48.150%2C17.135&amp;layers=mapnik"
              className="map-dark-contour absolute inset-0 h-[120%] w-[120%] -translate-x-[10%] -translate-y-[10%] border-0"
              loading="lazy"
            />

            {/* Gradient vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/35 via-transparent to-[#080808]/20" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080808]/15 via-transparent to-[#080808]/15" />

            {/* Address card */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-sm">
              <div className="glass-panel rounded-2xl px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]">
                    <MapPin className="h-5 w-5 text-white/70" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Žellova 6</p>
                    <p className="text-sm text-white/50">
                      821 08 Bratislava – Ružinov
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
