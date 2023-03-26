import routes from "@/constants/routes.js";

export default {
  header: [
    {
      text: "Roadmap",
      to: routes.ROADMAP,
    },
    {
      text: "About",
      to: routes.ABOUT,
    },
  ],

  footer: [
    {
      text: "Terms & Conditions",
      to: routes.TERMS,
    },
    {
      text: "Privacy Policy",
      to: routes.PRIVACY,
    },
    {
      text: "Legal",
      to: routes.LEGAL,
    },
  ],
};
