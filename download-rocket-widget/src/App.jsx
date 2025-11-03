import React from 'react'
import RocketDownload from './RocketDownload'

export default function App() {
  return (
    <div className="app-root">
      <header className="topbar">Download Rocket Demo</header>
      <main className="demo-area">
        <RocketDownload />
      </main>
      <footer className="hint">Click the button to start the download animation.</footer>
    </div>
  )
}
