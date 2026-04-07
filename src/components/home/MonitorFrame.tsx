'use client'
import { forwardRef } from 'react'

interface MonitorFrameProps {
  children: React.ReactNode
}

const MonitorFrame = forwardRef<HTMLDivElement, MonitorFrameProps>(
  function MonitorFrame({ children }, ref) {
    return (
      /*
       * Outer: perspective container.
       * Layout: flex column so the stand sits BELOW the monitor in normal flow
       * — no absolute positioning for stand parts (avoids clipping by parent overflow).
       */
      <div
        ref={ref}
        className="relative flex flex-col items-center"
        style={{ perspective: '2200px', paddingBottom: '1.5rem' }}
      >
        {/* Ambient glow — behind the whole assembly */}
        <div
          aria-hidden="true"
          className="monitor-glow absolute pointer-events-none"
          style={{
            width: 'min(100vw, 1400px)',
            height: 'min(65vw, 900px)',
            top: '-8%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            background:
              'radial-gradient(ellipse at 50% 38%, rgba(200,164,78,0.11) 0%, rgba(200,164,78,0.04) 45%, transparent 68%)',
            filter: 'blur(36px)',
            zIndex: -1,
          }}
        />

        {/* Inner assembly — subtle 3D tilt for depth feel */}
        <div
          className="flex flex-col items-center"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(2.5deg)' }}
        >
          {/* ── Monitor housing ── */}
          <div
            className="monitor-bezel relative rounded-[5px] overflow-hidden"
            style={{
              width: 'min(74vw, 1020px)',
              aspectRatio: '16/10',
              background: '#080808',
              border: '6px solid #1b1b1b',
              boxShadow: `
                0 0 0 1px #252525,
                0 60px 120px -20px rgba(0,0,0,0.90),
                0 30px 60px -10px rgba(0,0,0,0.65),
                inset 0 1px 0 rgba(255,255,255,0.04),
                inset 0 -1px 0 rgba(0,0,0,0.7)
              `,
            }}
          >
            {/* Top bezel strip */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 z-10"
              style={{ height: '5px', background: '#161616' }}
            />
            {/* Bottom chin */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center"
              style={{ height: '20px', background: 'linear-gradient(to bottom, #181818, #111)' }}
            >
              <div style={{ width: '20px', height: '3px', borderRadius: '2px', background: '#222' }} />
            </div>
            {/* Side bezels */}
            <div aria-hidden="true" className="absolute top-0 bottom-0 left-0 z-10" style={{ width: '4px', background: '#151515' }} />
            <div aria-hidden="true" className="absolute top-0 bottom-0 right-0 z-10" style={{ width: '4px', background: '#151515' }} />

            {/* Screen */}
            <div className="absolute inset-0">{children}</div>

            {/* Subtle reflection sheen at top */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 pointer-events-none z-20"
              style={{
                height: '35%',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.016) 0%, transparent 100%)',
              }}
            />
          </div>

          {/* ── Stand neck — tapered column connecting monitor to base ── */}
          <div
            aria-hidden="true"
            className="monitor-stand hidden md:block"
            style={{
              width: '52px',
              height: '48px',
              background: 'linear-gradient(to bottom right, #1e1e1e, #161616 60%, #181818)',
              clipPath: 'polygon(22% 0%, 78% 0%, 90% 100%, 10% 100%)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
            }}
          />

          {/* ── Stand base ── */}
          <div
            aria-hidden="true"
            className="monitor-stand hidden md:block"
            style={{
              width: '250px',
              height: '14px',
              background: 'linear-gradient(to bottom, #202020 0%, #151515 100%)',
              borderRadius: '3px 3px 2px 2px',
              boxShadow: `
                0 6px 24px rgba(0,0,0,0.75),
                inset 0 1px 0 rgba(255,255,255,0.06),
                0 0 28px rgba(200,164,78,0.03)
              `,
            }}
          />

          {/* ── Desk surface line ── */}
          <div
            aria-hidden="true"
            className="hidden md:block"
            style={{
              width: '480px',
              height: '1px',
              background:
                'linear-gradient(to right, transparent 0%, rgba(200,164,78,0.07) 20%, rgba(200,164,78,0.16) 50%, rgba(200,164,78,0.07) 80%, transparent 100%)',
            }}
          />
          {/* Desk depth glow */}
          <div
            aria-hidden="true"
            className="hidden md:block"
            style={{
              width: '480px',
              height: '28px',
              background: 'linear-gradient(to bottom, rgba(200,164,78,0.035) 0%, transparent 100%)',
            }}
          />
        </div>
      </div>
    )
  }
)

export default MonitorFrame
