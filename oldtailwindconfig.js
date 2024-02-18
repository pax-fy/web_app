
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
      ],
    theme: {
      container: {
        center: true,
        padding: "2rem",
      },
      extend: {
        screens: {
          xs: "250px",
          // => @media (min-width: 250px) { ... }
          sm: "600px",
          // => @media (min-width: 640px) { ... }
  
          md: "768px",
          // => @media (min-width: 768px) { ... }
  
          lg: "1024px",
          // => @media (min-width: 1024px) { ... }
  
          xl: "1280px",
          // => @media (min-width: 1280px) { ... }
  
          "2xl": "1536px",
          // => @media (min-width: 1536px) { ... }
        },
        colors: {
          warning: "hsl(var(--warning))",
          "warning-foreground": "hsl(var(--warning-foreground))",
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
          
          // my animations
  
          scaleSlow : {
            '0%': { transform: 'scale(1)' },   
            '50%': { transform: 'scale(1.08)'}, 
           '100%': { transform: 'scale(1)' }, 
         },
         shakeAndMove: {
           '0%': {
             transform: 'translateX(0) translateY(0) rotate(0deg)'
           },
           '25%': {
             transform: 'translateX(50px) translateY(20px) rotate(5deg)'
           },
           '50%': {
             transform: 'translateX(0) translateY(0) rotate(-5deg)'
           },
           '75%': {
             transform: 'translateX(-50px) translateY(-20px) rotate(5deg)'
           },
           '100%': {
             transform: 'translateX(0) translateY(0) rotate(0deg)'
           }
         },
  
         slideAndFade :{
           from :{
             transform: 'translateY(20px)',
             opacity: '0.6'
           },
           'to': {
             transform: 'translateY(0)',
             opacity: '1'
           }
         },
         fromDownFade :{
           from :{
             transform: 'translateY(30px)',
             opacity: '0.7'
           },
           'to': {
             transform: 'translateY(0)',
             opacity: '1'
           }
         },
  
         cardAnimation: {
           '0%': {
             transform: 'translateY(0%)',
             zIndex: '10',
           },
           '40%': {
             transform: 'translateY(-40%)',
             zIndex: '10',
           },
           '50%': {
             transform: 'translateY(-40%)',
             zIndex: '20',
           },
           '100%': {
             transform: 'translateY(0%)',
             zIndex: '20',
           },
         },
           xcardAnimation: {
           '0%': {
             transform: 'translateY(0%)',
             zIndex: '10',
           },
           '40%': {
             transform: 'translateX(-50%)',
             zIndex: '10',
           },
           '50%': {
             transform: 'translateX(-50%)',
             zIndex: '20',
           },
           '100%': {
             transform: 'translateX(0%)',
             zIndex: '20',
           },
         },
            cardsContainerAnimation: {
           '0%': {
             transform: 'translateY(0%)',
             //zIndex: '10',
             
           },
           '40%': {
             transform: 'translateY(-10%)',
             //zIndex: '10',
           },
           '50%': {
             transform: 'translateY(-10%)',
             zIndex: '0',
           },
           '100%': {
             transform: 'translateY(0%)',
             //zIndex: '20',
           },
         },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          scaleSlow : 'scaleSlow 2.1s ease-in-out',
          shakeAndMove : 'shakeAndMove 4.2s ease-in-out',
          slideAndFade : "slideAndFade 2s ease-in-out",
          fromDownFade : "fromDownFade 1s ease-inout",
          cardAnimation : "cardAnimation 5s ease-in-out",
          xcardAnimation : "xcardAnimation 10s ease-in-out",
        cardsContainerAnimation: "cardsContainerAnimation 3s ease-in-out"
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }