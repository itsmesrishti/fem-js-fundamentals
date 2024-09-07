const shareBtn = document.getElementById("share-btn");
const shareBlock = document.getElementById("share-block");
const authorInfo = document.getElementById("author-info");
const cardFooter = document.getElementById("card-footer");
const shareIcon = shareBtn.children[0];

const mobClickedState = () => {
  shareBlock.style.display = "flex";
  authorInfo.style.display = "none";
  cardFooter.classList.add("dark-bg");
};

const mobUnclickedState = () => {
  shareBlock.style.display = "none";
  authorInfo.style.display = "flex";
  cardFooter.classList.remove("dark-bg");
};

const desktopClickedState = () => {
  shareBlock.style.display = "flex";
  shareBtn.style.backgroundColor = "#6E8098";

  // created new share icon image with white fill as fill wasn't being adjusted with css
  shareIcon.src = "/images/icon-share-clicked.svg";
};

const desktopUnclickedState = () => {
  shareBlock.style.display = "none";
  shareBtn.style.backgroundColor = "#ECF2F8";
  shareIcon.src = "/images/icon-share.svg";
};

shareBtn.addEventListener("click", (event) => {
  event.stopPropagation();

  if (window.innerWidth < 1024) {
    mobClickedState();

    document.body.addEventListener("click", mobUnclickedState);

    // in case someone resizes from mobile to desktop view the clicked state should close
    // so as to not show mobile's clicked state in desktop
    window.addEventListener("resize", mobUnclickedState);
  } else {
    desktopClickedState();

    document.body.addEventListener("click", desktopUnclickedState);

    // in case someone resizes from desktop to mobile view the clicked state should close
    // to not show desktop's clicked state in mobile
    window.addEventListener("resize", desktopUnclickedState);
  }
});
