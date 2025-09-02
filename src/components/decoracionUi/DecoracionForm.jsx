export default function DecoracionForm() {
    return (
        <div className="fixed h-screen inset-0 pointer-events-none">
        <div className="absolute -top-20 right-20 w-40 h-40 lg:w-60 lg:h-60 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute bottom-20 right-40 w-40 h-40 lg:w-60 lg:h-60 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-10 w-40 h-40 lg:w-60 lg:h-60 bg-red-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 left-20 w-40 h-40 lg:w-60 lg:h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        
        <div className="absolute top-2 right-2 w-16 h-16 bg-orange-400 rounded-full mix-blend-multiply filter blur-lg animate-blob"></div>
        <div className="absolute bottom-2 left-2 w-16 h-16 bg-yellow-400 rounded-full mix-blend-multiply filter blur-lg animate-blob animation-delay-2000"></div>
      </div>
    )
}