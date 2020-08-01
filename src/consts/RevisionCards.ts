interface CardColor {
  background: string;
  foreground: string;
}
let black = '#000';
let white = '#fff';
export const revisionColors: { [key: string]: CardColor } = {
  gold: {
    background: 'linear-gradient(45deg, #c6a009 0%, #f2c40b 50%, #f2c40b 51%, #f0cf4a 100%)',
    foreground: black,
  },
  silver: {
    background: 'linear-gradient(45deg, #a9aeb1 0%, #C2C7CA 50%, #C2C7CA 51%, #e9ecf0 100%)',
    foreground: black,
  },
  bronze: {
    background: '#a17d53',
    foreground: black,
  },
  tots: {
    background: 'linear-gradient(45deg, #e7cd6f 0%, #101b97 20%, #00274C 51%, #00274C 100%)',
    foreground: white,
  },
};
