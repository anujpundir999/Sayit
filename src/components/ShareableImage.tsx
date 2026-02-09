"use client"

import React, { forwardRef } from 'react'
import Image from 'next/image'
import { Message } from '@/model/User'

interface ShareableImageProps {
  message: Message
}

/* ------------------------------------------------------------------ */
/*  Scattered emoji positions — pre-computed so no randomness needed  */
/* ------------------------------------------------------------------ */
const EMOJIS = [
  { e: '😊', top: '4%',   left: '8%',   size: 90,  rotate: -15 },
  { e: '😜', top: '6%',   left: '75%',  size: 80,  rotate: 12 },
  { e: '🤭', top: '18%',  left: '2%',   size: 70,  rotate: 20 },
  { e: '😆', top: '14%',  left: '88%',  size: 75,  rotate: -10 },
  { e: '🙈', top: '78%',  left: '5%',   size: 85,  rotate: 10 },
  { e: '😏', top: '82%',  left: '80%',  size: 80,  rotate: -20 },
  { e: '🤫', top: '90%',  left: '40%',  size: 70,  rotate: 5 },
  { e: '💬', top: '30%',  left: '90%',  size: 65,  rotate: 15 },
  { e: '🔥', top: '50%',  left: '3%',   size: 70,  rotate: -8 },
  { e: '✨', top: '55%',  left: '92%',  size: 60,  rotate: 18 },
]

const ShareableImage = forwardRef<HTMLDivElement, ShareableImageProps>(
  ({ message }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '0px',
          width: '1080px',
          height: '1920px',
          pointerEvents: 'none' as const,
          // Dark aesthetic gradient: predominantly black/dark grey with subtle deep purple/blue accents
          background: 'linear-gradient(180deg, #000000 0%, #1a1a1a 40%, #0f172a 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          fontFamily: 'Arial, Helvetica, sans-serif',
          color: '#fff',
          overflow: 'hidden',
          // Override all Tailwind v4 oklch CSS vars so html2canvas doesn't choke
          // @ts-expect-error -- CSS custom properties
          '--background': '#ffffff',
          '--foreground': '#1a1a1a',
          '--card': '#ffffff',
          '--card-foreground': '#1a1a1a',
          '--popover': '#ffffff',
          '--popover-foreground': '#1a1a1a',
          '--primary': '#333333',
          '--primary-foreground': '#fafafa',
          '--secondary': '#f5f5f5',
          '--secondary-foreground': '#333333',
          '--muted': '#f5f5f5',
          '--muted-foreground': '#888888',
          '--accent': '#f5f5f5',
          '--accent-foreground': '#333333',
          '--destructive': '#ef4444',
          '--border': '#e5e5e5',
          '--input': '#e5e5e5',
          '--ring': '#aaaaaa',
        }}
      >
        {/* Scattered background emojis */}
        {EMOJIS.map((item, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              fontSize: `${item.size}px`,
              transform: `rotate(${item.rotate}deg)`,
              opacity: 0.25,
              zIndex: 0,
              lineHeight: 1,
            }}
          >
            {item.e}
          </div>
        ))}

        {/* Top heading */}
        <div
          style={{
            marginTop: '100px',
            zIndex: 1,
            textAlign: 'center',
            padding: '0 60px',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.15,
              margin: 0,
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            View &amp; Share
          </h1>
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.15,
              margin: 0,
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            Friends&apos; Responses
          </h1>
        </div>

        {/* Phone frame */}
        <div
          style={{
            marginTop: '70px',
            width: '700px',
            height: '1250px',
            background: '#121212',
            borderRadius: '60px',
            padding: '18px',
            zIndex: 1,
            boxShadow: '0 50px 100px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            border: '2px solid #333',
          }}
        >
          {/* Phone inner screen */}
          <div
            style={{
              flex: 1,
              background: '#09090b', // Dark screen background
              borderRadius: '44px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Status bar */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '18px 36px 12px',
                fontSize: '26px',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              <span>12:30</span>
              <span style={{ fontSize: '22px', letterSpacing: '4px' }}>● ● ●</span>
            </div>

            {/* Top icons row */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 36px',
              }}
            >
              <span style={{ fontSize: '32px', color: '#555' }}>⚠</span>
              <span style={{ fontSize: '32px', color: '#555' }}>✕</span>
            </div>

            {/* Center content area */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '30px 40px',
                gap: '30px',
              }}
            >
              {/* Gradient "Send me anonymous messages!" bubble */}
              <div
                style={{
                  // Deep Violet accent for the header bubble
                  background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)',
                  borderRadius: '32px',
                  padding: '44px 50px',
                  maxWidth: '520px',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(76, 29, 149, 0.4)',
                }}
              >
                <span
                  style={{
                    fontSize: '42px',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.3,
                  }}
                >
                  Send me anonymous messages! 😊
                </span>
              </div>

              {/* Message pill (the actual received message) */}
              <div
                style={{
                  // Darker surface for message
                  background: '#27272a',
                  border: '1px solid #3f3f46',
                  borderRadius: '40px',
                  padding: '28px 50px',
                  maxWidth: '520px',
                  textAlign: 'center',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                }}
              >
                <span
                  style={{
                    fontSize: '36px',
                    fontWeight: 700,
                    color: '#e4e4e7',
                    lineHeight: 1.4,
                    wordBreak: 'break-word',
                  }}
                >
                  {message.content}
                </span>
              </div>

              {/* Reply button */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '50px',
                  padding: '22px 90px',
                  marginTop: '20px',
                }}
              >
                <span
                  style={{
                    fontSize: '34px',
                    fontWeight: 700,
                    color: '#000000',
                    letterSpacing: '1px',
                  }}
                >
                  Reply
                </span>
              </div>
            </div>

            {/* Bottom nav bar */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 60px 30px',
                gap: '80px',
              }}
            >
              <span style={{ fontSize: '36px', color: '#555' }}>◁</span>
              <span style={{ fontSize: '36px', color: '#555' }}>○</span>
              <span style={{ fontSize: '36px', color: '#555' }}>□</span>
            </div>
          </div>
        </div>

        {/* Watermark at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            zIndex: 1,
            background: 'rgba(0,0,0,0.4)',
            padding: '10px 30px',
            borderRadius: '50px',
            backdropFilter: 'blur(5px)',
          }}
        >
          {/* Logo Image */}
          <div style={{
             height: '40px',
             width: 'auto',
             position: 'relative'
          }}>
            <Image 
                src="/images/logo.png" 
                alt="Sayit Logo" 
                width={40}
                height={40}
                style={{
                objectFit: 'contain'
                }}
            />
          </div>
          
          <span
            style={{
              fontSize: '30px',
              color: '#FFFFFF',
              letterSpacing: '2px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Sayit
          </span>
        </div>
      </div>
    )
  }
)

ShareableImage.displayName = 'ShareableImage'

export default ShareableImage
