import Router from "next/router";

export const Routes = {
  homePage: {
    href: "/",
    renderPath: () => `/`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  comingSoon: {
    href: "/coming-soon",
    renderPath: () => `/coming-soon`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  butToken: {
    href: "/but-token",
    renderPath: () => `/but-token`,
    push: function () {
      return Router.push(Routes.butToken.href, Routes.butToken.renderPath());
    },
  },
  auth: {
    href: "/auth",
    renderPath: () => `/auth`,
    push: () => Router.push(Routes.auth.href, Routes.auth.renderPath()),
  },

  recoveryPassword: {
    href: "/recovery-password",
    renderPath: () => `/recovery-password`,
    push: () => Router.push(Routes.recoveryPassword.href, Routes.recoveryPassword.renderPath()),
  },
  affiliate: {
    href: "/affiliate",
    renderPath: () => `/affiliate`,
    push: () => Router.push(Routes.affiliate.href, Routes.affiliate.renderPath()),
  },
  playGame: {
    href: "/play-game",
    renderPath: () => `/play-game`,
    push: () => Router.push(Routes.playGame.href, Routes.playGame.renderPath()),
  },

  // ============================ User ============================
  userTrade: {
    href: "/user",
    renderPath: () => "/user",
    push: () => Router.push(Routes.userTrade.href, Routes.userTrade.renderPath()),
  },
  userDashboard: {
    href: "/dashboard",
    renderPath: () => "/dashboard",
    push: () => Router.push(Routes.userDashboard.href, Routes.userDashboard.renderPath()),
  },
  userDeposit: {
    href: "/deposit",
    renderPath: () => "/deposit",
    push: () => Router.push(Routes.userDeposit.href, Routes.userDeposit.renderPath()),
  },
  userWithdraw: {
    href: "/withdraw",
    renderPath: () => "/withdraw",
    push: () => Router.push(Routes.userWithdraw.href, Routes.userWithdraw.renderPath()),
  },
  userDepositStatus: {
    href: "/deposit-receipt",
    renderPath: () => "/deposit-receipt",
    push: () => Router.push(Routes.userDepositStatus.href, Routes.userDepositStatus.renderPath()),
  },
  // userExchange: {
  //   href: "/user/exchange",
  //   renderPath: () => "/user/exchange",
  //   push: () => Router.push(Routes.userExchange.href, Routes.userExchange.renderPath()),
  // },
  userAffiliate: {
    href: "/user/affiliate",
    renderPath: () => "/user/affiliate",
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  userAffiliateIntroduce: {
    href: "/user/affiliate/introduce",
    renderPath: () => "/user/affiliate/introduce",
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  userAffiliateGenernal: {
    href: "/user/affiliate/general",
    renderPath: () => "/user/affiliate/general",
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  userAffiliateCommissions: {
    href: "/user/affiliate/commissions",
    renderPath: () => "/user/affiliate/commissions",
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },

  // ============================ User ============================
  userAccountProfileTwoFa: {
    href: "/user/account/profile#two-fa",
    renderPath: () => "/user/account/profile#two-fa",
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  userAccountWallets: {
    href: "/wallet",
    renderPath: () => "/wallet",
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  userAccountAssets: {
    href: "/assets",
    renderPath: () => "/assets",
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  userAccountGame: {
    href: "/user/game",
    renderPath: () => "/user/game",
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  userAccountSetting: {
    href: "/user/account/setting",
    renderPath: () => "/user/account/setting",
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  userAccountSecurity: {
    href: "/user/account/security",
    renderPath: () => "/user/account/security",
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  userAccountKYC: {
    href: "/user/account/kyc",
    renderPath: () => "/user/account/kyc",
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  userNetwork: {
    href: "/user/network",
    renderPath: () => "/user/network",
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  userIEO: {
    href: "/user/ieo",
    renderPath: () => "/user/ieo",
  },
  userAirdrop: {
    href: "/user/airdrop",
    renderPath: () => "/user/airdrop",
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },

  // ------------------ New Routes -------------------------

  home: {
    href: "/",
    renderPath: () => `/`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },

  register: {
    href: "/signup",
    renderPath: () => `/signup`,
    push: () => Router.push(Routes.register.href, Routes.register.renderPath()),
  },

  login: {
    href: "/signin",
    renderPath: () => `/signin`,
    push: () => Router.push(Routes.login.href, Routes.login.renderPath()),
  },

  listGamePage: {
    href: "/games",
    renderPath: () => `/games`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },

  aboutUs: {
    href: "/about-us",
    renderPath: () => `/about-us`,
    push: () => Router.push(Routes.aboutUs.href, Routes.aboutUs.renderPath()),
  },

  play: {
    href: "/play",
    renderPath: () => `/play`,
    push: () => Router.push(Routes.play.href, Routes.play.renderPath()),
  },

  overview: {
    href: "/overview",
    renderPath: () => `/overview`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },

  wallet: {
    href: "/wallet",
    renderPath: () => `/wallet`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },

  // gameExperience: {
  //   href: "/trial-periods",
  //   renderPath: () => `/trial-periods`,
  //   push: function () {
  //     return Router.push(this.href, this.renderPath());
  //   },
  // },

  // requestClaim: {
  //   href: "/claim",
  //   renderPath: () => `/claim`,
  //   push: function () {
  //     return Router.push(this.href, this.renderPath());
  //   },
  // },

  affiliateMarketing: {
    href: "/affiliate-marketing",
    renderPath: () => `/affiliate-marketing`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },

  personalInformation: {
    href: "/personal-information",
    renderPath: () => `/personal-information`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },

  changePassword: {
    href: "/change-password",
    renderPath: () => `/change-password`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },

  gameExperienceHistory: {
    href: "/game-experience-history",
    renderPath: () => `/game-experience-history`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },

  twoFactorAuthen: {
    href: "/2fa-setup",
    renderPath: () => `/2fa-setup`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },

  withdrawalCode: {
    href: "/withdrawal-code",
    renderPath: () => `/withdrawal-code`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },

  promotion: {
    href: "/promotion",
    renderPath: () => `/promotion`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  privateSale: {
    href: "/private-sale",
    renderPath: () => `/private-sale`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
  airdrop: {
    href: "/airdrop",
    renderPath: () => `/airdrop`,
    push: function () {
      return Router.push(this.href, this.renderPath());
    },
  },
};
