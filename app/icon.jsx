import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

export const size = {
  width: 256,
  height: 256,
};

export const contentType = 'image/png';

export default function Icon() {
  const logoPath = join(process.cwd(), 'public', 'favicon', 'favicon.png');
  const logoData = readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent', // Fully transparent background
        }}
      >
        <img 
          src={logoBase64} 
          style={{ 
            width: '140%',   // Zoom in to make the logo larger
            height: '140%', 
            objectFit: 'contain'
          }} 
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
