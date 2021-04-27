import pino from 'pino';
import pinoms from 'pino-multi-stream';

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';

const streams = [{ stream: process.stdout }];
const options = {
  levels: {
    silent: Infinity,
    fatal: 60,
    error: 50,
    warn: 50,
    info: 30,
    debug: 20,
    trace: 10,
  },
  dedupe: true,
};

if (isProd) {
  streams.push({ level: 'error', stream: process.stderr });
}

const log = pino(
  {
    level: isProd ? 'info' : 'trace',
  },
  pinoms.multistream(streams, options)
);

export default log;
