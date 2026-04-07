'use client'
import { forwardRef } from 'react'

interface MonitorFrameProps {
  children: React.ReactNode
}

const MonitorFrame = forwardRef<HTMLDivElement, MonitorFrameProps>(
  function MonitorFrame({ children }, ref) {
    return (
      <div
        ref={ref}
        className="relative"
        style={{
          perspective: '1200px',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 3D Monitor container */}
        <div
          className="monitor-bezel relative"
          style={{
            width: 'clamp(280px, 80vw, 1100px)',
            aspectRatio: '16/10',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(8deg) rotateY(-2deg)',
            background: '#0a0a0a',
            borderRadius: '24px',
            border: '8px solid #1a1a1a',
            boxShadow: `
              0 0 60px rgba(200, 164, 78, 0.08),
              0 60px 120px rgba(0, 0, 0, 0.7),
              inset -1px -1px 2px rgba(255, 255, 255, 0.03),
              inset 1px 1px 2px rgba(0, 0, 0, 0.5)
            `,
            overflow: 'hidden',
          }}
        >
          {/* Inner screen glow */}
          <div
            aria-hidden="true"
            className="absolute inset-6 rounded-xl pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 40px rgba(200, 164, 78, 0.08)',
            }}
          />

          {/* Screen content */}
          <div className="absolute inset-0">
            {children}
          </div>

          {/* Top trim */}
          <div
            aria-hidden="true"
            className="monitor-glow absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #C8A44E/20, transparent)',
            }}
          />
        </div>

        {/* Stand assembly */}
        <div
          aria-hidden="true"
          className="monitor-stand absolute hidden md:flex flex-col items-center"
          style={{
            bottom: '-80px',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(40px)',
          }}
        >
          {/* Neck connecting monitor to base */}
          <div
            style={{
              width: '60px',
              height: '45px',
              background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
              borderRadius: '6px',
              boxShadow: '0 -4px 16px rgba(0,0,0,0.4), inset -1px 0 8px rgba(255,255,255,0.05)',
              position: 'relative',
            }}
          >
            {/* Neck highlight */}
            <div
              style={{
                position: 'absolute',
                top: '2px',
                left: '50%',
                width: '40%',
                height: '2px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '1px',
                transform: 'translateX(-50%)',
              }}
            />
          </div>

          {/* Base — wider, metallic */}
          <div
            style={{
              width: '280px',
              height: '20px',
              background: 'linear-gradient(180deg, #252525 0%, #1a1a1a 50%, #0f0f0f 100%)',
              borderRadius: '4px 4px 0 0',
              boxShadow: `
                0 4px 24px rgba(0,0,0,0.6),
                inset 0 1px 2px rgba(255,255,255,0.1),
                0 -2px 8px rgba(200, 164, 78, 0.06)
              `,
              position: 'relative',
            }}
          >
            {/* Base rim */}
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(200,164,78,0.2), transparent)',
              }}
            />
          </div>

          {/* Desk shadow beneath stand */}
          <div
            style={{
              position: 'absolute',
              bottom: '-15px',
              width: '350px',
              height: '30px',
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3), transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(12px)',
              zIndex: -1,
            }}
          />
        </div>

        {/* Ambient glow behind monitor */}
        <div
          aria-hidden="true"
          className="monitor-glow absolute -z-20"
          style={{
            width: '600px',
            height: '400px',
            background: 'radial-gradient(ellipse at center, rgba(200,164,78,0.12), transparent 60%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />
      </div>
    )
  }
)

export default MonitorFrame
