import React, { FC } from "react";
import { ClassNames } from "../../modules";
import parse from "html-react-parser";

export interface ILandBotProps {
  title?: any;
  className?: string;
}

export const LandBot: FC<ILandBotProps> = (props) => {
  return (
    <div
      className={ClassNames({
        [props.className as string]: !!props.className,
      })}
    >
      {parse(`
            <!--Start of Tawk.to Script-->
              <script type="text/javascript">
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                  s1.async=true;
                  s1.src='${process.env["NEXT_PUBLIC_SUPPORT_CHAT_URL"]}';
                  s1.charset='UTF-8';
                  s1.setAttribute('crossorigin','*');
                  s0.parentNode.insertBefore(s1,s0);
                })();
              </script>
            <!--End of Tawk.to Script-->
            `)}
    </div>
  );
};
