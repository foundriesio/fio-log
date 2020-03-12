import pino from 'pino';
import pinoms from 'pino-multi-stream';

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';

const streams = [{ stream: process.stdout, level: isProd ? 'info' : 'debug' }];

if (isProd) {
  streams.push({ level: 'error', stream: process.stderr });
}

const log = pino(
  {
    level: isProd ? 'info' : 'debug'
  },
  pinoms.multistream(streams)
);

export default log;
