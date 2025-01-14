// export const themes = {
//     light: {
//       background: '#FFFFFF',// create nice Linear Gradient
      
//       surface: '#F5F5F5',
//       text: '#000000',
//       textSecondary: '#666666',
//       accent: '#FFD700',
//     },
//     dark: {
//       background: '#000000',
//       surface: '#1a1a1a',
//       text: '#FFFFFF',
//       textSecondary: '#666666',
//       accent: '#FFD700',
//     },
//   };

  // export const themes = {
  //   light: {
  //     background: {
  //       colors: ['#FFFFFF', '#F0F2F5', '#E8ECF1'],
  //       locations: [0, 0.5, 1],
  //       start: { x: 0, y: 0 },
  //       end: { x: 1, y: 1 }
  //     },
  //     surface: '#F5F5F5',
  //     text: '#000000',
  //     textSecondary: '#666666',
  //     accent: '#FFD700',
  //   },
  //   dark: {
  //     background: {
  //       colors: ['#000000', '#111827', '#1F2937'],
  //       locations: [0, 0.5, 1],
  //       start: { x: 0, y: 0 },
  //       end: { x: 1, y: 1 }
  //     },
  //     surface: '#1a1a1a',
  //     text: '#FFFFFF',
  //     textSecondary: '#666666',
  //     accent: '#FFD700',
  //   },
  // };

  export const themes = {
    light: {
      background: {
        colors: ['#F8F9FA', '#E9ECEF', '#DEE2E6'], // More subtle light gradient
        // Alternative options:
        // colors: ['#F8F9FA', '#E2E8F0', '#CBD5E1'], // Cooler tones
        // colors: ['#FAFAFA', '#F0F0F0', '#E8E8E8'], // Neutral grays
        locations: [0, 0.5, 1],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 }
      },
      surface: '#F5F5F5',
      text: '#000000',
      textSecondary: '#666666',
      accent: '#FFD700',
    },
    dark: {
      background: {
        colors: ['#000000', '#111827', '#1F2937'],
        locations: [0, 0.5, 1],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 }
      },
      surface: '#1a1a1a',
      text: '#FFFFFF',
      textSecondary: '#666666',
      accent: '#FFD700',
    },
  };