const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/RNSIT/Downloads/AllProject/UserPanel (3)/UserPanel/src';

function parseDir(currentPath) {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      parseDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      if (fullPath.includes('index.css')) continue;
      if (fullPath.includes('siteTheme.js')) continue;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Fix rings and missing #1E3A8A
      content = content.replace(/focus:ring-\[\#1E3A8A\]/gi, 'focus:ring-[var(--site-primary)]');
      
      // Fix #2563eb (which is standard tailwind blue-600)
      content = content.replace(/bg-\[\#2563eb\]/gi, 'bg-[var(--site-primary)]');
      content = content.replace(/text-\[\#2563eb\]/gi, 'text-[var(--site-primary)]');
      
      // Fix hover #fde68a (yellow-200) -> mapping to accent with opacity 
      // Actually we can map it to: hover:opacity-90 (since it was a hover state for yellow)
      content = content.replace(/hover:bg-\[\#fde68a\]/gi, 'hover:brightness-110');
      
      // Fix standard text-blue-XX0 and bg-blue-XX0
      content = content.replace(/bg-blue-[56789]00/gi, 'bg-[var(--site-primary)]');
      content = content.replace(/text-blue-[56789]00/gi, 'text-[var(--site-primary)]');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed colors in: ${fullPath}`);
      }
    }
  }
}

parseDir(dir);
console.log('Fix script complete');
