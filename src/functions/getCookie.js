

export function getCookie(name) {

    const cookieName = encodeURIComponent(name) + '=';
    const cookieArray = document.cookie.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
      }
    }
    return null;
  }