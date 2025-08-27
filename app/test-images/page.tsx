'use client'

export default function TestImages() {
  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-white text-2xl mb-8">Image Test</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-white mb-4">DSC04434.jpeg (Regular img tag)</h2>
          <img 
            src="/IMG_7367.jpeg" 
            alt="Test Image 1" 
            width={500}
            height={400}
            className="border-2 border-white rounded-lg"
            onLoad={() => console.log('/IMG_7367.jpeg loaded successfully')}
            onError={(e) => console.error('/IMG_7367.jpeg failed to load:', e)}
          />
        </div>
        
        <div>
          <h2 className="text-white mb-4">DSC04639.jpeg (Regular img tag)</h2>
          <img 
            src="DSC04639.jpeg" 
            alt="Test Image 2" 
            width={500}
            height={400}
            className="border-2 border-white rounded-lg"
            onLoad={() => console.log('DSC04639.jpeg loaded successfully')}
            onError={(e) => console.error('DSC04639.jpeg failed to load:', e)}
          />
        </div>
      </div>
    </div>
  )
} 