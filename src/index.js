import pino from 'pino';
import pinoms from 'pino-multi-stream';

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
const level = isProd ? 'info' : 'debug';

const streams = [{ level, stream: process.stdout }];
const options = {
  dedupe: true,
};

if (isProd) {
  streams.push({ level: 'error', stream: process.stderr });
}

export const log = pino({ level }, pinoms.multistream(streams, options));

export default log;
