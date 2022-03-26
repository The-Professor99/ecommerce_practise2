import React, { useState } from 'react';
import './Footer.css';

function Footer() {
  const [darkTheme, setTheme] = useState(true)
  return (
    <footer className='Footer'>
      <div className='attributions'>
        <p>Illustrations from <a href='https://undraw.co/illustrations'>undraw.co</a></p>
        <p>Copyright © {new Date().getFullYear()}{" "} 
            <span><a href="https://ihechifestus9.web.app/" target="_blank">The Professor 99</a>.</span>
        </p>
      </div>
    </footer>
  )
}

export { Footer }