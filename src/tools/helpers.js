export function share(network, link, { title, description, image }, callback) {
  function sharePopup(url, width = 400, height = 400, _callback) {
    const shareWindow = window.open(
      url,
      "_blank",
      `height=${height},width=${width},menubar=no,toolbar=no,location=no`
    );
    const watchTimer = setInterval(() => {
      if (shareWindow.closed) {
        clearInterval(watchTimer);
        if (typeof _callback !== "undefined") {
          _callback();
        }
      }
    }, 200);
  }

  switch (network) {
    case "vk":
      sharePopup(
        `https://vk.com/share.php?url=${link}&title=${title}&description=${description}&image=${image}`,
        550,
        300,
        callback
      );
      break;
    case "fb":
      sharePopup(
        `https://www.facebook.com/sharer/sharer.php?u=${link}`,
        550,
        300,
        callback
      );
      break;
    case "tw":
      sharePopup(
        `https://twitter.com/intent/tweet?original_referer=${link}&tw_p=tweetbutton&url=${link}&text=${title}`,
        550,
        300,
        callback
      );
      break;
    case "ok":
      sharePopup(
        `https://connect.ok.ru/dk?cmd=WidgetSharePreview&st.cmd=WidgetSharePreview&st._aid=ExternalShareWidget_SharePreview&st.shareUrl=${link}`,
        550,
        300,
        callback
      );
      break;
    case "tg":
      sharePopup(
        `https://telegram.me/share/url?url=${link}`,
        550,
        300,
        callback
      );
      break;
    default:
      break;
  }
}
