import React, { useEffect, useState } from "react";
import { LANGUAGE } from "@appserver/common/constants";
import { ADS_TIMEOUT } from "../../../../helpers/constants";
import { getLanguage } from "@appserver/common/utils";
import SnackBar from "@appserver/components/snackbar";
import { Consumer } from "@appserver/components/utils/context";

const loadLanguagePath = () => {
  if (!window.firebaseHelper) return;

  const lng = localStorage.getItem(LANGUAGE) || "en";
  const language = getLanguage(lng instanceof Array ? lng[0] : lng);

  const bar = (localStorage.getItem("bar") || "")
    .split(",")
    .filter((bar) => bar.length > 0);

  let index = Number(localStorage.getItem("barIndex") || 0);
  const currentBar = bar[index];

  const htmlUrl = `https://${window.firebaseHelper.config.authDomain}/${language}/${currentBar}/index.html`;

  return htmlUrl;
};

const bannerHOC = (props) => {
  const { firstLoad, personal, setMaintenanceExist } = props;

  const [htmlLink, setHtmlLink] = useState();

  const bar = (localStorage.getItem("bar") || "")
    .split(",")
    .filter((bar) => bar.length > 0);

  const updateBanner = () => {
    let index = Number(localStorage.getItem("barIndex") || 0);

    if (bar.length < 1 || index + 1 >= bar.length) {
      index = 0;
    } else {
      index++;
    }

    try {
      const htmlUrl = loadLanguagePath();
      setHtmlLink(htmlUrl);
    } catch (e) {
      updateBanner();
    }

    localStorage.setItem("barIndex", index);
    return;
  };

  useEffect(() => {
    updateBanner();
    setInterval(updateBanner, ADS_TIMEOUT);
  }, []);

  const mainBar = document.getElementById("main-bar");
  const mainBarExistNode = mainBar ? mainBar.hasChildNodes() : false;

  const onClose = () => {
    const bar = document.querySelector(`#main-bar`);
    setMaintenanceExist(false);
    bar.remove();
  };

  const onLoad = () => {
    setMaintenanceExist(true);
  };

  return !mainBarExistNode && htmlLink && !firstLoad ? (
    <Consumer>
      {(context) => (
        <SnackBar
          sectionWidth={context.sectionWidth}
          onLoad={onLoad}
          clickAction={onClose}
          isCampaigns={true}
          htmlContent={htmlLink}
        />
      )}
    </Consumer>
  ) : null;
};

export default bannerHOC;
