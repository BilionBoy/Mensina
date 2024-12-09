import { EnvironmentPlugin } from 'webpack';
import Dotenv from 'dotenv-webpack'

export default {
  plugins: [new Dotenv()],
};