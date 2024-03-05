import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sedhu.tasksapp',
  appName: 'tasks-app',
  webDir: 'dist/tasks-app',
  server: {
    androidScheme: 'https'
  }
};

export default config;
