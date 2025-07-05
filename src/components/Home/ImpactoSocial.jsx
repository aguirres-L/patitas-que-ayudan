export default function ImpactoSocial(){
    return(
        <section className="relative bg-gradient-to-r from-orange-500 to-pink-500 text-white py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tu chapita salva dos vidas
          </h2>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
            El <span className="font-bold">50%</span> de <span className="font-bold">todos nuestros ingresos</span> se destina a fundaciones que rescatan y rehabilitan mascotas en situación de calle
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">🐕</div>
              <h3 className="text-xl font-semibold mb-2">Proteges a tu mascota</h3>
              <p className="opacity-90">Identificación permanente con QR que nunca se pierde</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">❤️</div>
              <h3 className="text-xl font-semibold mb-2">Ayudas a una mascota abandonada</h3>
              <p className="opacity-90">Tu compra financia rescates y rehabilitación</p>
            </div>
          </div>
        </div>
      </section>
    )
}