export default ({ config }) => {
  const isEASBuild = process.env.EAS_BUILD === 'true';

  return {
    ...config,
    name: 'StudentStudyBuddy',
    slug: 'StudentStudyBuddy',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'studentstudybuddy',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash-icon.png',
      imageResizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdge: true,
      ...(isEASBuild && {
        googleServicesFile: './google-services.json',
      }),
    },
    ios: {
      supportsTablet: true,
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  };
};
