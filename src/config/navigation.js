import routes from '../constants/routes'

export default {
  header: [
    {
      text: 'Roadmap',
      to: '/'
    },
    {
      text: 'About',
      to: routes.THANKS
    }
  ],

  footer: [
    {
      text: 'Terms & Conditions',
      to: routes.TERMS
    },
    {
      text: 'Privacy Policy',
      to: routes.PRIVACY
    },
    {
      text: 'Legal',
      to: routes.LEGAL
    }
  ]
}
