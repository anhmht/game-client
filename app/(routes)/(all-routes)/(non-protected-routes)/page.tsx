"use client";

import { Routes } from "@/src/AppRoutes";
import { translate } from "@/src/languages";
import { Button, CreateAlert, EAlertType, Icon } from "@/src/modules";
import { CustomCarousel } from "@/src/components/carousel"
import Link from "next/link";
import React, { useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Accordion } from "@/src/components/accordion";
import { Newsletter } from "@/src/components/newsletter";

type Props = {};

const slides = [{
  title: "Olivia J",
  image: "assets/images/Olivia_J.png"
}, {
  title: "Olivia Q",
  image: "assets/images/Olivia_J.png"
}, {
  title: "Olivia K",
  image: "assets/images/Olivia_J.png"
  }];


const qaList = [{
  title: "What is Verdant Farm?",
  content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
},{
  title: "What is Verdant Farm?",
  content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  },
  {
  title: "What is Verdant Farm?",
  content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  },
  {
  title: "What is Verdant Farm?",
  content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  },
  {
  title: "What is Verdant Farm?",
  content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
}
]

const page = (props: Props) => {
  const router: any = useRouter();
  const user = useSelector((state: any) => state.user);
  const main = useSelector((state: any) => state.main);
  const [isShowAirdropModal, setIsShowAirdropModal] = useState<boolean>(false);
  return (
    <div className="homepage">
      {/* Banner */}
      <div className="banner">
        <img className="banner_bg" src="/assets/images/home_banner.png" alt="Logo" />
        <div className="blur"></div>
        <img className="banner_content_logo" src="/assets/images/banner_content_logo.png" alt="Logo" /> 
        {/* <img className="background_banner" src="/assets/images/background_banner.png" />           */}
      </div>

      {/* About Us */}
      <div className="about">
        <div className="gradient"></div>
        <img className="bg-square" src="/assets/images/background-square.png" alt="Image" />
        <div className="content">
          <div className="about-img">
            <img className="about_img_1" src="/assets/images/about_img_1.png" />
            <img className="about_img_2" src="/assets/images/about_img_2.png" />
            <img className="about_img_3" src="/assets/images/about_img_3.png" />
            <img className="about_img_4" src="/assets/images/about_img_4.png" />
            <img className="about_img_5" src="/assets/images/about_img_5.png" />
          </div>
          <p className="title-content header-title" data-content="About gold Farm">About gold Farm</p>
          <p className="text">GoldFarm is a unique virtual farm. with a mission to provide fun and rewarding experiences for players. In this game, players will participate in building and managing their own farm, including taking care of livestock, planting crops, and harvesting products. GoldFarm is not only an entertaining game but also a way for players to experience farmer life, learn about agricultural management and create a clean and green living environment.</p>
        </div>
      </div>

      {/* Characters */}
      <div className="characters">
        <div className="content">
            <p className="title header-title" data-content="Characters">Characters</p>
            <p className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </p>
        </div>
        <div className="section">
          <CustomCarousel slides={slides} />
        </div>
      </div>

      {/* Environment */}
      <div className="environment">
        <div className="gradient"></div>
        <img className="environment_img" src="/assets/images/environment.png" alt="Image" />
        <div className="environment_content">
            <p className="title header-title" data-content="Environment">Environment</p>
            <p className="text">Among the services that GoldFarm provides, we can mention the main financial investment work on the farm with an absorbed interest rate of 1.8-3%/day, compatible with 50-90%/month. This creates an opportunity for players to not only participate in the recreation of the game but still be able to profit from their first job in the campfire farm. In addition, GoldFarm also offers attractive gift packages and incentives for players when using referral codes and joining the game community.</p>
        </div>
      </div>
      
      {/* GamePlay */}
      <div className="gameplay">
        <div className="gameplay_child">
          <div className="content">
            <p className="title header-title" data-content="Gameplay">Gameplay</p>
            <p className="text">In GoldFarm, players also have the opportunity to meet and interact 
            with diverse characters in the fairy tale world. With adorable design, 
            diverse worlds and community features, GoldFarm 
            promises to bring hours of fun to players</p>
          </div>  
          <div className="video">
            <img className="video_img" src="/assets/images/video_gameplay.png" />
          </div>          
        </div>        
      </div>

      <div className="qa">
        <p className="title header-title" data-content="Q&A">Q&A</p>
        <Accordion items={qaList} />
        <Newsletter />
      </div>

      <div className="footer">
        <img src="/assets/images/main-logo.png" alt="" />
      </div>

      {/* {isShowAirdropModal && main.userPageInitializeStatus == "completed" && !user && (
          <div className="airdrop-modal-overlay">
              <div className="airdrop-modal">
                  <div className="airdrop-modal__close-indicator" onClick={() => setIsShowAirdropModal(false)}><Icon.CloseModalIcon /></div>
                  <div className="airdrop-modal__body">
                    <div className="row">
                      <div className="col-md-4 col-12">
                        <div className="airdrop-modal__body__cover">
                          <img src="/assets/images/airdrop-modal-cover.png" alt="" />
                        </div>
                      </div>
                      <div className="col-md-8 col-12">
                        <div className="airdrop-modal__body__info">
                          <div className="airdrop-modal__body__info__title">JOIN THE MRT<br/>AIRDROP NOW!</div>
                          <div className="airdrop-modal__body__info__content">12 billion MRT tokens are being airdropped.<br/>Sign Up successful will receive <span className="highlight">1.000 MRT</span> tokens.<br/>In particular, you will also be able to receive more tokens from our Affiliate program.</div>
                          <div className="airdrop-modal__body__info__button">
                            <Button
                              label={"SIGN UP NOW"}
                              onClick={() => router.push(Routes.register.href)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      )} */}
    </div>
  );
};

export default page;
