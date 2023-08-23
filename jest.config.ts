import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
   "^.+\\.test.ts$": "ts-jest",
  },
};

export default config;