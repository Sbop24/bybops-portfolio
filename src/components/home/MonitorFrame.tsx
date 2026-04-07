'use client'
import { forwardRef } from 'react'

interface MonitorFrameProps {
  children: React.ReactNode
}

const MonitorFrame = forwardRef<HTMLDivElement, MonitorFrameProps>(
  function MonitorFrame({ children }, ref) {
    return (
      <div ref={ref} className="relative flex flex-col items-center">
        {/* Gold glow behind monitor */}
        <div
          aria-hidden="true"
          className="monitor-glow absolute inset-0 -z-10 blur-3xl opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, #C8A44E 0%, transparent 70%)' }}
        />

        {/* Monitor body */}
        <div
          className="monitor-bezel relative w-[80vw] md:w-[70vw] max-w-[1000px] rounded-3xl overflow-hidden"
          style={{
            aspectRatio: '16/10',
            border: '2px solid #2A2A2A',
            background: '#111',
            boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
          }}
        >
          {/* Top bezel */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1a1a1a]" aria-hidden="true" />

          {/* Screen area — hero content and HUD render here */}
          <div className="absolute inset-0">
            {children}
          </div>

          {/* Bottom chin */}
          <div className="absolute bottom-0 left-0 right-0 h-[18px] bg-[#1a1a1a] flex items-center justify-center" aria-hidden="true">
            <div className="w-6 h-1 rounded-full bg-[#2a2a2a]" />
          </div>
        </div>

        {/* Stand — narrow neck + wider base */}
        <div className="monitor-stand hidden md:flex flex-col items-center" aria-hidden="true">
          <div
            className="w-12 h-10"
            style={{ background: 'linear-gradient(to bottom, #1a1a1a, #222)' }}
          />
          <div
            className="w-40 h-3 rounded-sm"
            style={{ background: 'linear-gradient(to bottom, #222, #1a1a1a)', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
          />
        </div>

        {/* Desk reflection */}
        <div
          aria-hidden="true"
          className="w-80 h-6 opacity-10 blur-xl"
          style={{ background: 'radial-gradient(ellipse at center, #C8A44E 0%, transparent 70%)' }}
        />
      </div>
    )
  }
)

export default MonitorFrame
