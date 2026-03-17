export interface PositionStyle {
  top: string;
  left: string;
}

export const FORMATIONS: { [key: string]: { [position: string]: PositionStyle } } = {
  '4-4-2': {
    'GK': { top: '88%', left: '50%' },
    'LB': { top: '70%', left: '15%' },
    'LCB': { top: '75%', left: '38%' },
    'RCB': { top: '75%', left: '62%' },
    'RB': { top: '70%', left: '85%' },
    'LM': { top: '45%', left: '15%' },
    'LCM': { top: '50%', left: '38%' },
    'RCM': { top: '50%', left: '62%' },
    'RM': { top: '45%', left: '85%' },
    'LST': { top: '20%', left: '38%' },
    'RST': { top: '20%', left: '62%' },
  },
  '4-2-3-1': {
    'GK': { top: '88%', left: '50%' },
    'LB': { top: '70%', left: '15%' },
    'LCB': { top: '75%', left: '38%' },
    'RCB': { top: '75%', left: '62%' },
    'RB': { top: '70%', left: '85%' },
    'LCDM': { top: '55%', left: '38%' },
    'RCDM': { top: '55%', left: '62%' },
    'LW': { top: '35%', left: '15%' },
    'CAM': { top: '35%', left: '50%' },
    'RW': { top: '35%', left: '85%' },
    'ST': { top: '15%', left: '50%' },
  }
};
