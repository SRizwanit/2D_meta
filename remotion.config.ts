import {Config} from '@remotion/cli/config';
Config.setEntryPoint('./index.ts');
Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setConcurrency(1);
Config.setOverwriteOutput(true);
