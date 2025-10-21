import type { StyleOption, BackdropOption } from './types';

export const STYLE_OPTIONS: StyleOption[] = [
  { 
    id: 'painting', 
    name: 'Realistic Painting', 
    prompt: 'A highly detailed, realistic pet portrait painting of the pet in the photo, featuring vibrant and rich colors, soft blending, and a clear focus on the animal\'s fur texture and expressive eyes. Pay particular attention to any unique identifying marks. The overall impression is one of warmth and character, reminiscent of a traditional oil painting. {{backdrop}} Ensure the lighting and white balance on the pet are harmonized with the chosen backdrop to create a cohesive painted scene.' 
  },
  { 
    id: 'line-art', 
    name: 'Bold Line Art', 
    prompt: 'A bold, high-contrast, black and white, clean vector style line art portrait of the pet in the photo. {{backdrop}}' 
  },
  { 
    id: 'vector', 
    name: 'Vector Portrait', 
    prompt: 'A vector portrait illustration of the pet in the photo, featuring flat cell shading and bold separated color blocks with no gradients. {{backdrop}} The color palette and lighting of the vector illustration should be harmonized with the backdrop for a cohesive final image.' 
  },
  {
    id: 'backdrop-only',
    name: 'Switch Backdrop',
    prompt: 'A realistic photo of the pet in the photo, keeping its original appearance, but placing it on a new background. {{backdrop}} Critically, ensure the lighting, shadows, and white balance on the pet are perfectly harmonized with the new backdrop to create a seamless and photorealistic composition.'
  }
];

export const BACKDROP_OPTIONS: BackdropOption[] = [
  { id: 'none', name: 'None', prompt: 'Use the original background from the photo.' },
  { id: 'halloween', name: 'Halloween', prompt: 'Place the subject on a spooky halloween-themed backdrop with pumpkins, autumn leaves, and bats in the evening light.' },
  { id: 'christmas', name: 'Christmas', prompt: 'Place the subject on a festive Christmas-themed backdrop with soft-focused holiday lights, snow, and pine branches.' },
  { id: 'valentines', name: 'Valentine\'s', prompt: 'Place the subject on a romantic Valentine\'s Day-themed backdrop with soft pink hues, hearts, and elegant roses.' },
];