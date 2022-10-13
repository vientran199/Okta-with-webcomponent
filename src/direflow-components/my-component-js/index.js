import { DireflowComponent } from 'direflow-component';
import RouterApp from './App';

export default DireflowComponent.create({
  component: RouterApp,
  configuration: {
    tagname: 'okta-suitebar',
  },
  plugins: [
    {
      name: 'font-loader',
      options: {
        google: {
          families: ['Advent Pro', 'Noto Sans JP'],
        },
      },
    },
  ],
});
